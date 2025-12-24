import { useColorScheme } from '@/hooks/use-color-scheme';
import { registerBackgroundTasks } from '@/lifecycle/background-register';
import { bootstrapApp } from '@/lifecycle/bootstrap';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(app)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await bootstrapApp();
        if (cancelled) return;
        await registerBackgroundTasks();
      } catch (error) {
        console.error('[APP INIT] Failed to initialize app', error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
