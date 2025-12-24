import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function LocationDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>Location ID: {id}</Text>
    </View>
  );
}
