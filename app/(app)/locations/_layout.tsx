import { Stack } from 'expo-router';

export default function LocationsStack() {
  return (
    <Stack
    screenOptions={{
        headerShown: false
    }}
    >
      <Stack.Screen name="index" options={{ title: 'Locations' }} />
      {/* <Stack.Screen name="[id]" options={{ title: 'Location' }} /> */}
    </Stack>
  );
}
