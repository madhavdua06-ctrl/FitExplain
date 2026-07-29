"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { X, Sparkles, Utensils, Flame, Calculator, ChevronLeft } from "lucide-react";
import { markTutorialSeen } from "@/lib/tutorial/actions";

interface Step {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    icon: Sparkles,
    title: "Welcome to FitExplain",
    body: "A 30-second look around before you dive in.",
  },
  {
    icon: Sparkles,
    title: "Read it your way",
    body: "Every topic can be explained two ways — try flipping the toggle below.",
  },
  {
    icon: Utensils,
    title: "Log a little every day",
    body: "Track your weight, water, and meals — FitExplain turns them into charts and streaks on your Dashboard.",
  },
  {
    icon: Flame,
    title: "Build your streak",
    body: "Finishing topics, acing quizzes, and completing workouts all add to your streak and unlock badges on your Journey page.",
  },
  {
    icon: Calculator,
    title: "Free calculators, anytime",
    body: "TDEE, protein, one-rep max, VO2 max — no account needed, under Tools.",
  },
];

const DEMO_TEXT = {
  simple: "Lifting a bit heavier over time is what makes your muscles grow stronger.",
  scientific:
    "Progressive overload — a gradual increase in training stress — drives the mechanotransduction signaling that triggers muscle protein synthesis.",
};

export function TutorialOverlay({ show }: { show: boolean }) {
  const [dismissed, setDismissed] = useState(false);
  const [step, setStep] = useState(0);
  const [demoMode, setDemoMode] = useState<"simple" | "scientific">("simple");
  const [, startTransition] = useTransition();

  if (!show || dismissed) return null;

  function finish() {
    setDismissed(true);
    startTransition(async () => {
      await markTutorialSeen();
    });
  }

  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="glass animate-toast-in relative w-full max-w-md rounded-2xl p-6">
        <button
          type="button"
          onClick={finish}
          aria-label="Skip tutorial"
          className="absolute top-4 right-4 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="h-4 w-4" />
        </button>

        <span className="glow-cyan flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 text-white">
          <Icon className="h-5 w-5" aria-hidden />
        </span>

        <h2 className="text-gradient mt-4 text-xl font-bold">{current.title}</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{current.body}</p>

        {step === 1 ? (
          <div className="mt-4 space-y-3">
            <button
              type="button"
              onClick={() => setDemoMode(demoMode === "simple" ? "scientific" : "simple")}
              aria-pressed={demoMode === "scientific"}
              className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600"
            >
              <span className={demoMode === "simple" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}>
                Simple
              </span>
              <span
                className="relative inline-flex h-5 w-9 items-center rounded-full bg-slate-200 transition dark:bg-slate-700"
                aria-hidden
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${
                    demoMode === "scientific" ? "translate-x-4" : "translate-x-1"
                  }`}
                />
              </span>
              <span className={demoMode === "scientific" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}>
                Scientific
              </span>
            </button>
            <p className="rounded-xl border border-slate-200/80 bg-white/60 p-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              {DEMO_TEXT[demoMode]}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Flip this anytime from the toggle in the header.
            </p>
          </div>
        ) : null}

        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition ${
                  i === step ? "bg-cyan-500" : "bg-slate-300 dark:bg-white/15"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
                Back
              </button>
            ) : null}
            {isLast ? (
              <>
                <Link
                  href="/topics"
                  onClick={finish}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  Explore topics
                </Link>
                <button
                  type="button"
                  onClick={finish}
                  className="btn-pop glow-cyan rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:from-cyan-400 hover:to-violet-500"
                >
                  Got it
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="btn-pop glow-cyan rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:from-cyan-400 hover:to-violet-500"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
