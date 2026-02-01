import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Screen } from "../../components/Screen";

export default function OrdersScreen() {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.h1}>Objednávkový systém</Text>
        <Text style={styles.text}>
          Táto funkcionalita je v príprave. V budúcnosti tu bude možné prihlásenie a objednávanie jedál.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fafafa", gap: 10 },
  h1: { fontSize: 22, fontWeight: "900", color: "#111" },
  text: { color: "#444", lineHeight: 20 },
});
