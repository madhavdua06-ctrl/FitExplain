import { prisma } from "@/lib/prisma";
import { sendPushNotification } from "./webpush";

const REMINDER_GAP_MS = 3 * 60 * 60 * 1000;
const WAKING_HOUR_START = 8;
const WAKING_HOUR_END = 21;

export async function checkAndSendReminders() {
  const hour = new Date().getHours();
  if (hour < WAKING_HOUR_START || hour >= WAKING_HOUR_END) return;

  const subscriptions = await prisma.pushSubscription.findMany();

  for (const sub of subscriptions) {
    const lastLog = await prisma.waterLog.findFirst({
      where: { userId: sub.userId },
      orderBy: { loggedAt: "desc" },
    });
    const lastActivity = lastLog?.loggedAt ?? sub.createdAt;
    const gap = Date.now() - lastActivity.getTime();
    if (gap < REMINDER_GAP_MS) continue;

    await sendPushNotification(
      { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
      { title: "Time to hydrate", body: "You haven't logged water in a while." },
    );
  }
}

export function startWaterReminderScheduler() {
  const globalScope = globalThis as unknown as { __waterSchedulerStarted?: boolean };
  if (globalScope.__waterSchedulerStarted) return;
  globalScope.__waterSchedulerStarted = true;

  console.log("[water-reminder] scheduler started");

  setInterval(() => {
    checkAndSendReminders().catch(() => {});
  }, 20 * 60 * 1000);
}
