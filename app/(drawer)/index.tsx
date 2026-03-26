import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AppState, ScrollView, View, Text, StyleSheet, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { CanteenMenuDay, MenuSection as MenuSectionType } from "../../src/types";
import { getMenuDay } from "../../src/services/menuRepository";
import { DayPicker } from "../../components/DayPicker";
import { LoadingState } from "../../components/LoadingState";
import { ErrorState } from "../../components/ErrorState";
import { MenuSection } from "../../components/MenuSection";
import { useSettings } from "../../src/services/settingsContext";
import { useActiveCanteen } from "../../src/services/activeCanteenContext";
import { getNextWorkdays } from "../../src/utils/format";
import { Screen } from "../../components/Screen";
import { useAppTheme } from "../../src/theme";

/** Presunie "Nápoje" na predposledné a "Ostatné" na posledné miesto. */
function reorderSections(sections: MenuSectionType[]): MenuSectionType[] {
  const normal: MenuSectionType[] = [];
  let napoje: MenuSectionType | undefined;
  let ostatne: MenuSectionType | undefined;

  for (const s of sections) {
    if (s.title === "Nápoje") napoje = s;
    else if (s.title === "Ostatné") ostatne = s;
    else normal.push(s);
  }

  if (napoje) normal.push(napoje);
  if (ostatne) normal.push(ostatne);
  return normal;
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export default function MenuScreen() {
  const [dateKey, setDateKey] = useState(todayKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- dateKey invaliduje zoznam dní po polnoci
  const days = useMemo(() => getNextWorkdays(5), [dateKey]);
  const { settings, ready } = useSettings();
  const { activeCanteen } = useActiveCanteen();
  const { colors } = useAppTheme();

  const [selectedDay, setSelectedDay] = useState(days[0].iso);

  // Po polnoci: ak vybraný deň už nie je v zozname, resetni na prvý
  useEffect(() => {
    if (!days.some((d) => d.iso === selectedDay)) {
      setSelectedDay(days[0].iso);
    }
  }, [days, selectedDay]);

  // Aktualizuj deň pri návrate do popredia
  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") setDateKey(todayKey());
    });
    return () => sub.remove();
  }, []);

  const [menu, setMenu] = useState<CanteenMenuDay | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    setMenu(null);
    try {
      const m = await getMenuDay(activeCanteen, selectedDay);
      setMenu(m);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Neznáma chyba");
    }
  }, [activeCanteen, selectedDay]);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = useCallback(async () => {
    setDateKey(todayKey());
    setRefreshing(true);
    try {
      await load();
    } finally {
      setRefreshing(false);
    }
  }, [load]);

  // výpočty stavov
  const announcement = menu?.announcement?.trim();
  const announcementLower = announcement?.toLowerCase() ?? "";

  const isClosed =
    !!announcement &&
    (announcementLower.includes("zatvoren") || announcementLower.includes("zatvorená"));

  const hasAnyItems =
    !!menu && menu.sections.some((sec) => Array.isArray(sec.items) && sec.items.length > 0);

  const orderedSections = menu ? reorderSections(menu.sections) : [];

  // Stavová hláška
  let statusTitle: string | null = null;
  let statusText: string | null = null;

  if (menu) {
    if (isClosed) {
      statusTitle = "Prevádzka je dnes zatvorená";
      statusText = announcement ?? "Prevádzka je dnes zatvorená.";
    } else if (announcement && !hasAnyItems) {
      statusTitle = "Oznam";
      statusText = announcement;
    } else if (!announcement && !hasAnyItems) {
      statusTitle = "Menu zatiaľ nie je dostupné";
      statusText = "Jedálny lístok ešte nebol nahratý. Skúste to prosím neskôr alebo potiahnite pre obnovenie.";
    }
  }

  const showStatusBox = !!statusTitle && !!statusText;
  const showSections = !!menu && !showStatusBox;

  if (!ready) return <LoadingState text="Načítavam nastavenia..." />;

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
        refreshControl={
          menu !== null || error !== null ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          ) : undefined
        }
      >
        {/* Denný výber */}
        <DayPicker days={days} value={selectedDay} onChange={setSelectedDay} />

        {/* Chybový stav */}
        {error ? <ErrorState message={error} onRetry={load} /> : null}

        {/* Načítavanie */}
        {!menu && !error ? <LoadingState text="Načítavam menu..." /> : null}

        {/* Obsah menu */}
        {menu ? (
          <View style={styles.menuContent}>
            <View style={styles.menuHeader}>
              <Text style={[styles.canteenName, { color: colors.text }]}>{menu.canteenName}</Text>
              {menu.openingHours ? (
              <View style={styles.metaRow}>
                <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                <Text style={[styles.meta, { color: colors.textSecondary }]}>
                  {menu.openingHours.start.split(":").slice(0, 2).join(":")} – {menu.openingHours.end.split(":").slice(0, 2).join(":")}
                </Text>
              </View>
            ) : null}
            </View>

            {showStatusBox ? (
              <View style={[styles.statusBox, { backgroundColor: colors.statusBoxBg, borderColor: colors.statusBoxBorder }]}>
                <Ionicons name="information-circle-outline" size={20} color={colors.statusBoxText} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.statusTitle, { color: colors.statusBoxText }]}>{statusTitle}</Text>
                  <Text style={[styles.statusText, { color: colors.statusBoxText }]}>{statusText}</Text>
                </View>
              </View>
            ) : null}

            {showSections ? (
              <View style={styles.sections}>
                {orderedSections.map((s, idx) => (
                  <MenuSection
                    key={`${menu.canteenSlug}-${idx}-${s.title}`}
                    section={s}
                    showAllergens={settings.showAllergens}
                  />
                ))}
              </View>
            ) : null}
          </View>
        ) : null}

        <Text style={[styles.footerNote, { color: colors.textMuted }]}>
          Hmotnosť jedál a príloh je uvedená po tepelnej úprave.
        </Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 16, gap: 12 },

  menuContent: { paddingHorizontal: 16 },
  menuHeader: { marginBottom: 8 },
  canteenName: { fontSize: 18, fontWeight: "800" },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  meta: { fontSize: 13 },

  statusBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
  },
  statusTitle: { fontWeight: "700", fontSize: 14 },
  statusText: { marginTop: 4, fontSize: 13 },

  sections: { gap: 4 },

  footerNote: { marginTop: 8, fontSize: 12, textAlign: "center", paddingHorizontal: 16 },
});
