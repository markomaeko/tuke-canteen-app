import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ALLERGENS_SK } from "../src/constants";
import { useAppTheme } from "../src/theme";

export function AllergenChips({ allergens }: { allergens: number[] }) {
  const { colors } = useAppTheme();

  if (!allergens || allergens.length === 0) return null;

  return (
    <View style={styles.wrap}>
      {allergens.map((a) => (
        <View
          key={a}
          style={[styles.chip, { backgroundColor: colors.chipBg, borderColor: colors.chipBorder }]}
        >
          <Text style={[styles.chipText, { color: colors.chipText }]}>
            {a} {ALLERGENS_SK[a] ? `(${ALLERGENS_SK[a]})` : ""}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 8 },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  chipText: { fontSize: 11, fontWeight: "500" },
});
