export function ChartShell({
  title,
  subtitle,
  children,
  legend,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  legend?: React.ReactNode;
}) {
  return (
    <figure className="viz-root rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-[color:var(--viz-surface)]">
      <figcaption className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
        {subtitle ? (
          <p className="mt-0.5 text-xs text-slate-500 dark:text-[color:var(--viz-text-secondary)]">
            {subtitle}
          </p>
        ) : null}
      </figcaption>
      {children}
      {legend ? <div className="mt-3 flex flex-wrap gap-4">{legend}</div> : null}
    </figure>
  );
}

export function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-[color:var(--viz-text-secondary)]">
      <span
        className="inline-block h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden
      />
      {label}
    </span>
  );
}
