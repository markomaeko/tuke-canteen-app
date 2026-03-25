import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useSettings } from "../../src/services/settingsContext";
import { CanteenPicker } from "../../components/CanteenPicker";
import { Screen } from "../../components/Screen";
import { LoadingState } from "../../components/LoadingState";

export default function SettingsScreen() {
  const { settings, ready, update } = useSettings();

  if (!ready) return <LoadingState text="Načítavam nastavenia..." />;

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.h1}>Nastavenia</Text>

        <Text style={styles.sectionTitle}>Predvolená jedáleň</Text>
        <CanteenPicker
          value={settings.defaultCanteen}
          onChange={(v) => update({ defaultCanteen: v })}
        />

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Zobrazovať alergény</Text>
            <Text style={styles.desc}>Číselné označenie pri jedlách</Text>
          </View>
          <Switch
            value={settings.showAllergens}
            onValueChange={(v) => update({ showAllergens: v })}
          />
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Nočný režim</Text>
            <Text style={styles.desc}>Placeholder – štýly doplníme neskôr</Text>
          </View>
          <Switch value={false} onValueChange={() => {}} />
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Notifikácie</Text>
            <Text style={styles.desc}>Placeholder – neskôr Firebase Cloud Messaging</Text>
          </View>
          <Switch value={false} onValueChange={() => {}} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fafafa", gap: 14 },
  h1: { fontSize: 22, fontWeight: "900", color: "#111" },
  sectionTitle: { marginTop: 6, fontSize: 14, fontWeight: "900", color: "#111" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  label: { fontSize: 14, fontWeight: "800", color: "#111" },
  desc: { marginTop: 2, color: "#555", fontSize: 12 },
});
