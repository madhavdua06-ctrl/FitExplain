"use client";

import { Printer } from "lucide-react";

export function PrintButton({ label = "Print / Save PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-pop no-print glass flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-cyan-400/50 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
    >
      <Printer className="h-3.5 w-3.5" aria-hidden />
      {label}
    </button>
  );
}
