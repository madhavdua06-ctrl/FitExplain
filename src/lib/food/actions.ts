"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { estimateNutrition } from "@/lib/nutrition/claude";

const DAILY_FOOD_LOG_LIMIT = 20;

export async function logFood(rawDescription: string): Promise<{ ok: boolean; message?: string }> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { ok: false, message: "You need to be logged in to log food." };

  const description = rawDescription.trim();
  if (description.length < 1 || description.length > 500) {
    return { ok: false, message: "Describe what you ate in a sentence or two." };
  }

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const todayCount = await prisma.foodLog.count({
    where: { userId: session.user.id, loggedAt: { gte: startOfToday } },
  });
  if (todayCount >= DAILY_FOOD_LOG_LIMIT) {
    return { ok: false, message: `You've hit today's food-log limit (${DAILY_FOOD_LOG_LIMIT}). Try again tomorrow.` };
  }

  const result = await estimateNutrition(description);
  if (!result.ok) return { ok: false, message: result.message };

  await prisma.foodLog.create({
    data: {
      userId: session.user.id,
      rawDescription: description,
      calories: result.data.calories,
      proteinG: result.data.proteinG,
      carbsG: result.data.carbsG,
      fatG: result.data.fatG,
      nutrients: result.data.nutrients,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/journey");

  return { ok: true };
}
