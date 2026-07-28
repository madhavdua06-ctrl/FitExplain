import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PlanView } from "@/components/plan/PlanView";
import type { PlanResult } from "@/lib/plan/types";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const plan = await prisma.generatedPlan.findUnique({ where: { userId: session.user.id } });
  if (!plan) redirect("/onboarding");

  return <PlanView plan={plan.planData as unknown as PlanResult} />;
}
