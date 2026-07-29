import { Zap } from "lucide-react";

export function QuickFacts({ facts }: { facts: string[] }) {
  if (!facts.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {facts.map((fact, i) => (
        <span
          key={fact}
          className="animate-fade-in-up glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200"
          style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}
        >
          <Zap className="h-3 w-3 text-cyan-500" aria-hidden />
          {fact}
        </span>
      ))}
    </div>
  );
}
