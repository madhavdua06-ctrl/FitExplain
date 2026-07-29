import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { checkAndSendReminders } from "@/lib/push/scheduler";

export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });

  await checkAndSendReminders();
  return NextResponse.json({ ok: true });
}
