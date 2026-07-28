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
    <section className="mt-10 border-t border-slate-200 pt-6 dark:border-slate-800">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
        <BookOpen className="h-4 w-4 text-emerald-600" aria-hidden />
        Sources
      </h2>
      <ol className="mt-3 space-y-3">
        {sources.map((source) => (
          <li key={source.url} className="text-sm text-slate-600 dark:text-slate-300">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 transition hover:text-emerald-600 hover:decoration-emerald-600 dark:text-slate-100 dark:decoration-slate-600"
            >
              {source.title}
            </a>
            <span className="text-slate-500 dark:text-slate-400">
              {" "}
              — {source.authors} ({source.year}). <em>{source.journal}</em>.
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
