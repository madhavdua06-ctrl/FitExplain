"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function logWorkoutCompletion(dayIndex: number, dayLabel: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return;
  if (!Number.isInteger(dayIndex) || dayIndex < 1) return;
  if (dayLabel.length < 1 || dayLabel.length > 100) return;

  await prisma.workoutLog.create({
    data: { userId: session.user.id, dayIndex, dayLabel },
  });

  revalidatePath("/dashboard");
  revalidatePath("/journey");
}
