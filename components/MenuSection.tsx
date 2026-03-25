import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { MenuSection as MenuSectionType } from "../src/types";
import { MealCard } from "./MealCard";

type Props = {
  section: MenuSectionType;
  showAllergens: boolean;
  showEmpty?: boolean;
};

export function MenuSection({ section, showAllergens, showEmpty = false }: Props) {
  if (!showEmpty && (!section.items || section.items.length === 0)) {
    return null;
  }

  return (
    <View style={styles.block}>
      <Text style={styles.title}>{section.title}</Text>

      {section.items.length === 0 ? (
        <Text style={styles.empty}>Žiadne položky</Text>
      ) : (
        section.items.map((item) => (
          <MealCard
            key={item.id}
            item={item}
            showAllergens={showAllergens}
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginTop: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111",
  },
  empty: {
    marginTop: 8,
    fontStyle: "italic",
    color: "#666",
  },
});
