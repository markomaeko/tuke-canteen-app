import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../../components/Screen";
import { useAppTheme } from "../../src/theme";

export default function OrdersScreen() {
  const { colors } = useAppTheme();

  return (
    <Screen>
      <View style={styles.container}>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Ionicons name="construct-outline" size={40} color={colors.textMuted} />
          <Text style={[styles.title, { color: colors.text }]}>Objednávkový systém</Text>
          <Text style={[styles.text, { color: colors.textSecondary }]}>
            Táto funkcionalita je v príprave. V budúcnosti tu bude možné prihlásenie a objednávanie jedál.
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  card: {
    padding: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    gap: 12,
  },
  title: { fontSize: 18, fontWeight: "800" },
  text: { fontSize: 14, lineHeight: 22, textAlign: "center" },
});
