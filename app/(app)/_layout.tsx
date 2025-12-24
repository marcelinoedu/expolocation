import { IconSymbol } from "@/components/ui/icon-symbol";
import { Tabs } from "expo-router";
export const unstable_settings = {
  anchor: "home-maps",
};

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home-maps"
        options={{
          title: "Home Maps",
          tabBarLabel: "Home Maps",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="map.fill" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="locations"
        options={{
          title: "Locations",
          tabBarLabel: "Locations",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="mappin.and.ellipse" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="config"
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="gearshape.fill" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
