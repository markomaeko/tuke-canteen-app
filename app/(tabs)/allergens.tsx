import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { Screen } from "../../components/Screen";

const ITEMS = [
  "Obilniny obsahujúce lepok (t.j. pšenica, raž, jačmeň, ovos, špalda, kamut alebo ich hybridné odrody).",
  "Kôrovce a výrobky z nich.",
  "Vajcia a výrobky z nich.",
  "Ryby a výrobky z nich.",
  "Arašidy a výrobky z nich.",
  "Sójové zrná a výrobky z nich.",
  "Mlieko a výrobky z neho.",
  "Orechy (mandle, lieskové, vlašské, kešu, pekanové, para, pistácie, makadamové a queenslandské orechy) a výrobky z nich.",
  "Zeler a výrobky z neho.",
  "Horčica a výrobky z nej.",
  "Sezamové semená a výrobky z nich.",
  "Oxid siričitý a siričitany v koncentráciách vyšších ako 10 mg/kg alebo 10 mg/l.",
  "Vlčí bob a výrobky z neho.",
  "Mäkkýše a výrobky z nich.",
];

export default function AllergensScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.h1}>Alergény</Text>

        <Text style={styles.p}>
          Z legislatívnych predpisov vyplýva zariadeniam spoločného stravovania povinnosť označovať prítomnosť alergénov.
          Pri jedlách v ponuke sú alergény označené číslom podľa nasledovného zoznamu:
        </Text>

        {ITEMS.map((t, i) => (
          <Text key={i} style={styles.li}>
            {i + 1}. {t}
          </Text>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40, backgroundColor: "#fafafa", gap: 10 },
  h1: { fontSize: 22, fontWeight: "900", color: "#111", marginBottom: 6 },
  p: { color: "#444", lineHeight: 20 },
  li: { marginTop: 8, color: "#111", lineHeight: 20 },
});
