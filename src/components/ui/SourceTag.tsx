import { RotateCw } from "lucide-react";

export function SourceTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs text-cyan-700 dark:text-cyan-300">
      <RotateCw className="h-3 w-3" aria-hidden />
      {children}
    </div>
  );
}
