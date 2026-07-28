"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { onboardingSchema, type OnboardingFormValues } from "@/lib/validation/onboarding";
import { generatePlan } from "@/lib/plan/generatePlan";

export async function submitOnboarding(values: OnboardingFormValues) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const input = onboardingSchema.parse(values);
  const plan = generatePlan(input);
  const planData = JSON.parse(JSON.stringify(plan));

  const response = await prisma.onboardingResponse.create({
    data: {
      userId: session.user.id,
      goal: input.goal,
      experience: input.experience,
      frequency: input.frequency,
      equipment: input.equipment,
      equipmentList: input.equipmentList ?? [],
      limitations: input.limitations,
      age: input.age,
      sex: input.sex,
      weightKg: input.weightKg,
      heightCm: input.heightCm,
    },
  });

  await prisma.generatedPlan.upsert({
    where: { userId: session.user.id },
    update: {
      onboardingResponseId: response.id,
      splitType: plan.splitType,
      summary: plan.cardio.style,
      planData,
    },
    create: {
      userId: session.user.id,
      onboardingResponseId: response.id,
      splitType: plan.splitType,
      summary: plan.cardio.style,
      planData,
    },
  });

  redirect("/dashboard");
}
