import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PlanView } from "@/components/plan/PlanView";
import { ProgressSummary } from "@/components/topics/ProgressSummary";
import { WeeklyRecap } from "@/components/topics/WeeklyRecap";
import { BodyTracker } from "@/components/body/BodyTracker";
import { WaterTracker } from "@/components/water/WaterTracker";
import { DailyTip } from "@/components/dashboard/DailyTip";
import type { PlanResult } from "@/lib/plan/types";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const plan = await prisma.generatedPlan.findUnique({ where: { userId: session.user.id } });
  if (!plan) redirect("/onboarding");

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const todaysWorkoutLogs = await prisma.workoutLog.findMany({
    where: { userId: session.user.id, completedAt: { gte: startOfToday } },
  });
  const completedDayIndicesToday = [...new Set(todaysWorkoutLogs.map((log) => log.dayIndex))];

  return (
    <div>
      <div className="mx-auto max-w-3xl space-y-4 px-4 pt-8">
        <DailyTip />
        <ProgressSummary userId={session.user.id} />
        <WeeklyRecap userId={session.user.id} />
        <BodyTracker userId={session.user.id} />
        <WaterTracker userId={session.user.id} />
      </div>
      <PlanView plan={plan.planData as unknown as PlanResult} completedDayIndicesToday={completedDayIndicesToday} />
    </div>
  );
}
