let timer: NodeJS.Timeout | null = null;

export function startScheduler(
  intervalMs: number,
  task: () => Promise<void>
) {
  stopScheduler();

  const run = async () => {
    try {
      await task();
    } finally {
      timer = setTimeout(run, intervalMs);
    }
  };

  run();
}

export function stopScheduler() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}
