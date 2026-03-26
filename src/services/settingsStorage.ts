import AsyncStorage from "@react-native-async-storage/async-storage";
import type { CanteenSlug } from "../constants";
import type { ThemeMode } from "../theme";

export type AppSettings = {
  defaultCanteen: CanteenSlug;
  showAllergens: boolean;
  themeMode: ThemeMode;
};

const KEY = "tuke.settings.v2";

export const DEFAULT_SETTINGS: AppSettings = {
  defaultCanteen: "jedalen-jedlikova-7",
  showAllergens: true,
  themeMode: "system",
};

export async function loadSettings(): Promise<AppSettings> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return DEFAULT_SETTINGS;
  try {
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<AppSettings>) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(s: AppSettings): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(s));
}
