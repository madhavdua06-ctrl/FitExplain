import { Flag } from "lucide-react";
import { ModeText } from "@/components/ModeText";

export function Conclusion({ simple, scientific }: { simple: string; scientific: string }) {
  return (
    <div className="glow-violet glass rounded-2xl p-5">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-violet-700 dark:text-violet-400">
        <Flag className="h-4 w-4" aria-hidden />
        Bottom line
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <ModeText simple={simple} scientific={scientific} />
      </p>
    </div>
  );
}
