import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "../src/theme";

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.wrap, { backgroundColor: colors.statusBoxBg, borderColor: colors.statusBoxBorder }]}>
      <Ionicons name="warning-outline" size={24} color={colors.statusBoxText} />
      <Text style={[styles.title, { color: colors.statusBoxText }]}>Niečo sa pokazilo</Text>
      <Text style={[styles.msg, { color: colors.statusBoxText }]}>{message}</Text>
      {onRetry ? (
        <Pressable
          style={[styles.btn, { backgroundColor: colors.accent }]}
          onPress={onRetry}
        >
          <Text style={styles.btnText}>Skúsiť znova</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 20,
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    marginHorizontal: 16,
  },
  title: { fontSize: 16, fontWeight: "700" },
  msg: { fontSize: 13, textAlign: "center" },
  btn: {
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
