"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { TopicCard } from "./TopicCard";

export interface TopicSummary {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  completed: boolean;
}

const CATEGORY_LABELS: Record<string, string> = {
  training: "Training",
  nutrition: "Nutrition",
  recovery: "Recovery",
  mindset: "Mindset",
};

export function TopicsGrid({ topics }: { topics: TopicSummary[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(() => Array.from(new Set(topics.map((t) => t.category))), [topics]);

  const filtered = topics.filter((t) => {
    const matchesQuery =
      query.trim() === "" ||
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !category || t.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="glass relative flex-1 rounded-xl">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics…"
            className="w-full rounded-xl bg-transparent py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory(null)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              category === null
                ? "glow-cyan bg-gradient-to-r from-cyan-500 to-violet-600 text-white"
                : "glass text-slate-600 dark:text-slate-300"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                category === c
                  ? "glow-cyan bg-gradient-to-r from-cyan-500 to-violet-600 text-white"
                  : "glass text-slate-600 dark:text-slate-300"
              }`}
            >
              {CATEGORY_LABELS[c] ?? c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {filtered.map((topic) => (
            <TopicCard
              key={topic.id}
              slug={topic.slug}
              title={topic.title}
              shortDescription={topic.shortDescription}
              category={topic.category}
              completed={topic.completed}
            />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          No topics match &quot;{query}&quot;.
        </p>
      )}
    </div>
  );
}
