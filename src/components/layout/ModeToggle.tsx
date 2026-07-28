"use client";

import { useMode } from "@/lib/mode/ModeContext";

export function ModeToggle() {
  const { mode, toggleMode } = useMode();
  const isScientific = mode === "scientific";

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-pressed={isScientific}
      className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600"
    >
      <span className={!isScientific ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}>
        Simple
      </span>
      <span
        className="relative inline-flex h-5 w-9 items-center rounded-full bg-slate-200 transition dark:bg-slate-700"
        aria-hidden
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${
            isScientific ? "translate-x-4" : "translate-x-1"
          }`}
        />
      </span>
      <span className={isScientific ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"}>
        Scientific
      </span>
    </button>
  );
}
