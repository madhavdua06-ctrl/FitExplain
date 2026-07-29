export function NumberField({
  label,
  value,
  onChange,
  unit,
  min,
  max,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit?: string;
  min?: number;
  max?: number;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <div className="relative mt-1">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-cyan-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
        {unit ? (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-slate-400">
            {unit}
          </span>
        ) : null}
      </div>
    </label>
  );
}
