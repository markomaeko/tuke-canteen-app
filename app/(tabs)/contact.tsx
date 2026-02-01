import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { Screen } from "../../components/Screen";

export default function ContactScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.h1}>Kontakty</Text>

        <View style={styles.card}>
          <Text style={styles.title}>Vedúca úseku stravovacích služieb</Text>
          <Text style={styles.line}>Ing. Aneta Jurik</Text>
          <Text style={styles.line}>Telefón: +421 55 602 5813</Text>
          <Text style={styles.line}>Mobil: +421 917 751 407</Text>
          <Text style={styles.line}>E-mail: aneta.jurik@tuke.sk</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Aktivácia kariet a správa kreditu</Text>
          <Text style={styles.line}>Ing. Aneta Jurik</Text>
          <Text style={styles.line}>Telefón: +421 55 602 5813</Text>
          <Text style={styles.line}>E-mail: aneta.jurik@tuke.sk</Text>
        </View>

        <Text style={styles.note}>Kontakt na jednotlivé prevádzky: (TODO – doplníme neskôr)</Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40, backgroundColor: "#fafafa", gap: 12 },
  h1: { fontSize: 22, fontWeight: "900", color: "#111" },
  card: { padding: 14, borderRadius: 16, backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee", gap: 6 },
  title: { fontWeight: "900", fontSize: 14, color: "#111" },
  line: { color: "#333" },
  note: { color: "#666", marginTop: 6 },
});
