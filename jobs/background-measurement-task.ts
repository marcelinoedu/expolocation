import { collectAndSaveMeasurement } from '@/services/collect-measurement';
import * as BackgroundTask from 'expo-background-task';
import * as TaskManager from 'expo-task-manager';

export const BACKGROUND_MEASUREMENT_TASK = 'background-measurement-task';

TaskManager.defineTask(BACKGROUND_MEASUREMENT_TASK, async () => {
  try {
    console.log('[BG TASK] Measurement');

    console.log("awaiting measurement collection")

    await collectAndSaveMeasurement('background');

    return BackgroundTask.BackgroundTaskResult.Success;
  } catch (error) {
    console.error('[BG TASK] Measurement failed', error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});
