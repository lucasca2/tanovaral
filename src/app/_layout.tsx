import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { ThemeProvider } from "native-design-system";
import { theme } from "@/theme";
import { LogsProvider } from "@/features/Logs/providers/useLogs";
import { OnboardingProvider } from "@/features/Onboarding/providers/useOnboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cancelAllScheduledNotificationsAsync } from "expo-notifications";

// import { OneSignal } from "react-native-onesignal";

// OneSignal.initialize("ad72bd30-0a48-47e7-84b9-7e4dcdb9f832");
// OneSignal.Notifications.requestPermission(true);

// Clear
// AsyncStorage.multiRemove([
//   "@tanovaral/onboarding:complete",
//   "@tanovaral/onboarding:days",
//   "@tanovaral/location:city",
//   "@tanovaral/location:weather",
//   "@tanovaral/logs",
// ]);

export default function RootLayout() {
  return (
    <ThemeProvider userTheme={theme}>
      <OnboardingProvider>
        <LogsProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </LogsProvider>
      </OnboardingProvider>
    </ThemeProvider>
  );
}
