"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { logWeight } from "@/lib/body/actions";
import { useToast } from "@/lib/toast/ToastContext";

export function LogWeightForm() {
  const [weight, setWeight] = useState("");
  const [isPending, startTransition] = useTransition();
  const [justLogged, setJustLogged] = useState(false);
  const { showToast } = useToast();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = Number(weight);
    if (!Number.isFinite(value) || value <= 0) return;

    startTransition(async () => {
      await logWeight(value);
      setWeight("");
      setJustLogged(true);
      showToast(`Logged ${value}kg — keep tracking your progress.`, "success");
      setTimeout(() => setJustLogged(false), 2000);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative flex-1 max-w-[160px]">
        <input
          type="number"
          inputMode="decimal"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-cyan-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-slate-400">
          kg
        </span>
      </div>
      <button
        type="submit"
        disabled={isPending || !weight}
        className="glow-cyan flex items-center gap-1 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 px-3 py-2 text-sm font-semibold text-white transition hover:from-cyan-400 hover:to-violet-500 disabled:opacity-50"
      >
        <Plus className="h-4 w-4" aria-hidden />
        Log
      </button>
      {justLogged ? <span className="text-xs text-emerald-600 dark:text-emerald-400">Saved</span> : null}
    </form>
  );
}
