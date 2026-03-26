import React, { useState } from "react";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../../components/Screen";
import { useAppTheme } from "../../src/theme";
import {
  MANAGEMENT_CONTACTS,
  CANTEEN_CONTACTS,
  type CanteenContact,
  type HoursEntry,
} from "../../src/data/contacts";

function openPhone(phone: string) {
  Linking.openURL(`tel:${phone.replace(/\s/g, "")}`);
}

function openEmail(email: string) {
  Linking.openURL(`mailto:${email}`);
}

function HoursBlock({ label, entries, colors }: { label?: string; entries: HoursEntry[]; colors: any }) {
  return (
    <View style={styles.hoursBlock}>
      {label ? (
        <Text style={[styles.hoursLabel, { color: colors.textSecondary }]}>{label}</Text>
      ) : null}
      {entries.map((h, i) => (
        <Text key={i} style={[styles.hoursLine, { color: colors.text }]}>
          {h.label}: {h.time}
        </Text>
      ))}
    </View>
  );
}

function CanteenCard({ canteen }: { canteen: CanteenContact }) {
  const [expanded, setExpanded] = useState(false);
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setExpanded((v) => !v)}
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.canteenName, { color: colors.text }]}>{canteen.name}</Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={18}
          color={colors.textSecondary}
        />
      </View>

      {expanded ? (
        <View style={styles.cardBody}>
          <View style={styles.lineRow}>
            <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
            <Text style={[styles.lineText, { color: colors.text }]}>{canteen.address}</Text>
          </View>

          <View style={styles.lineRow}>
            <Ionicons name="person-outline" size={16} color={colors.textSecondary} />
            <Text style={[styles.lineText, { color: colors.text }]}>
              {canteen.managerLabel}: {canteen.manager}
            </Text>
          </View>

          <TouchableOpacity style={styles.lineRow} onPress={() => openPhone(canteen.phone)}>
            <Ionicons name="call-outline" size={16} color={colors.primary} />
            <Text style={[styles.lineText, { color: colors.primary }]}>{canteen.phone}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.lineRow} onPress={() => openEmail(canteen.email)}>
            <Ionicons name="mail-outline" size={16} color={colors.primary} />
            <Text style={[styles.lineText, { color: colors.primary }]}>{canteen.email}</Text>
          </TouchableOpacity>

          <View style={styles.hoursSection}>
            <View style={styles.lineRow}>
              <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.hoursTitle, { color: colors.text }]}>Otváracie hodiny</Text>
            </View>
            {canteen.hoursFri ? (
              <>
                <HoursBlock label="Po – Št" entries={canteen.hours} colors={colors} />
                <HoursBlock label="Pi" entries={canteen.hoursFri} colors={colors} />
              </>
            ) : (
              <HoursBlock entries={canteen.hours} colors={colors} />
            )}
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

export default function ContactScreen() {
  const { colors } = useAppTheme();

  return (
    <Screen>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
        {/* Vedenie */}
        {MANAGEMENT_CONTACTS.map((c, i) => (
          <View key={i} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <Text style={[styles.cardTitle, { color: colors.textSecondary }]}>{c.title}</Text>
            <Text style={[styles.managerName, { color: colors.text }]}>{c.name}</Text>

            <View style={[styles.mgmtDivider, { backgroundColor: colors.separator }]} />

            {c.phone ? (
              <TouchableOpacity style={styles.lineRow} onPress={() => openPhone(c.phone!)}>
                <Ionicons name="call-outline" size={16} color={colors.primary} />
                <Text style={[styles.lineText, { color: colors.primary }]}>{c.phone}</Text>
              </TouchableOpacity>
            ) : null}

            {c.mobile ? (
              <TouchableOpacity style={styles.lineRow} onPress={() => openPhone(c.mobile!)}>
                <Ionicons name="phone-portrait-outline" size={16} color={colors.primary} />
                <Text style={[styles.lineText, { color: colors.primary }]}>{c.mobile}</Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity style={styles.lineRow} onPress={() => openEmail(c.email)}>
              <Ionicons name="mail-outline" size={16} color={colors.primary} />
              <Text style={[styles.lineText, { color: colors.primary }]}>{c.email}</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Jedálne */}
        {CANTEEN_CONTACTS.map((c, i) => (
          <CanteenCard key={i} canteen={c} />
        ))}

        {/* Disclaimer */}
        <Text style={[styles.note, { color: colors.textMuted }]}>
          Údaje môžu byť neaktuálne. Aktuálne informácie nájdete na{" "}
          <Text
            style={{ color: colors.primary, textDecorationLine: "underline" }}
            onPress={() => Linking.openURL("https://sdaj.tuke.sk/jedalne/")}
          >
            sdaj.tuke.sk/jedalne/
          </Text>
        </Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40, gap: 12 },

  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  cardTitle: { fontSize: 12, fontWeight: "800", textTransform: "uppercase", letterSpacing: 0.5 },
  managerName: { fontSize: 16, fontWeight: "700" },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  canteenName: { fontSize: 16, fontWeight: "700", flex: 1 },
  cardBody: { marginTop: 8, gap: 8 },

  lineRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  lineText: { fontSize: 14 },

  hoursSection: { marginTop: 4, gap: 4 },
  hoursTitle: { fontSize: 14, fontWeight: "600" },
  hoursBlock: { marginLeft: 26, gap: 2 },
  hoursLabel: { fontSize: 12, fontWeight: "600", marginTop: 4 },
  hoursLine: { fontSize: 13 },

  mgmtDivider: { height: 1, marginVertical: 2 },
  note: { fontSize: 12, textAlign: "center", marginTop: 4, lineHeight: 18 },
});
