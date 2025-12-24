import { LocationCard } from '@/components/location-card';
import { useLatestMeasurements } from '@/hooks/use-measurements';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LocationsListScreen() {
  const { measurements, loading } = useLatestMeasurements(10);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator size="small" />
          <Text style={styles.loadingText}>
            Loading locations…
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (measurements.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>
            No locations yet
          </Text>
          <Text style={styles.emptySubtitle}>
            Start collecting data to see locations here.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {measurements.map(m => (
          <LocationCard
            key={m.collected_at}
            measurement={m}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 13,
    opacity: 0.6,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    opacity: 0.6,
    textAlign: 'center',
  },
});
