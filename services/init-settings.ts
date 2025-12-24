import { settingsRepository } from '@/repositories/settings.repository';
import { getDeviceInfo } from '@/services/device-info';

export async function initSettingsIfNeeded() {
  const device = getDeviceInfo();
  const current = await settingsRepository.get();
  if (current.device_id === device.device_id) {
    const needsMetadataUpdate =
      current.device_model !== device.device_model ||
      current.os_version !== device.os_version;

    if (needsMetadataUpdate) {
      await settingsRepository.update({
        device_model: device.device_model,
        os_version: device.os_version,
      });
    }
    return;
  }
  await settingsRepository.update({
    device_id: device.device_id,
    device_model: device.device_model,
    os_version: device.os_version,
  });
}
