import * as Device from 'expo-device';

export function getDeviceInfo() {
  return {
    device_id: "8f3a6d2e-4f9b-4a6a-9f3c-1c7b2d6e5a91",
    device_model: `${Device.modelName} - ${Device.brand}`,
    os_version: `${Device.osName} ${Device.osVersion} (${Device.osInternalBuildId})`
  };
}
