import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PlanView } from "@/components/plan/PlanView";
import { ProgressSummary } from "@/components/topics/ProgressSummary";
import type { PlanResult } from "@/lib/plan/types";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const plan = await prisma.generatedPlan.findUnique({ where: { userId: session.user.id } });
  if (!plan) redirect("/onboarding");

  return (
    <div>
      <div className="mx-auto max-w-3xl px-4 pt-8">
        <ProgressSummary userId={session.user.id} />
      </div>
      <PlanView plan={plan.planData as unknown as PlanResult} />
    </div>
  );
}
