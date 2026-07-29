"use client";

import { useState, useTransition } from "react";
import { Droplet } from "lucide-react";
import { logWater } from "@/lib/water/actions";
import { useToast } from "@/lib/toast/ToastContext";
import { NumberField } from "@/components/tools/NumberField";

export function LogWaterForm() {
  const [custom, setCustom] = useState("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  function log(amountMl: number) {
    if (!Number.isFinite(amountMl) || amountMl <= 0) return;
    startTransition(async () => {
      await logWater(amountMl);
      showToast(`Logged ${amountMl}ml of water.`, "success");
    });
  }

  function handleCustomSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = Number(custom);
    log(value);
    setCustom("");
  }

  return (
    <div className="flex flex-wrap items-end gap-2">
      <button
        type="button"
        disabled={isPending}
        onClick={() => log(250)}
        className="glow-cyan flex items-center gap-1 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 px-3 py-2 text-sm font-semibold text-white transition hover:from-cyan-400 hover:to-violet-500 disabled:opacity-50"
      >
        <Droplet className="h-4 w-4" aria-hidden />
        +250ml
      </button>
      <button
        type="button"
        disabled={isPending}
        onClick={() => log(500)}
        className="glow-cyan flex items-center gap-1 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 px-3 py-2 text-sm font-semibold text-white transition hover:from-cyan-400 hover:to-violet-500 disabled:opacity-50"
      >
        <Droplet className="h-4 w-4" aria-hidden />
        +500ml
      </button>
      <form onSubmit={handleCustomSubmit} className="flex items-end gap-2">
        <div className="w-28">
          <NumberField label="Custom" value={custom} onChange={setCustom} unit="ml" />
        </div>
        <button
          type="submit"
          disabled={isPending || !custom}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-cyan-400 disabled:opacity-50 dark:border-white/10 dark:text-slate-200"
        >
          Add
        </button>
      </form>
    </div>
  );
}
