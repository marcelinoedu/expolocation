import { useSettings } from '@/hooks/use-settings';
import { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConfigIndex() {
  const {
    settings,
    loading,
    updating,
    update,
    collectionIntervalOptions,
    syncIntervalOptions,
  } = useSettings();

  const [openDropdown, setOpenDropdown] = useState<
    'collect' | 'sync' | null
  >(null);

  if (loading || !settings) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Loading settings…</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        
        <View style={styles.deviceInfo}>
          <Text style={styles.deviceTitle}>Informações do dispositivo</Text>
          <Text style={styles.meta}>
            ID: {settings.device_id}
          </Text>
          <Text style={styles.meta}>
            Modelo: {settings.device_model}
          </Text>
          <Text style={styles.meta}>
            Sistema operacional: {settings.os_version}
          </Text>
        </View>

  
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.title}>Coletar dados de localização</Text>
            <Switch
              value={settings.collect_data}
              onValueChange={(value) =>
                update({ collect_data: value })
              }
              disabled={updating}
            />
          </View>

          {settings.collect_data && (
            <>
              <Text style={styles.subtitle}>
                Intervalo entre coleta
              </Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setOpenDropdown('collect')}
                disabled={updating}
              >
                <Text style={styles.dropdownText}>
                  {
                    collectionIntervalOptions.find(
                      o =>
                        o.value ===
                        settings.time_interval
                    )?.label
                  }
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.title}>Sincronizar dados com servidor</Text>
            <Switch
              value={settings.sync_data}
              onValueChange={(value) =>
                update({ sync_data: value })
              }
              disabled={updating}
            />
          </View>

          {settings.sync_data && (
            <>
              <Text style={styles.subtitle}>
                Intervalo entre sincronização
              </Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setOpenDropdown('sync')}
                disabled={updating}
              >
                <Text style={styles.dropdownText}>
                  {
                    syncIntervalOptions.find(
                      o =>
                        o.value ===
                        settings.time_to_sync_server
                    )?.label
                  }
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

    
      <Modal
        transparent
        visible={openDropdown !== null}
        animationType="fade"
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setOpenDropdown(null)}
        >
          <View style={styles.modal}>
            {(openDropdown === 'collect'
              ? collectionIntervalOptions
              : syncIntervalOptions
            ).map(option => (
              <TouchableOpacity
                key={option.value}
                style={styles.option}
                onPress={async () => {
                  if (openDropdown === 'collect') {
                    await update({
                      time_interval: option.value,
                    });
                  } else {
                    await update({
                      time_to_sync_server: option.value,
                    });
                  }
                  setOpenDropdown(null);
                }}
              >
                <Text style={styles.optionText}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deviceInfo: {
    marginBottom: 24,
  },
  deviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    opacity: 1.0,
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    opacity: 1.0,
    marginBottom: 2,
  },
  section: {
    marginBottom: 32,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 13,
    opacity: 0.6,
  },
  dropdown: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dropdownText: {
    fontSize: 14,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  option: {
    paddingVertical: 14,
  },
  optionText: {
    fontSize: 16,
  },
});
