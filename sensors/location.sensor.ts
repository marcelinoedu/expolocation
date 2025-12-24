import * as Location from 'expo-location';

export async function getLocation() {
  const { status } = await Location.requestBackgroundPermissionsAsync();

  if (status !== 'granted') {
    throw new Error('Location permission not granted');
  }

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Highest,
  });

  console.log('Location obtained:', position);

  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
}
