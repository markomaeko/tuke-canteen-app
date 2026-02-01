import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

export function LoadingState({ text = "Načítavam..." }: { text?: string }) {
  return (
    <View style={styles.wrap}>
      <ActivityIndicator />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 16, alignItems: "center", gap: 10 },
  text: { color: "#444" },
});
