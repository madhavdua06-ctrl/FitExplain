"use client";

import { useId } from "react";

export function RadialProgress({
  percent,
  label,
  sublabel,
  size = 120,
  colorVar = "--viz-series-1",
}: {
  percent: number;
  label: string;
  sublabel?: string;
  size?: number;
  colorVar?: "--viz-series-1" | "--viz-series-2";
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  const stroke = size * 0.09;
  const radius = size / 2 - stroke;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);
  const uid = useId().replace(/[:]/g, "");
  const glowId = `radial-glow-${uid}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <defs>
            <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--viz-grid)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`var(${colorVar})`}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            filter={`url(#${glowId})`}
            className="animate-radial-fill"
            style={{ ["--radial-circumference" as string]: circumference, ["--radial-offset" as string]: offset }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-slate-900 dark:text-white">{Math.round(clamped)}%</span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-semibold text-slate-900 dark:text-white">{label}</div>
        {sublabel ? <div className="text-xs text-slate-500 dark:text-slate-400">{sublabel}</div> : null}
      </div>
    </div>
  );
}
