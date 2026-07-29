"use client";

import { useEffect, useState, useTransition } from "react";
import { Bell, BellOff } from "lucide-react";
import { subscribePush, unsubscribePush } from "@/lib/push/actions";
import { useToast } from "@/lib/toast/ToastContext";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function EnableRemindersButton() {
  const [supported, setSupported] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  useEffect(() => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
    // One-time feature-detection sync on mount — browser APIs are unavailable during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(true);

    navigator.serviceWorker.register("/sw.js").then(async (registration) => {
      const existing = await registration.pushManager.getSubscription();
      setSubscribed(Boolean(existing));
    });
  }, []);

  function handleEnable() {
    startTransition(async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          showToast("Notification permission was denied.", "info");
          return;
        }

        const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
        if (!publicKey) {
          showToast("Push notifications aren't configured yet.", "info");
          return;
        }

        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey),
        });

        await subscribePush(
          subscription.toJSON() as { endpoint: string; keys: { p256dh: string; auth: string } },
        );
        setSubscribed(true);
        showToast("Water reminders enabled.", "success");
      } catch {
        showToast("Couldn't enable reminders on this browser.", "info");
      }
    });
  }

  function handleDisable() {
    startTransition(async () => {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await unsubscribePush(subscription.endpoint);
        await subscription.unsubscribe();
      }
      setSubscribed(false);
      showToast("Water reminders disabled.", "success");
    });
  }

  if (!supported) return null;

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={subscribed ? handleDisable : handleEnable}
      className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-cyan-400 disabled:opacity-50 dark:border-white/10 dark:text-slate-300"
    >
      {subscribed ? <BellOff className="h-3.5 w-3.5" aria-hidden /> : <Bell className="h-3.5 w-3.5" aria-hidden />}
      {subscribed ? "Disable water reminders" : "Enable water reminders"}
    </button>
  );
}
