import { BACKGROUND_MEASUREMENT_TASK } from '@/jobs/background-measurement-task';
import { BACKGROUND_SYNC_TASK } from '@/jobs/background-sync-task';
import { settingsRepository } from '@/repositories/settings.repository';
import * as BackgroundTask from 'expo-background-task';
import * as TaskManager from 'expo-task-manager';

export async function registerBackgroundTasks() {
  const status = await BackgroundTask.getStatusAsync();

  if (status !== BackgroundTask.BackgroundTaskStatus.Available) {
    console.warn('[BG] Background tasks not available');
    return;
  }
  const settings = await settingsRepository.get();
  
  const measurementRegistered =
    await TaskManager.isTaskRegisteredAsync(BACKGROUND_MEASUREMENT_TASK);

  if (settings.collect_data) {
    if (measurementRegistered) {
      await BackgroundTask.unregisterTaskAsync(BACKGROUND_MEASUREMENT_TASK);
    }

    await BackgroundTask.registerTaskAsync(
      BACKGROUND_MEASUREMENT_TASK,
      {
        minimumInterval: settings.time_interval, 
      }
    );

    console.log('[BG] Measurement task registered/reconfigured');
  } else if (measurementRegistered) {
    await BackgroundTask.unregisterTaskAsync(BACKGROUND_MEASUREMENT_TASK);
    console.log('[BG] Measurement task unregistered');
  }

  
  const syncRegistered =
    await TaskManager.isTaskRegisteredAsync(BACKGROUND_SYNC_TASK);

  if (settings.sync_data) {
    if (syncRegistered) {
      await BackgroundTask.unregisterTaskAsync(BACKGROUND_SYNC_TASK);
    }

    await BackgroundTask.registerTaskAsync(
      BACKGROUND_SYNC_TASK,
      {
        minimumInterval: settings.time_to_sync_server,
      }
    );

    console.log('[BG] Sync task registered/reconfigured');
  } else if (syncRegistered) {
    await BackgroundTask.unregisterTaskAsync(BACKGROUND_SYNC_TASK);
    console.log('[BG] Sync task unregistered');
  }
}
