"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function logWeight(weightKg: number) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return;
  if (!Number.isFinite(weightKg) || weightKg <= 0 || weightKg > 400) return;

  await prisma.bodyLog.create({
    data: { userId: session.user.id, weightKg },
  });

  revalidatePath("/dashboard");
}
