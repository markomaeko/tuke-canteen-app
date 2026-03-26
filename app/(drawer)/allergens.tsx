import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Screen } from "../../components/Screen";
import { ALLERGENS } from "../../src/constants";
import { useAppTheme } from "../../src/theme";

export default function AllergensScreen() {
  const { colors } = useAppTheme();

  return (
    <Screen>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.intro, { color: colors.textSecondary }]}>
          Z legislatívnych predpisov vyplýva zariadeniam spoločného stravovania povinnosť označovať
          prítomnosť alergénov. Pri jedlách v ponuke sú alergény označené číslom podľa nasledovného
          zoznamu:
        </Text>

        {ALLERGENS.map((a, i) => (
          <View
            key={i}
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
          >
            <View style={[styles.badge, { backgroundColor: colors.primary }]}>
              <Text style={styles.badgeText}>{i + 1}</Text>
            </View>
            <View style={styles.textWrap}>
              <Text style={[styles.short, { color: colors.text }]}>{a.short}</Text>
              <Text style={[styles.full, { color: colors.textSecondary }]}>{a.full}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40, gap: 10 },
  intro: { fontSize: 13, lineHeight: 20, marginBottom: 4 },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  badgeText: { color: "#fff", fontSize: 14, fontWeight: "800" },
  textWrap: { flex: 1 },
  short: { fontSize: 14, fontWeight: "700" },
  full: { fontSize: 12, lineHeight: 18, marginTop: 2 },
});
