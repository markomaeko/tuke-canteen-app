import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { MenuItem } from "../src/types";
import { formatPrice } from "../src/utils/format";
import { AllergenChips } from "./AllergenChips";
import { useAppTheme } from "../src/theme";

type Props = {
  item: MenuItem;
  showAllergens?: boolean;
};

export function MealCard({ item, showAllergens = true }: Props) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.cardBorder,
          shadowColor: colors.shadow,
        },
      ]}
    >
      <View style={styles.row}>
        {/* Placeholder pre fotku jedla — nahraditeľný Image komponentom */}
        <View style={[styles.photoPlaceholder, { backgroundColor: colors.surface }]}>
          {item.photoUrl ? null : (
            <Ionicons name="restaurant-outline" size={24} color={colors.textMuted} />
          )}
        </View>

        <View style={styles.content}>
          <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
          <View style={styles.metaRow}>
            <Text style={[styles.price, { color: colors.accent }]}>
              {formatPrice(item.price)}
            </Text>
          </View>
          {showAllergens && item.allergens.length > 0 ? (
            <AllergenChips allergens={item.allergens} />
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  photoPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "800",
  },
});
