"use server";

import { cookies } from "next/headers";

export async function setThemeAction(theme: "light" | "dark") {
  (await cookies()).set("fittheme", theme, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });
}
