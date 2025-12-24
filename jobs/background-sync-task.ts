import * as BackgroundTask from 'expo-background-task';
import * as TaskManager from 'expo-task-manager';

export const BACKGROUND_SYNC_TASK = 'background-sync-task';

TaskManager.defineTask(BACKGROUND_SYNC_TASK, async () => {
  try {
    console.log('[BG TASK] Sync');

    // await syncMeasurementsToServer();

    return BackgroundTask.BackgroundTaskResult.Success;
  } catch (error) {
    console.error('[BG TASK] Sync failed', error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});
