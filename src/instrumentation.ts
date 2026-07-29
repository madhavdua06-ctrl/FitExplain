export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { startWaterReminderScheduler } = await import("@/lib/push/scheduler");
    startWaterReminderScheduler();
  }
}
