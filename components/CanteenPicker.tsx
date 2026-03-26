import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { CANTEENS } from "../src/constants";
import type { CanteenSlug } from "../src/constants";
import { useAppTheme } from "../src/theme";

export function CanteenPicker({
  value,
  onChange,
}: {
  value: CanteenSlug;
  onChange: (v: CanteenSlug) => void;
}) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.pickerBox, { borderColor: colors.cardBorder, backgroundColor: colors.card }]}>
      <Picker
        selectedValue={value}
        onValueChange={(v) => onChange(v as CanteenSlug)}
        dropdownIconColor={colors.textSecondary}
        style={{ color: colors.text }}
      >
        {CANTEENS.map((c) => (
          <Picker.Item key={c.slug} label={c.name} value={c.slug} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerBox: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
});
