import Link from "next/link";
import { Dumbbell, Apple, Moon, Brain, ArrowUpRight, CheckCircle2, type LucideIcon } from "lucide-react";

const CATEGORY_ICON: Record<string, LucideIcon> = {
  training: Dumbbell,
  nutrition: Apple,
  recovery: Moon,
  mindset: Brain,
};

const CATEGORY_STYLE: Record<string, string> = {
  training: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  nutrition: "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
  recovery: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",
  mindset: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
};

const CATEGORY_ACCENT: Record<string, string> = {
  training: "from-emerald-400 to-teal-500",
  nutrition: "from-orange-400 to-amber-500",
  recovery: "from-indigo-400 to-blue-500",
  mindset: "from-violet-400 to-fuchsia-500",
};

export function TopicCard({
  slug,
  title,
  shortDescription,
  category,
  completed,
}: {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  completed?: boolean;
}) {
  const Icon = CATEGORY_ICON[category] ?? Dumbbell;
  const badgeStyle = CATEGORY_STYLE[category] ?? CATEGORY_STYLE.training;
  const accent = CATEGORY_ACCENT[category] ?? CATEGORY_ACCENT.training;

  return (
    <Link
      href={`/topics/${slug}`}
      className="glass group relative block overflow-hidden rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/10"
    >
      <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} aria-hidden />
      <div className="flex items-start justify-between">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${badgeStyle}`}>
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        {completed ? (
          <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
            <CheckCircle2 className="h-3 w-3" aria-hidden />
            Done
          </span>
        ) : (
          <ArrowUpRight
            className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-500 dark:text-slate-600"
            aria-hidden
          />
        )}
      </div>
      <span className="mt-4 block text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
        {category}
      </span>
      <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{shortDescription}</p>
    </Link>
  );
}
