"use client";

import { useId, useState } from "react";
import { niceTicks } from "./chartMath";

interface Point {
  x: string;
  y: number;
  note?: string;
}

export interface LineSeries {
  label: string;
  data: Point[];
  colorVar: "--viz-series-1" | "--viz-series-2" | "--viz-text-muted";
  area?: boolean;
}

const WIDTH = 640;
const HEIGHT = 300;
const PAD = { top: 16, right: 40, bottom: 30, left: 44 };
const PLOT_W = WIDTH - PAD.left - PAD.right;
const PLOT_H = HEIGHT - PAD.top - PAD.bottom;

export function LineChart({
  series,
  yUnit = "",
  yFormat = (v: number) => String(v),
  zeroBaseline = true,
}: {
  series: LineSeries[];
  yUnit?: string;
  yFormat?: (v: number) => string;
  /** Force the y-axis to include 0. Appropriate for magnitudes/percentages;
   * set false for values like body weight where zooming into the actual
   * range (not misleading for a line, unlike a bar) shows the trend clearly. */
  zeroBaseline?: boolean;
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const uid = useId().replace(/[:]/g, "");
  const glowId = `line-glow-${uid}`;

  const points = series[0].data;
  const n = points.length;
  const allY = series.flatMap((s) => s.data.map((p) => p.y));
  const yMin = zeroBaseline ? Math.min(0, ...allY) : Math.min(...allY);
  const yMax = Math.max(...allY);
  const ticks = niceTicks(yMin, yMax, 4);
  const domainMin = Math.min(yMin, ticks[0]);
  const domainMax = Math.max(yMax, ticks[ticks.length - 1]);

  const xAt = (i: number) => PAD.left + (n === 1 ? PLOT_W / 2 : (i / (n - 1)) * PLOT_W);
  const yAt = (v: number) =>
    PAD.top + PLOT_H - ((v - domainMin) / (domainMax - domainMin || 1)) * PLOT_H;

  const pathFor = (data: Point[]) =>
    data.map((p, i) => `${i === 0 ? "M" : "L"} ${xAt(i)} ${yAt(p.y)}`).join(" ");

  const areaFor = (data: Point[]) => {
    const line = pathFor(data);
    return `${line} L ${xAt(data.length - 1)} ${yAt(domainMin)} L ${xAt(0)} ${yAt(domainMin)} Z`;
  };

  const gradIdFor = (colorVar: string) => `line-area-${colorVar.replace(/[^a-zA-Z0-9]/g, "")}-${uid}`;
  const uniqueColorVars = [...new Set(series.map((s) => s.colorVar))];

  function handleMove(e: React.MouseEvent<SVGRectElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * WIDTH;
    const idx = Math.round(((relX - PAD.left) / PLOT_W) * (n - 1));
    setHoverIdx(Math.min(n - 1, Math.max(0, idx)));
  }

  const labelStep = n <= 7 ? 1 : Math.ceil(n / 6);
  const showEndLabel = series.length === 1;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label="Line chart">
        <defs>
          {uniqueColorVars.map((cv) => (
            <linearGradient key={cv} id={gradIdFor(cv)} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={`var(${cv})`} stopOpacity={0.35} />
              <stop offset="100%" stopColor={`var(${cv})`} stopOpacity={0} />
            </linearGradient>
          ))}
          <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={PAD.left}
              x2={WIDTH - PAD.right}
              y1={yAt(t)}
              y2={yAt(t)}
              stroke="var(--viz-grid)"
              strokeWidth={1}
            />
            <text
              x={PAD.left - 8}
              y={yAt(t)}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={11}
              fill="var(--viz-text-muted)"
            >
              {yFormat(t)}
            </text>
          </g>
        ))}
        <line
          x1={PAD.left}
          x2={WIDTH - PAD.right}
          y1={HEIGHT - PAD.bottom}
          y2={HEIGHT - PAD.bottom}
          stroke="var(--viz-baseline)"
          strokeWidth={1}
        />
        {points.map((p, i) =>
          i % labelStep === 0 ? (
            <text
              key={i}
              x={xAt(i)}
              y={HEIGHT - PAD.bottom + 18}
              textAnchor="middle"
              fontSize={11}
              fill="var(--viz-text-muted)"
            >
              {p.x}
            </text>
          ) : null,
        )}
        {series.map(
          (s) =>
            s.area && (
              <path
                key={`${s.label}-area`}
                d={areaFor(s.data)}
                fill={`url(#${gradIdFor(s.colorVar)})`}
                className="animate-area-fade-in"
              />
            ),
        )}
        {series.map((s, si) => (
          <path
            key={s.label}
            d={pathFor(s.data)}
            fill="none"
            stroke={`var(${s.colorVar})`}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${glowId})`}
            pathLength={1}
            strokeDasharray={1}
            className="animate-line-draw"
            style={{ animationDelay: `${si * 150}ms` }}
          />
        ))}
        {series.map((s) => (
          <g key={`${s.label}-markers`}>
            {s.data.map((p, i) =>
              i > 0 && i < s.data.length - 1 ? (
                <circle
                  key={i}
                  cx={xAt(i)}
                  cy={yAt(p.y)}
                  r={3.5}
                  fill="var(--viz-surface)"
                  stroke={`var(${s.colorVar})`}
                  strokeWidth={2}
                  className="animate-marker-pop"
                  style={{ animationDelay: `${1.1 + i * 0.05}s` }}
                />
              ) : null,
            )}
          </g>
        ))}
        {series.map((s) => {
          const last = s.data[s.data.length - 1];
          return (
            <g key={`${s.label}-end`}>
              <circle
                cx={xAt(s.data.length - 1)}
                cy={yAt(last.y)}
                r={5}
                fill={`var(${s.colorVar})`}
                stroke="var(--viz-surface)"
                strokeWidth={2}
              />
              {showEndLabel ? (
                <text
                  x={xAt(s.data.length - 1) + 10}
                  y={yAt(last.y)}
                  dominantBaseline="middle"
                  fontSize={12}
                  fontWeight={600}
                  fill="var(--viz-text-primary)"
                >
                  {yFormat(last.y)}
                  {yUnit}
                </text>
              ) : null}
            </g>
          );
        })}
        {hoverIdx !== null ? (
          <line
            x1={xAt(hoverIdx)}
            x2={xAt(hoverIdx)}
            y1={PAD.top}
            y2={HEIGHT - PAD.bottom}
            stroke="var(--viz-baseline)"
            strokeWidth={1}
          />
        ) : null}
        {hoverIdx !== null
          ? series.map((s) => (
              <circle
                key={`${s.label}-hover`}
                cx={xAt(hoverIdx)}
                cy={yAt(s.data[hoverIdx].y)}
                r={5}
                fill={`var(${s.colorVar})`}
                stroke="var(--viz-surface)"
                strokeWidth={2}
              />
            ))
          : null}
        <rect
          x={PAD.left}
          y={PAD.top}
          width={PLOT_W}
          height={PLOT_H}
          fill="transparent"
          onMouseMove={handleMove}
          onMouseLeave={() => setHoverIdx(null)}
        />
      </svg>
      {hoverIdx !== null ? (
        <div
          className={`animate-pop-in pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-slate-700 dark:bg-slate-900 ${
            points[hoverIdx].note ? "w-56" : "whitespace-nowrap"
          }`}
          style={{
            left: `${(xAt(hoverIdx) / WIDTH) * 100}%`,
            top: `${(Math.min(...series.map((s) => yAt(s.data[hoverIdx!].y))) / HEIGHT) * 100}%`,
          }}
        >
          <div className="font-medium text-slate-900 dark:text-white">{points[hoverIdx].x}</div>
          {series.map((s) => (
            <div key={s.label} className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: `var(${s.colorVar})` }}
              />
              {s.label}: {yFormat(s.data[hoverIdx].y)}
              {yUnit}
            </div>
          ))}
          {points[hoverIdx].note ? (
            <p className="mt-1 leading-snug text-slate-500 dark:text-slate-400">{points[hoverIdx].note}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
