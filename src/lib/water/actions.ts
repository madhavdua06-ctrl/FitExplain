"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function logWater(amountMl: number) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return;
  if (!Number.isFinite(amountMl) || amountMl <= 0 || amountMl > 5000) return;

  await prisma.waterLog.create({
    data: { userId: session.user.id, amountMl },
  });

  revalidatePath("/dashboard");
}
