import { BookOpen } from "lucide-react";

export type EvidenceGrade = "strong" | "moderate" | "limited";

export interface Source {
  authors: string;
  year: number;
  title: string;
  journal: string;
  url: string;
  evidenceGrade?: EvidenceGrade;
}

const GRADE_LABEL: Record<EvidenceGrade, string> = {
  strong: "Strong evidence",
  moderate: "Moderate evidence",
  limited: "Limited evidence",
};

const GRADE_STYLE: Record<EvidenceGrade, string> = {
  strong:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  moderate:
    "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  limited: "bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400",
};

function EvidenceBadge({ grade }: { grade: EvidenceGrade }) {
  return (
    <span
      className={`ml-1.5 inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${GRADE_STYLE[grade]}`}
      title={
        grade === "strong"
          ? "Meta-analysis, large RCT, or systematic review"
          : grade === "moderate"
            ? "A single RCT, cohort study, or expert position stand"
            : "Small, older, or narrative-review-level evidence"
      }
    >
      {GRADE_LABEL[grade]}
    </span>
  );
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
            {source.evidenceGrade ? <EvidenceBadge grade={source.evidenceGrade} /> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
