"use server";

import { cookies, headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function setModeAction(mode: "simple" | "scientific") {
  (await cookies()).set("fitmode", mode, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { mode },
    });
  }
}
