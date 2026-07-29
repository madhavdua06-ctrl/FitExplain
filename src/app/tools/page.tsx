import { headers } from "next/headers";
import { Calculator } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Tabs } from "@/components/ui/Tabs";
import { SourceTag } from "@/components/ui/SourceTag";
import { TdeeCalculator } from "@/components/tools/TdeeCalculator";
import { OneRepMaxCalculator } from "@/components/tools/OneRepMaxCalculator";
import { ProteinCalculator, type GoalKey } from "@/components/tools/ProteinCalculator";
import { Vo2MaxCalculator } from "@/components/tools/Vo2MaxCalculator";

const GOAL_KEY_MAP: Record<string, GoalKey> = {
  WEIGHT_LOSS: "Weight loss",
  MUSCLE_GAIN: "Muscle gain",
  ENDURANCE: "Endurance / general health",
  GENERAL_HEALTH: "Endurance / general health",
};

export default async function ToolsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  const sourceParts: string[] = [];
  let tdeeInitial: { sex?: "male" | "female"; age?: number; weightKg?: number; heightCm?: number } | undefined;
  let proteinInitial: { weightKg?: number; goal?: GoalKey } | undefined;

  if (session) {
    const [latestOnboarding, latestBodyLog] = await Promise.all([
      prisma.onboardingResponse.findFirst({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
      }),
      prisma.bodyLog.findFirst({
        where: { userId: session.user.id },
        orderBy: { loggedAt: "desc" },
      }),
    ]);

    const weightKg = latestBodyLog?.weightKg ?? latestOnboarding?.weightKg ?? undefined;

    if (latestOnboarding || latestBodyLog) {
      if (latestOnboarding?.age) sourceParts.push(`${latestOnboarding.age}yo`);
      if (weightKg) sourceParts.push(`${weightKg}kg`);
      if (latestOnboarding?.heightCm) sourceParts.push(`${latestOnboarding.heightCm}cm`);
      if (latestOnboarding?.goal) sourceParts.push(GOAL_KEY_MAP[latestOnboarding.goal].toLowerCase());

      tdeeInitial = {
        sex: latestOnboarding?.sex === "female" ? "female" : latestOnboarding?.sex === "male" ? "male" : undefined,
        age: latestOnboarding?.age ?? undefined,
        weightKg,
        heightCm: latestOnboarding?.heightCm ?? undefined,
      };
      proteinInitial = {
        weightKg,
        goal: latestOnboarding?.goal ? GOAL_KEY_MAP[latestOnboarding.goal] : undefined,
      };
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <span className="glow-cyan inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white">
        <Calculator className="h-5 w-5" aria-hidden />
      </span>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">
        <span className="text-gradient">Calculators</span>
      </h1>
      <p className="mt-2 max-w-xl text-slate-600 dark:text-slate-300">
        Quick, standalone tools — no account needed. Numbers update as you type.
      </p>

      {sourceParts.length ? (
        <SourceTag>Using saved data: {sourceParts.join(" · ")}</SourceTag>
      ) : null}

      <div className="mt-8">
        <Tabs
          tabs={[
            { id: "tdee", label: "Calorie (TDEE)", content: <TdeeCalculator initial={tdeeInitial} /> },
            { id: "1rm", label: "1-Rep Max", content: <OneRepMaxCalculator /> },
            {
              id: "protein",
              label: "Protein Target",
              content: (
                <ProteinCalculator initialWeightKg={proteinInitial?.weightKg} initialGoal={proteinInitial?.goal} />
              ),
            },
            { id: "vo2max", label: "VO2 Max", content: <Vo2MaxCalculator /> },
          ]}
        />
      </div>
    </div>
  );
}
