import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ALLERGENS_SK } from "../src/data/allergens";

export function AllergenChips({ allergens }: { allergens: number[] }) {
  if (!allergens || allergens.length === 0) return null;

  return (
    <View style={styles.wrap}>
      {allergens.map((a) => (
        <View key={a} style={styles.chip}>
          <Text style={styles.chipText}>
            {a} {ALLERGENS_SK[a] ? `(${ALLERGENS_SK[a]})` : ""}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 6 },
  chip: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#fff",
  },
  chipText: { fontSize: 12, color: "#333" },
});
