import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, View, Text, StyleSheet, RefreshControl, Switch } from "react-native";
import type { CanteenMenuDay } from "../../src/types/menu";
import { getMenuDay } from "../../src/services/menuRepository";
import { DayPicker } from "../../components/DayPicker";
import { CanteenPicker } from "../../components/CanteenPicker";
import { LoadingState } from "../../components/LoadingState";
import { ErrorState } from "../../components/ErrorState";
import { MenuSection } from "../../components/MenuSection";
import { useSettings } from "../../src/services/settingsContext";
import { getNextWorkdays } from "../../src/utils/dates";
import { Screen } from "../../components/Screen";

export default function MenuScreen() {
  const days = useMemo(() => getNextWorkdays(5), []);
  const { settings, ready } = useSettings();

  const [selectedDay, setSelectedDay] = useState(days[0].iso);
  const [canteen, setCanteen] = useState(settings.defaultCanteen);

  const [menu, setMenu] = useState<CanteenMenuDay | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [refreshing, setRefreshing] = useState(false);
  const [onlyMainMeals, setOnlyMainMeals] = useState(false);

  useEffect(() => {
    if (ready) setCanteen(settings.defaultCanteen);
  }, [ready, settings.defaultCanteen]);

  const load = useCallback(async () => {
    setError(null);
    setMenu(null);
    try {
      const m = await getMenuDay(canteen, selectedDay);
      setMenu(m);
    } catch (e: any) {
      setError(e?.message ?? "Neznáma chyba");
    }
  }, [canteen, selectedDay]);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await load();
    } finally {
      setRefreshing(false);
    }
  }, [load]);

  // výpočty stavov (bez hookov)
  const announcement = menu?.announcement?.trim();
  const announcementLower = announcement?.toLowerCase() ?? "";

  const isClosed =
    !!announcement &&
    (announcementLower.includes("zatvoren") || announcementLower.includes("zatvorená"));

  const hasAnyItems =
    !!menu && menu.sections.some((sec) => Array.isArray(sec.items) && sec.items.length > 0);

  const filteredSections = !menu
    ? []
    : !onlyMainMeals
      ? menu.sections
      : menu.sections.filter((s) => !["Nápoje", "Ostatné", "Prílohy"].includes(s.title));

  const hasAnyItemsAfterFilter =
    filteredSections.length > 0 &&
    filteredSections.some((sec) => Array.isArray(sec.items) && sec.items.length > 0);

  // Stavová hláška (iba jedna, aby sa nič neduplikovalo)
  let statusTitle: string | null = null;
  let statusText: string | null = null;

  if (menu) {
    if (isClosed) {
      statusTitle = "Prevádzka je dnes zatvorená";
      statusText = announcement ?? "Prevádzka je dnes zatvorená.";
    } else if (announcement && !hasAnyItems) {
      // je oznam, ale nie sú jedlá
      statusTitle = "Oznam";
      statusText = announcement;
    } else if (!announcement && !hasAnyItems) {
      // nie je ani oznam, ani jedlá
      statusTitle = "Menu zatiaľ nie je dostupné";
      statusText = "Jedálny lístok ešte nebol nahratý. Skúste to prosím neskôr alebo potiahnite pre obnovenie.";
    } else if (!hasAnyItemsAfterFilter) {
      // jedlá existujú, ale filter ich skryl
      statusTitle = "Žiadne položky po filtrovaní";
      statusText = "Skúste vypnúť „Iba hlavné jedlá“, aby sa zobrazili aj ostatné sekcie.";
    }
  }

  const showStatusBox = !!statusTitle && !!statusText;
  const showSections = !!menu && !showStatusBox;

  if (!ready) return <LoadingState text="Načítavam nastavenia..." />;

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.h1}>Jedálny lístok</Text>

        <Text style={styles.label}>Deň</Text>
        <DayPicker days={days} value={selectedDay} onChange={setSelectedDay} />

        <Text style={styles.label}>Jedáleň</Text>
        <CanteenPicker value={canteen} onChange={setCanteen} />

        <View style={styles.filterRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.filterTitle}>Iba hlavné jedlá</Text>
            <Text style={styles.filterDesc}>Skryje Nápoje, Ostatné a Prílohy</Text>
          </View>
          <Switch value={onlyMainMeals} onValueChange={setOnlyMainMeals} />
        </View>

        {error ? <ErrorState message={error} onRetry={load} /> : null}
        {!menu && !error ? <LoadingState text="Načítavam menu..." /> : null}

        {menu ? (
          <View style={styles.card}>
            <Text style={styles.title}>{menu.canteenName}</Text>
            <Text style={styles.meta}>Dátum: {menu.date}</Text>

            {menu.openingHours ? (
              <Text style={styles.meta}>
                Otvorené: {menu.openingHours.start} – {menu.openingHours.end}
              </Text>
            ) : null}

            {showStatusBox ? (
              <View style={styles.statusBox}>
                <Text style={styles.statusTitle}>{statusTitle}</Text>
                <Text style={styles.statusText}>{statusText}</Text>
              </View>
            ) : null}

            {showSections
              ? filteredSections.map((s, idx) => (
                  <MenuSection
                    key={`${menu.canteenSlug}-${idx}-${s.title}`}
                    section={s}
                    showAllergens={settings.showAllergens}
                    showEmpty={settings.showEmptySections}
                  />
                ))
              : null}
          </View>
        ) : null}

        <Text style={styles.footerNote}>
          Hmotnosť jedál a príloh je uvedená po tepelnej úprave.
        </Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingBottom: 40, gap: 12, backgroundColor: "#fafafa" },
  h1: { fontSize: 22, fontWeight: "900", color: "#111" },
  label: { fontSize: 13, fontWeight: "900", color: "#111", marginTop: 6 },

  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    marginTop: 4,
  },
  filterTitle: { fontSize: 14, fontWeight: "900", color: "#111" },
  filterDesc: { marginTop: 2, fontSize: 12, color: "#555" },

  card: {
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginTop: 8,
  },
  title: { fontSize: 18, fontWeight: "900" },
  meta: { marginTop: 4, color: "#555" },

  statusBox: {
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f3c7c7",
    backgroundColor: "#fff5f5",
  },
  statusTitle: { fontWeight: "900", color: "#7a1f1f" },
  statusText: { marginTop: 6, color: "#7a1f1f", fontWeight: "600" },

  footerNote: { marginTop: 6, color: "#666", fontSize: 12 },
});
