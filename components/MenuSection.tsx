import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { MenuSection as MenuSectionType } from "../src/types";
import { MealCard } from "./MealCard";
import { useAppTheme } from "../src/theme";

type Props = {
  section: MenuSectionType;
  showAllergens: boolean;
};

export function MenuSection({ section, showAllergens }: Props) {
  const { colors } = useAppTheme();
  const [collapsed, setCollapsed] = useState(false);

  if (!section.items || section.items.length === 0) {
    return null;
  }

  const itemCount = section.items.length;

  return (
    <View style={styles.block}>
      <Pressable
        style={[styles.header, { borderBottomColor: colors.separator }]}
        onPress={() => setCollapsed((v) => !v)}
      >
        <View style={styles.headerLeft}>
          <Text style={[styles.title, { color: colors.text }]}>{section.title}</Text>
          <Text style={[styles.count, { color: colors.textMuted }]}>
            {itemCount} {itemCount === 1 ? "položka" : itemCount < 5 ? "položky" : "položiek"}
          </Text>
        </View>
        <Ionicons
          name={collapsed ? "chevron-down" : "chevron-up"}
          size={18}
          color={colors.textMuted}
        />
      </Pressable>

      {!collapsed ? (
        <View style={styles.items}>
          {section.items.map((item) => (
            <MealCard key={item.id} item={item} showAllergens={showAllergens} />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  block: { marginTop: 8 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  title: { fontSize: 15, fontWeight: "800" },
  count: { fontSize: 12, fontWeight: "500" },
  items: { gap: 8, paddingTop: 8 },
});
