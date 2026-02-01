import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SettingsProvider } from "../src/services/settingsContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
