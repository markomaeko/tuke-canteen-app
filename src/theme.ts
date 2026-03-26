import { useColorScheme } from "react-native";
import { useSettings } from "./services/settingsContext";

// TUKE brand farby
const palette = {
  navy: "#1B3A5C",
  red: "#C8102E",
  white: "#FFFFFF",
  lightGray: "#F5F6F8",
  darkBg: "#121212",
  darkSurface: "#1E1E1E",
  darkCard: "#2A2A2A",
  lightText: "#1A1A1A",
  darkText: "#E0E0E0",
} as const;

export type ThemeColors = {
  primary: string;
  accent: string;
  background: string;
  surface: string;
  card: string;
  cardBorder: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  headerBg: string;
  headerText: string;
  drawerBg: string;
  drawerActive: string;
  drawerActiveText: string;
  drawerText: string;
  chipBg: string;
  chipBorder: string;
  chipText: string;
  pillBg: string;
  pillBorder: string;
  pillActiveBg: string;
  pillActiveText: string;
  statusBoxBg: string;
  statusBoxBorder: string;
  statusBoxText: string;
  onPrimary: string;
  switchTrack: string;
  icon: string;
  separator: string;
  shadow: string;
};

const lightColors: ThemeColors = {
  primary: palette.navy,
  accent: palette.red,
  background: palette.white,
  surface: palette.lightGray,
  card: palette.white,
  cardBorder: "#E0E0E0",
  text: palette.lightText,
  textSecondary: "#666666",
  textMuted: "#999999",
  headerBg: palette.navy,
  headerText: palette.white,
  drawerBg: palette.white,
  drawerActive: palette.red,
  drawerActiveText: palette.red,
  drawerText: palette.lightText,
  chipBg: palette.lightGray,
  chipBorder: "#D0D0D0",
  chipText: "#444444",
  pillBg: palette.white,
  pillBorder: "#D0D0D0",
  pillActiveBg: palette.navy,
  pillActiveText: palette.white,
  statusBoxBg: "#FFF5F5",
  statusBoxBorder: "#F3C7C7",
  statusBoxText: "#7A1F1F",
  onPrimary: palette.white,
  switchTrack: palette.navy,
  icon: "#555555",
  separator: "#E8E8E8",
  shadow: "#000000",
};

const darkColors: ThemeColors = {
  primary: "#4A7FB5",
  accent: "#E84057",
  background: palette.darkBg,
  surface: palette.darkSurface,
  card: palette.darkCard,
  cardBorder: "#3A3A3A",
  text: palette.darkText,
  textSecondary: "#AAAAAA",
  textMuted: "#777777",
  headerBg: palette.darkSurface,
  headerText: palette.darkText,
  drawerBg: palette.darkSurface,
  drawerActive: "#E84057",
  drawerActiveText: "#E84057",
  drawerText: palette.darkText,
  chipBg: "#333333",
  chipBorder: "#444444",
  chipText: "#CCCCCC",
  pillBg: palette.darkCard,
  pillBorder: "#3A3A3A",
  pillActiveBg: "#4A7FB5",
  pillActiveText: palette.white,
  statusBoxBg: "#3A2020",
  statusBoxBorder: "#5A3030",
  statusBoxText: "#F0A0A0",
  onPrimary: palette.white,
  switchTrack: "#4A7FB5",
  icon: "#AAAAAA",
  separator: "#333333",
  shadow: "#000000",
};

export type ThemeMode = "system" | "light" | "dark";

const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
} as const;

const radii = {
  s: 8,
  m: 12,
  l: 16,
  full: 999,
} as const;

export type AppTheme = {
  dark: boolean;
  colors: ThemeColors;
  spacing: typeof spacing;
  radii: typeof radii;
};

export function useAppTheme(): AppTheme {
  const systemScheme = useColorScheme();
  const { settings, ready } = useSettings();

  let isDark: boolean;
  if (!ready || settings.themeMode === "system") {
    isDark = systemScheme === "dark";
  } else {
    isDark = settings.themeMode === "dark";
  }

  return {
    dark: isDark,
    colors: isDark ? darkColors : lightColors,
    spacing,
    radii,
  };
}
