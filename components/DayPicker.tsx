import React from "react";
import { ScrollView, Pressable, Text, StyleSheet, View } from "react-native";
import { useAppTheme } from "../src/theme";

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
  const { colors } = useAppTheme();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {days.map((d) => {
        const active = d.iso === value;
        return (
          <Pressable
            key={d.iso}
            onPress={() => onChange(d.iso)}
            style={[
              styles.chip,
              {
                backgroundColor: active ? colors.pillActiveBg : colors.pillBg,
                borderColor: active ? colors.pillActiveBg : colors.pillBorder,
              },
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: active ? colors.pillActiveText : colors.text },
              ]}
              numberOfLines={1}
            >
              {d.label}
            </Text>
            <Text
              style={[
                styles.date,
                { color: active ? (colors.pillActiveText + "CC") : colors.textSecondary },
              ]}
            >
              {d.dateLabel}
            </Text>
          </Pressable>
        );
      })}
      <View style={{ width: 8 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 8, paddingHorizontal: 16 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 100,
    alignItems: "center",
  },
  label: { fontSize: 13, fontWeight: "700" },
  date: { marginTop: 2, fontSize: 11, fontWeight: "500" },
});
