import { Utensils } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { calculateTdee } from "@/lib/nutrition/tdee";
import { NUTRIENT_KEYS, getRdaTarget, type NutrientKey } from "@/lib/nutrition/rda";
import { Tabs } from "@/components/ui/Tabs";
import { MacroSummary } from "@/components/nutrition/MacroSummary";
import { VitaminMineralView, type DayOption } from "@/components/nutrition/VitaminMineralView";
import { LogFoodForm } from "./LogFoodForm";
import { FoodMacroChart } from "./FoodMacroChart";

interface PlanNutrition {
  calorieAdjustmentPct: number;
  proteinPerKgMin: number;
  proteinPerKgMax: number;
}

function activityMultiplierForFrequency(frequency: number): number {
  if (frequency <= 3) return 1.375;
  if (frequency <= 5) return 1.55;
  return 1.725;
}

function dayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export async function FoodTracker({ userId }: { userId: string }) {
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
  fourteenDaysAgo.setHours(0, 0, 0, 0);

  const [logs, onboarding, plan, latestBodyLog] = await Promise.all([
    prisma.foodLog.findMany({
      where: { userId, loggedAt: { gte: fourteenDaysAgo } },
      orderBy: { loggedAt: "asc" },
    }),
    prisma.onboardingResponse.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } }),
    prisma.generatedPlan.findUnique({ where: { userId } }),
    prisma.bodyLog.findFirst({ where: { userId }, orderBy: { loggedAt: "desc" } }),
  ]);

  const sex = onboarding?.sex ?? "male";
  const age = onboarding?.age ?? 30;
  const weightKg = latestBodyLog?.weightKg ?? onboarding?.weightKg ?? 75;
  const heightCm = onboarding?.heightCm ?? 175;
  const nutrition = plan?.planData
    ? (plan.planData as unknown as { nutrition: PlanNutrition }).nutrition
    : undefined;

  const tdee = calculateTdee({
    sex,
    age,
    weightKg,
    heightCm,
    activityMultiplier: activityMultiplierForFrequency(onboarding?.frequency ?? 4),
  });
  const calorieTarget = tdee * (1 + (nutrition?.calorieAdjustmentPct ?? 0) / 100);
  const proteinTargetMin = weightKg * (nutrition?.proteinPerKgMin ?? 1.4);
  const proteinTargetMax = weightKg * (nutrition?.proteinPerKgMax ?? 1.8);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const todaysLogs = logs.filter((log) => log.loggedAt >= startOfToday);
  const todayTotals = todaysLogs.reduce(
    (acc, log) => ({
      calories: acc.calories + log.calories,
      proteinG: acc.proteinG + log.proteinG,
      carbsG: acc.carbsG + log.carbsG,
      fatG: acc.fatG + log.fatG,
    }),
    { calories: 0, proteinG: 0, carbsG: 0, fatG: 0 },
  );

  const caloriesByDay = new Map<string, number>();
  for (const log of logs) {
    const key = dayKey(log.loggedAt);
    caloriesByDay.set(key, (caloriesByDay.get(key) ?? 0) + log.calories);
  }
  const chartData = Array.from(caloriesByDay.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, calories]) => ({
      x: new Date(key).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      y: calories,
    }));

  const last7Days: DayOption[] = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      key: dayKey(date),
      label: i === 6 ? "Today" : date.toLocaleDateString(undefined, { weekday: "short" }),
    };
  });

  const nutrientTotalsByDay: Record<string, Partial<Record<NutrientKey, number>>> = {};
  for (const log of logs) {
    const key = dayKey(log.loggedAt);
    const dayTotals = nutrientTotalsByDay[key] ?? {};
    const nutrients = (log.nutrients as unknown as Partial<Record<NutrientKey, number>>) ?? {};
    for (const nutrientKey of NUTRIENT_KEYS) {
      dayTotals[nutrientKey] = (dayTotals[nutrientKey] ?? 0) + (nutrients[nutrientKey] ?? 0);
    }
    nutrientTotalsByDay[key] = dayTotals;
  }

  const targets = Object.fromEntries(
    NUTRIENT_KEYS.map((key) => [key, getRdaTarget(key, sex)]),
  ) as Record<NutrientKey, number>;

  return (
    <section className="glass rounded-2xl p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
        <Utensils className="h-4 w-4 text-cyan-500" aria-hidden />
        Nutrition Log
      </h2>

      <div className="mt-4">
        <LogFoodForm />
      </div>

      <div className="mt-6">
        <Tabs
          tabs={[
            {
              id: "macros",
              label: "Macros",
              content: (
                <div className="space-y-6">
                  <MacroSummary
                    calories={todayTotals.calories}
                    calorieTarget={calorieTarget}
                    proteinG={todayTotals.proteinG}
                    proteinTargetMin={proteinTargetMin}
                    proteinTargetMax={proteinTargetMax}
                    carbsG={todayTotals.carbsG}
                    fatG={todayTotals.fatG}
                  />
                  {chartData.length >= 2 ? (
                    <FoodMacroChart data={chartData} />
                  ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Log meals on at least 2 days to see your calorie trend.
                    </p>
                  )}
                </div>
              ),
            },
            {
              id: "vitamins",
              label: "Vitamins & Minerals",
              content: (
                <VitaminMineralView days={last7Days} totalsByDay={nutrientTotalsByDay} targets={targets} />
              ),
            },
          ]}
        />
      </div>
    </section>
  );
}
