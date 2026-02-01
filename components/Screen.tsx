import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fafafa" },
  inner: { flex: 1 },
});
