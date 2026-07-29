"use client";

import { useState, useTransition } from "react";
import { Sparkles } from "lucide-react";
import { logFood } from "@/lib/food/actions";
import { useToast } from "@/lib/toast/ToastContext";

export function LogFoodForm() {
  const [description, setDescription] = useState("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = description.trim();
    if (!value) return;

    startTransition(async () => {
      const result = await logFood(value);
      if (result.ok) {
        setDescription("");
        showToast("Logged — nice work.", "success");
      } else {
        showToast(result.message ?? "Couldn't log that meal.", "info");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-end">
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="What did you eat? e.g. 2 eggs, wheat toast, black coffee"
        rows={2}
        maxLength={500}
        className="w-full flex-1 resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-cyan-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
      />
      <button
        type="submit"
        disabled={isPending || !description.trim()}
        className="glow-cyan flex shrink-0 items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 px-3 py-2 text-sm font-semibold text-white transition hover:from-cyan-400 hover:to-violet-500 disabled:opacity-50"
      >
        <Sparkles className="h-4 w-4" aria-hidden />
        {isPending ? "Estimating…" : "Log food"}
      </button>
    </form>
  );
}
