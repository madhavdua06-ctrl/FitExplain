import Link from "next/link";
import { Target, Layers, BookMarked, ArrowRight, Sparkles, Users, ShieldCheck } from "lucide-react";
import { ModeText } from "@/components/ModeText";
import { StatTile, StatRow } from "@/components/charts/StatTile";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

export default function HomePage() {
  return (
    <div>
      <div className="relative overflow-hidden">
        <div
          className="animate-drift pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-cyan-400/30 blur-3xl dark:bg-cyan-500/20"
          aria-hidden
        />
        <div
          className="animate-drift-slow pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-violet-400/30 blur-3xl dark:bg-violet-600/20"
          aria-hidden
        />
        <div
          className="animate-drift pointer-events-none absolute top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-600/15"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 pt-16 pb-8 sm:pt-24">
          <div className="text-center">
            <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300">
              <Sparkles className="h-3 w-3" aria-hidden />
              Backed by peer-reviewed research
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="text-slate-900 dark:text-white">Fitness, </span>
              <span className="text-gradient">explained your way.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300">
              Get a personalized training plan and a library of fitness concepts — in plain
              language, or with the full science, charts, and cited studies underneath.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/signup"
                className="btn-pop glow-cyan group inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:from-cyan-400 hover:via-blue-400 hover:to-violet-500"
              >
                Get your plan
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <Link
                href="/topics"
                className="btn-pop glass rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-cyan-400/50 dark:text-slate-200"
              >
                Browse topics
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-3xl px-4 pb-16 sm:pb-24">
        <StatRow>
          <StatTile
            label="Topics covered"
            value={<AnimatedNumber value={12} />}
            sub="Training, nutrition, recovery, mindset"
          />
          <StatTile label="Explanation depths" value={<AnimatedNumber value={2} />} sub="Simple & Scientific" />
          <StatTile
            label="Cited studies"
            value={<AnimatedNumber value={25} suffix="+" />}
            sub="Peer-reviewed sources"
          />
          <StatTile
            label="Setup time"
            value={
              <>
                ~<AnimatedNumber value={3} /> min
              </>
            }
            sub="Goals to full plan"
          />
        </StatRow>

        <div className="glow-violet glass mt-10 rounded-2xl p-6">
          <span className="text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
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

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="glass rounded-xl p-4 transition hover:-translate-y-0.5">
            <span className="glow-cyan flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-white">
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
          <div className="glass rounded-xl p-4 transition hover:-translate-y-0.5">
            <span className="glow-violet flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-400 to-indigo-500 text-white">
              <Layers className="h-[18px] w-[18px]" aria-hidden />
            </span>
            <h2 className="mt-3 font-semibold text-slate-900 dark:text-white">Depth on demand</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Every explanation exists in two versions — everyday language or the underlying
              physiology — so you can go as deep as you want, whenever you want.
            </p>
          </div>
          <div className="glass rounded-xl p-4 transition hover:-translate-y-0.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-400 to-pink-500 text-white shadow-[0_0_0_1px_rgb(217_70_239/0.15),0_0_24px_rgb(217_70_239/0.15)]">
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

        <div className="glass relative mt-12 overflow-hidden rounded-2xl p-6 sm:p-8">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-rose-400/20 blur-3xl dark:bg-rose-500/15"
            aria-hidden
          />
          <span className="text-xs font-semibold uppercase tracking-wide text-rose-600 dark:text-rose-400">
            Why FitExplain exists
          </span>
          <h2 className="mt-2 max-w-xl text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
            Most people get fitness advice from influencers. Most people don&apos;t trust it.
          </h2>
          <div className="relative mt-6 grid gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <span className="glow-cyan flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-white">
                <Users className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  <AnimatedNumber value={40} suffix="%" />
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  of U.S. adults get health and wellness information from social media
                  influencers or podcasts.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-rose-400 to-orange-500 text-white shadow-[0_0_0_1px_rgb(244_63_94/0.15),0_0_24px_rgb(244_63_94/0.15)]">
                <ShieldCheck className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  <AnimatedNumber value={10} suffix="%" />
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  say they trust all or most of the information they get from those
                  influencers — the rest trust it partially, or not at all.
                </p>
              </div>
            </div>
          </div>
          <p className="relative mt-6 text-sm text-slate-600 dark:text-slate-300">
            That gap is the whole reason FitExplain exists: real physiology and nutrition
            science, explained clearly, with every claim traced back to a study you can
            actually read.
          </p>
          <p className="relative mt-4 text-[11px] text-slate-400 dark:text-slate-500">
            Source: Pew Research Center, &ldquo;Trust in Health and Wellness Influencers&rdquo; (2026).
          </p>
        </div>
      </div>
    </div>
  );
}
