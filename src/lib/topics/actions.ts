"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function submitQuiz(topicSlug: string, score: number) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return;

  await prisma.topicProgress.upsert({
    where: { userId_topicSlug: { userId: session.user.id, topicSlug } },
    update: { quizScore: score, completedAt: new Date() },
    create: { userId: session.user.id, topicSlug, quizScore: score },
  });

  revalidatePath("/topics");
  revalidatePath("/dashboard");
  revalidatePath("/journey");
}

export async function markTopicComplete(topicSlug: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return;

  await prisma.topicProgress.upsert({
    where: { userId_topicSlug: { userId: session.user.id, topicSlug } },
    update: {},
    create: { userId: session.user.id, topicSlug },
  });

  revalidatePath("/topics");
  revalidatePath("/dashboard");
  revalidatePath("/journey");
}
