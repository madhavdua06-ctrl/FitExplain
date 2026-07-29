"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function subscribePush(sub: { endpoint: string; keys: { p256dh: string; auth: string } }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { ok: false };

  await prisma.pushSubscription.upsert({
    where: { endpoint: sub.endpoint },
    update: { userId: session.user.id, p256dh: sub.keys.p256dh, auth: sub.keys.auth },
    create: {
      userId: session.user.id,
      endpoint: sub.endpoint,
      p256dh: sub.keys.p256dh,
      auth: sub.keys.auth,
    },
  });

  return { ok: true };
}

export async function unsubscribePush(endpoint: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { ok: false };

  await prisma.pushSubscription.deleteMany({
    where: { endpoint, userId: session.user.id },
  });

  return { ok: true };
}
