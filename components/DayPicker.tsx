import React from "react";
import { ScrollView, Pressable, Text, StyleSheet, View } from "react-native";

type DayOption = { iso: string; label: string; dateLabel: string };

export function DayPicker({
  days,
  value,
  onChange,
}: {
  days: DayOption[];
  value: string;
  onChange: (iso: string) => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {days.map((d) => {
        const active = d.iso === value;
        return (
          <Pressable
            key={d.iso}
            onPress={() => onChange(d.iso)}
            style={[styles.pill, active && styles.pillActive]}
          >
            <Text style={[styles.label, active && styles.labelActive]} numberOfLines={1}>{d.label}</Text>
            <Text style={[styles.date, active && styles.dateActive]}>{d.dateLabel}</Text>
          </Pressable>
        );
      })}
      <View style={{ width: 6 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 10, paddingRight: 16 },
  pill: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    minWidth: 120,
  },
  pillActive: { backgroundColor: "#111", borderColor: "#111" },
  label: { fontSize: 12, fontWeight: "800", color: "#111" },
  labelActive: { color: "#fff" },
  date: { marginTop: 2, fontSize: 12, color: "#555" },
  dateActive: { color: "#ddd" },
});
