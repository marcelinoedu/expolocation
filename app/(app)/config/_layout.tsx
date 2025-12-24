import { Stack } from 'expo-router';

export default function ConfigStack() {
  return (
    <Stack screenOptions={{
        headerShown: false
    }}>
      <Stack.Screen name="index" options={{ title: 'Settings' }}/>
    </Stack>
  );
}
