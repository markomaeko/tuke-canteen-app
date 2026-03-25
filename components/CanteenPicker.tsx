import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { CANTEENS } from "../src/constants";
import type { CanteenSlug } from "../src/constants";

export function CanteenPicker({
  value,
  onChange,
}: {
  value: CanteenSlug;
  onChange: (v: CanteenSlug) => void;
}) {
  return (
    <View style={styles.pickerBox}>
      <Picker selectedValue={value} onValueChange={(v) => onChange(v as CanteenSlug)}>
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
    borderColor: "#eee",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
});
