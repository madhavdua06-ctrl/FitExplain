"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup, type AuthActionState } from "./actions";

const initialState: AuthActionState = { error: null };

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-cyan-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white";
const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300";

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input id="name" name="name" type="text" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input id="email" name="email" type="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          className={inputClass}
        />
      </div>
      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="glow-cyan w-full rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 px-3 py-2 text-sm font-semibold text-white transition hover:from-cyan-400 hover:to-violet-500 disabled:opacity-60"
      >
        {pending ? "Creating account…" : "Sign up"}
      </button>
      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-cyan-600 dark:text-cyan-400">
          Log in
        </Link>
      </p>
    </form>
  );
}
