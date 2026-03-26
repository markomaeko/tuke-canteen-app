import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { CANTEENS } from "../../src/constants";
import { useActiveCanteen } from "../../src/services/activeCanteenContext";
import { useAppTheme, type ThemeColors } from "../../src/theme";
import { TukeLogo } from "../../components/TukeLogo";

// Farby avatárov jedální
const AVATAR_COLORS = [
  "#C8102E", "#1B3A5C", "#2E7D32", "#E65100",
  "#6A1B9A", "#00838F", "#AD1457",
] as const;

function CanteenAvatar({ name, index, size = 40 }: { name: string; index: number; size?: number }) {
  const letter = name.charAt(0).toUpperCase();
  const bg = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: bg }]}>
      <Text style={[styles.avatarText, { fontSize: size * 0.4 }]}>{letter}</Text>
    </View>
  );
}

type DrawerItem = {
  route: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const NAV_ITEMS: DrawerItem[] = [
  { route: "index", label: "Jedálny lístok", icon: "restaurant" },
  { route: "allergens", label: "Alergény", icon: "alert-circle" },
  { route: "orders", label: "Objednávky", icon: "cart" },
  { route: "contact", label: "Kontakt", icon: "call" },
  { route: "settings", label: "Nastavenia", icon: "settings" },
];

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { activeCanteen, setActiveCanteen } = useActiveCanteen();
  const { colors } = useAppTheme();
  const currentRoute = props.state.routes[props.state.index]?.name ?? "index";

  const ds = drawerStyles(colors);

  return (
    <View style={[ds.container, { backgroundColor: colors.drawerBg }]}>
      {/* Hlavička */}
      <View style={[ds.header, { backgroundColor: colors.headerBg }]}>
        <View style={ds.headerRow}>
          <TukeLogo size={28} color="#fff" />
          <Text style={ds.headerTitle}>TUKE Jedálne</Text>
        </View>
        <Text style={ds.headerSubtitle}>Technická univerzita v Košiciach</Text>
      </View>

      <ScrollView style={ds.scroll} showsVerticalScrollIndicator={false}>
        {/* Výber jedálne */}
        <Text style={[ds.sectionLabel, { color: colors.textSecondary }]}>JEDÁLEŇ</Text>
        {CANTEENS.map((c, i) => {
          const active = activeCanteen === c.slug;
          return (
            <Pressable
              key={c.slug}
              style={[
                ds.canteenRow,
                { backgroundColor: active ? (colors.drawerActive + "14") : "transparent" },
              ]}
              onPress={() => {
                setActiveCanteen(c.slug);
                props.navigation.navigate("index");
                props.navigation.closeDrawer();
              }}
            >
              <CanteenAvatar name={c.name} index={i} size={36} />
              <Text
                style={[
                  ds.canteenName,
                  { color: active ? colors.drawerActiveText : colors.drawerText },
                ]}
                numberOfLines={1}
              >
                {c.name}
              </Text>
              {active ? (
                <Ionicons name="checkmark" size={18} color={colors.drawerActive} />
              ) : null}
            </Pressable>
          );
        })}

        {/* Oddelovač */}
        <View style={[ds.separator, { backgroundColor: colors.separator }]} />

        {/* Navigácia */}
        <Text style={[ds.sectionLabel, { color: colors.textSecondary }]}>NAVIGÁCIA</Text>
        {NAV_ITEMS.map((item) => {
          const active = currentRoute === item.route;
          return (
            <Pressable
              key={item.route}
              style={[
                ds.navRow,
                { backgroundColor: active ? (colors.drawerActive + "14") : "transparent" },
              ]}
              onPress={() => {
                props.navigation.navigate(item.route);
                props.navigation.closeDrawer();
              }}
            >
              <Ionicons
                name={active ? item.icon : (`${item.icon}-outline` as keyof typeof Ionicons.glyphMap)}
                size={22}
                color={active ? colors.drawerActive : colors.icon}
              />
              <Text
                style={[
                  ds.navLabel,
                  { color: active ? colors.drawerActiveText : colors.drawerText },
                  active && ds.navLabelActive,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default function DrawerLayout() {
  const { colors } = useAppTheme();

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.headerBg },
        headerTintColor: colors.headerText,
        headerTitleStyle: { fontWeight: "700" },
        drawerType: "front",
        swipeEnabled: true,
      }}
    >
      <Drawer.Screen name="index" options={{ title: "Jedálny lístok" }} />
      <Drawer.Screen name="allergens" options={{ title: "Alergény" }} />
      <Drawer.Screen name="orders" options={{ title: "Objednávky" }} />
      <Drawer.Screen name="contact" options={{ title: "Kontakt" }} />
      <Drawer.Screen name="settings" options={{ title: "Nastavenia" }} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  avatar: { justifyContent: "center", alignItems: "center" },
  avatarText: { color: "#fff", fontWeight: "800" },
});

const drawerStyles = (c: ThemeColors) =>
  StyleSheet.create({
    container: { flex: 1 },
    header: {
      paddingTop: 56,
      paddingBottom: 20,
      paddingHorizontal: 20,
    },
    headerRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    headerTitle: { color: "#fff", fontSize: 20, fontWeight: "800" },
    headerSubtitle: { color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 4 },
    scroll: { flex: 1 },
    sectionLabel: {
      fontSize: 11,
      fontWeight: "800",
      letterSpacing: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 8,
    },
    canteenRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 12,
      marginHorizontal: 8,
    },
    canteenName: { flex: 1, fontSize: 13, fontWeight: "600" },
    separator: { height: 1, marginHorizontal: 20, marginVertical: 8 },
    navRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 12,
      marginHorizontal: 8,
    },
    navLabel: { fontSize: 14, fontWeight: "500" },
    navLabelActive: { fontWeight: "700" },
  });
