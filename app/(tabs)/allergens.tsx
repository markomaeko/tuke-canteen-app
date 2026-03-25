import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { Screen } from "../../components/Screen";
import { ALLERGENS } from "../../src/constants";

export default function AllergensScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.h1}>Alergény</Text>

        <Text style={styles.p}>
          Z legislatívnych predpisov vyplýva zariadeniam spoločného stravovania povinnosť označovať prítomnosť alergénov.
          Pri jedlách v ponuke sú alergény označené číslom podľa nasledovného zoznamu:
        </Text>

        {ALLERGENS.map((a, i) => (
          <Text key={i} style={styles.li}>
            {i + 1}. {a.full}
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
