import { RawMeasurement } from '@/types/raw-measurement';
import { StyleSheet, Text, View } from 'react-native';


type Props = {
  measurement: RawMeasurement;
};

export function LocationCard({ measurement }: Props) {
  const date = new Date(measurement.collected_at);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.time}>
          {date.toLocaleDateString()} ·{' '}
          {date.toLocaleTimeString()}
        </Text>

        <View
          style={[
            styles.badge,
            measurement.synced
              ? styles.badgeSynced
              : styles.badgePending,
          ]}
        >
          <Text style={styles.badgeText}>
            {measurement.synced ? 'Synced' : 'Pending'}
          </Text>
        </View>
      </View>

      {/* Coordinates */}
      <View style={styles.row}>
        <Text style={styles.label}>Latitude</Text>
        <Text style={styles.value}>
          {measurement.latitude.toFixed(6)}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Longitude</Text>
        <Text style={styles.value}>
          {measurement.longitude.toFixed(6)}
        </Text>
      </View>

      {/* Metrics */}
      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Temp</Text>
          <Text style={styles.metricValue}>
            {measurement.temperature_c.toFixed(1)} °C
          </Text>
        </View>

        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Pressure</Text>
          <Text style={styles.metricValue}>
            {measurement.pressure_hpa.toFixed(1)} hPa
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3, // Android
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  time: {
    fontSize: 12,
    opacity: 0.6,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  badgeSynced: {
    backgroundColor: '#E6F7EE',
  },
  badgePending: {
    backgroundColor: '#FFF3E0',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    opacity: 0.6,
  },
  value: {
    fontSize: 13,
    fontWeight: '500',
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  metric: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
});

