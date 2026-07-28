"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { signupSchema } from "@/lib/validation/auth";

export interface AuthActionState {
  error: string | null;
}

export async function signup(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await auth.api.signUpEmail({ body: parsed.data });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Could not create account" };
  }

  redirect("/onboarding");
}
