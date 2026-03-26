import React from "react";
import { View, Text, Switch, Pressable, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettings } from "../../src/services/settingsContext";
import { CanteenPicker } from "../../components/CanteenPicker";
import { Screen } from "../../components/Screen";
import { LoadingState } from "../../components/LoadingState";
import { useAppTheme, type ThemeMode } from "../../src/theme";

const THEME_OPTIONS: { value: ThemeMode; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { value: "system", label: "Systém", icon: "phone-portrait-outline" },
  { value: "light", label: "Svetlý", icon: "sunny-outline" },
  { value: "dark", label: "Tmavý", icon: "moon-outline" },
];

export default function SettingsScreen() {
  const { settings, ready, update } = useSettings();
  const { colors } = useAppTheme();

  if (!ready) return <LoadingState text="Načítavam nastavenia..." />;

  return (
    <Screen>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
        {/* Predvolená jedáleň */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>PREDVOLENÁ JEDÁLEŇ</Text>
        <CanteenPicker
          value={settings.defaultCanteen}
          onChange={(v) => update({ defaultCanteen: v })}
        />

        {/* Vzhľad */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>VZHĽAD</Text>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <View style={styles.themeRow}>
            {THEME_OPTIONS.map((opt) => {
              const active = settings.themeMode === opt.value;
              return (
                <Pressable
                  key={opt.value}
                  style={[
                    styles.themeOption,
                    {
                      backgroundColor: active ? colors.primary : "transparent",
                      borderColor: active ? colors.primary : colors.cardBorder,
                    },
                  ]}
                  onPress={() => update({ themeMode: opt.value })}
                >
                  <Ionicons
                    name={opt.icon}
                    size={18}
                    color={active ? "#fff" : colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.themeLabel,
                      { color: active ? "#fff" : colors.text },
                    ]}
                  >
                    {opt.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Zobrazenie */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>ZOBRAZENIE</Text>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: colors.text }]}>Zobrazovať alergény</Text>
              <Text style={[styles.desc, { color: colors.textSecondary }]}>Číselné označenie pri jedlách</Text>
            </View>
            <Switch
              value={settings.showAllergens}
              onValueChange={(v) => update({ showAllergens: v })}
              trackColor={{ true: colors.switchTrack }}
            />
          </View>

        </View>

        {/* Pripravované */}
        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>PRIPRAVUJEME</Text>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: colors.text }]}>Notifikácie</Text>
              <Text style={[styles.desc, { color: colors.textSecondary }]}>Upozornenia na denné menu</Text>
            </View>
            <Switch value={false} disabled trackColor={{ true: colors.switchTrack }} />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40, gap: 8 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: 16,
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 4,
    overflow: "hidden",
  },
  themeRow: {
    flexDirection: "row",
    gap: 8,
    padding: 8,
  },
  themeOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  themeLabel: { fontSize: 13, fontWeight: "600" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
  },
  label: { fontSize: 14, fontWeight: "600" },
  desc: { marginTop: 2, fontSize: 12 },
});
