import Link from "next/link";
import { Target, Layers, BookMarked, ArrowRight } from "lucide-react";
import { ModeText } from "@/components/ModeText";
import { StatTile, StatRow } from "@/components/charts/StatTile";

export default function HomePage() {
  return (
    <div>
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-300 via-teal-300 to-indigo-300 opacity-30 blur-3xl dark:from-emerald-700 dark:via-teal-700 dark:to-indigo-800 dark:opacity-25"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 pt-16 pb-8 sm:pt-24">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400">
              Backed by peer-reviewed research
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Fitness, explained your way.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300">
              Get a personalized training plan and a library of fitness concepts — in plain
              language, or with the full science, charts, and cited studies underneath.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/25 transition hover:from-emerald-600 hover:to-teal-700 hover:shadow-lg hover:shadow-emerald-600/30"
              >
                Get your plan
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <Link
                href="/topics"
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 dark:border-slate-700 dark:text-slate-200"
              >
                Browse topics
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-16 sm:pb-24">
        <StatRow>
          <StatTile label="Topics covered" value="6" sub="Training, nutrition, recovery" />
          <StatTile label="Explanation depths" value="2" sub="Simple & Scientific" />
          <StatTile label="Cited studies" value="12" sub="Peer-reviewed sources" />
          <StatTile label="Setup time" value="~3 min" sub="Goals to full plan" />
        </StatRow>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
            Example: Progressive Overload
          </span>
          <div className="mt-2 text-slate-700 dark:text-slate-300">
            <ModeText
              simple={
                <p>
                  Think of your muscles like a staircase — if you keep climbing the same three
                  steps every day, you stop getting anywhere new. Gradually making workouts a
                  little harder over time is what keeps your body adapting.
                </p>
              }
              scientific={
                <p>
                  Progressive overload works through mechanotransduction: rising mechanical
                  tension triggers mTOR-pathway signaling and satellite cell activation, driving
                  muscle protein synthesis beyond its accustomed baseline.
                </p>
              }
            />
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Try the Simple / Scientific toggle in the header — this text updates instantly.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl p-1">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
              <Target className="h-[18px] w-[18px]" aria-hidden />
            </span>
            <h2 className="mt-3 font-semibold text-slate-900 dark:text-white">
              A plan built around you
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Tell us your goals, experience, equipment, and schedule — get a training split,
              nutrition targets, and cardio guidance tailored to you.
            </p>
          </div>
          <div className="rounded-xl p-1">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
              <Layers className="h-[18px] w-[18px]" aria-hidden />
            </span>
            <h2 className="mt-3 font-semibold text-slate-900 dark:text-white">Depth on demand</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Every explanation exists in two versions — everyday language or the underlying
              physiology — so you can go as deep as you want, whenever you want.
            </p>
          </div>
          <div className="rounded-xl p-1">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
              <BookMarked className="h-[18px] w-[18px]" aria-hidden />
            </span>
            <h2 className="mt-3 font-semibold text-slate-900 dark:text-white">
              Charts &amp; cited sources
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Each topic pairs a visual with real, linked studies — so you can see the evidence,
              not just take our word for it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
