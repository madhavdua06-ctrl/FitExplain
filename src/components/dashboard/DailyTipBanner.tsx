"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";

const STORAGE_KEY = "fitexplain:lastTipDate";

export function DailyTipBanner({
  fact,
  topicTitle,
  topicSlug,
}: {
  fact: string;
  topicTitle: string;
  topicSlug: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const lastSeen = window.localStorage.getItem(STORAGE_KEY);
    if (lastSeen === today) return;
    // One-time sync with localStorage (an external system) on mount — must run
    // post-hydration since localStorage is unavailable during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    window.localStorage.setItem(STORAGE_KEY, today);
  }, []);

  if (!visible) return null;

  return (
    <div className="glass animate-toast-in relative flex items-start gap-3 rounded-2xl p-4">
      <span className="glow-cyan flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 text-white">
        <Sparkles className="h-4 w-4" aria-hidden />
      </span>
      <div className="flex-1">
        <p className="text-sm text-slate-700 dark:text-slate-200">{fact}</p>
        <Link
          href={`/topics/${topicSlug}`}
          className="mt-1 inline-block text-xs font-medium text-cyan-600 hover:underline dark:text-cyan-400"
        >
          From {topicTitle} — learn more
        </Link>
      </div>
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
        className="text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
