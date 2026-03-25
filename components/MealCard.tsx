import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { MenuItem } from "../src/types";
import { formatPrice } from "../src/utils/format";
import { AllergenChips } from "./AllergenChips";

type Props = {
  item: MenuItem;
  showAllergens?: boolean;
};

export function MealCard({ item, showAllergens = true }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>
          {formatPrice(item.price)}
        </Text>
      </View>

      {showAllergens && item.allergens.length > 0 ? (
        <AllergenChips allergens={item.allergens} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
  },
  price: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111",
  },
});
