import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppTheme } from "../src/theme";

export function Screen({ children }: { children: React.ReactNode }) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
