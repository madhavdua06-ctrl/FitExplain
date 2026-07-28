import Link from "next/link";
import { ModeText } from "@/components/ModeText";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          Fitness, explained your way.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300">
          Get a personalized training plan and a library of fitness concepts — in plain language,
          or with the full science underneath. Flip the toggle in the header anytime.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/signup"
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Get your plan
          </Link>
          <Link
            href="/topics"
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 dark:border-slate-700 dark:text-slate-200"
          >
            Browse topics
          </Link>
        </div>
      </div>

      <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
          Example: Progressive Overload
        </span>
        <div className="mt-2 text-slate-700 dark:text-slate-300">
          <ModeText
            simple={
              <p>
                Think of your muscles like a staircase — if you keep climbing the same three
                steps every day, you stop getting anywhere new. Gradually making workouts a little
                harder over time is what keeps your body adapting.
              </p>
            }
            scientific={
              <p>
                Progressive overload works through mechanotransduction: rising mechanical tension
                triggers mTOR-pathway signaling and satellite cell activation, driving muscle
                protein synthesis beyond its accustomed baseline.
              </p>
            }
          />
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Try the Simple / Scientific toggle in the header — this text updates instantly.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white">A plan built around you</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Tell us your goals, experience, equipment, and schedule — get a training split,
            nutrition targets, and cardio guidance tailored to you.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-slate-900 dark:text-white">Depth on demand</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Every explanation exists in two versions — everyday language or the underlying
            physiology — so you can go as deep as you want, whenever you want.
          </p>
        </div>
      </div>
    </div>
  );
}
