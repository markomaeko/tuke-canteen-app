import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { useAppTheme } from "../src/theme";

export function LoadingState({ text = "Načítavam..." }: { text?: string }) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.wrap}>
      <ActivityIndicator color={colors.primary} />
      <Text style={[styles.text, { color: colors.textSecondary }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 24, alignItems: "center", gap: 12 },
  text: { fontSize: 14 },
});
