import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Niečo sa pokazilo</Text>
      <Text style={styles.msg}>{message}</Text>
      {onRetry ? (
        <Pressable style={styles.btn} onPress={onRetry}>
          <Text style={styles.btnText}>Skúsiť znova</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 16, gap: 10 },
  title: { fontSize: 16, fontWeight: "800" },
  msg: { color: "#444" },
  btn: { alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: "#ddd" },
  btnText: { fontWeight: "700" },
});
