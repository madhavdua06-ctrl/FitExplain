import Link from "next/link";
import { Dumbbell, Apple, Moon, ArrowUpRight, type LucideIcon } from "lucide-react";

const CATEGORY_ICON: Record<string, LucideIcon> = {
  training: Dumbbell,
  nutrition: Apple,
  recovery: Moon,
};

const CATEGORY_STYLE: Record<string, string> = {
  training: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  nutrition: "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
  recovery: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",
};

export function TopicCard({
  slug,
  title,
  shortDescription,
  category,
}: {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
}) {
  const Icon = CATEGORY_ICON[category] ?? Dumbbell;
  const badgeStyle = CATEGORY_STYLE[category] ?? CATEGORY_STYLE.training;

  return (
    <Link
      href={`/topics/${slug}`}
      className="group relative block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800"
    >
      <div className="flex items-start justify-between">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${badgeStyle}`}>
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-slate-300 transition group-hover:text-emerald-600 dark:text-slate-600"
          aria-hidden
        />
      </div>
      <span className="mt-4 block text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
        {category}
      </span>
      <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{shortDescription}</p>
    </Link>
  );
}
