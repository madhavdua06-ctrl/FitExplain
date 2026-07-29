import { BookOpen } from "lucide-react";

export interface Source {
  authors: string;
  year: number;
  title: string;
  journal: string;
  url: string;
}

export function Sources({ sources }: { sources: Source[] }) {
  if (!sources.length) return null;

  return (
    <section className="mt-10 border-t border-slate-200 pt-4 dark:border-white/10">
      <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
        <BookOpen className="h-3 w-3" aria-hidden />
        Sources
      </h2>
      <ol className="mt-2 space-y-1.5">
        {sources.map((source) => (
          <li key={source.url} className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-600 underline decoration-slate-300 underline-offset-2 transition hover:text-cyan-600 hover:decoration-cyan-500 dark:text-slate-300 dark:decoration-slate-600 dark:hover:text-cyan-400"
            >
              {source.title}
            </a>
            {" — "}
            {source.authors} ({source.year}). <em>{source.journal}</em>.
          </li>
        ))}
      </ol>
    </section>
  );
}
