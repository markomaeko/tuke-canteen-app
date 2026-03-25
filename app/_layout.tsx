import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SettingsProvider } from "../src/services/settingsContext";
import { ErrorBoundary } from "../components/ErrorBoundary";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <SettingsProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </SettingsProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
