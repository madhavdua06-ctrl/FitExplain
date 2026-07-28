"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { loginSchema } from "@/lib/validation/auth";

export interface AuthActionState {
  error: string | null;
}

export async function login(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await auth.api.signInEmail({ body: parsed.data });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Invalid email or password" };
  }

  redirect("/dashboard");
}
