"use client";

import { useId, useState } from "react";
import { niceTicks } from "./chartMath";

export interface BarDatum {
  label: string;
  value: number;
  muted?: boolean;
}

const WIDTH = 640;
const HEIGHT = 300;
const PAD = { top: 24, right: 16, bottom: 30, left: 44 };
const PLOT_W = WIDTH - PAD.left - PAD.right;
const PLOT_H = HEIGHT - PAD.top - PAD.bottom;
const MAX_BAR_W = 56;
const RADIUS = 4;

export function BarChart({
  data,
  yUnit = "",
  yFormat = (v: number) => String(v),
}: {
  data: BarDatum[];
  yUnit?: string;
  yFormat?: (v: number) => string;
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const uid = useId().replace(/[:]/g, "");
  const gradId = `bar-grad-${uid}`;
  const gradMutedId = `bar-grad-muted-${uid}`;
  const glowId = `bar-glow-${uid}`;

  const n = data.length;
  const values = data.map((d) => d.value);
  const ticks = niceTicks(0, Math.max(...values), 4);
  const domainMax = ticks[ticks.length - 1];

  const slot = PLOT_W / n;
  const barW = Math.min(MAX_BAR_W, slot * 0.55);

  const yAt = (v: number) => PAD.top + PLOT_H - (v / domainMax) * PLOT_H;
  const xCenter = (i: number) => PAD.left + slot * i + slot / 2;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label="Bar chart">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--viz-series-1)" stopOpacity={1} />
            <stop offset="100%" stopColor="var(--viz-series-1)" stopOpacity={0.55} />
          </linearGradient>
          <linearGradient id={gradMutedId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--viz-text-muted)" stopOpacity={0.85} />
            <stop offset="100%" stopColor="var(--viz-text-muted)" stopOpacity={0.4} />
          </linearGradient>
          <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
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
        {data.map((d, i) => {
          const cx = xCenter(i);
          const x = cx - barW / 2;
          const topY = yAt(d.value);
          const h = HEIGHT - PAD.bottom - topY;
          const fill = d.muted ? `url(#${gradMutedId})` : `url(#${gradId})`;
          const solidColor = d.muted ? "var(--viz-text-muted)" : "var(--viz-series-1)";
          const isHover = hoverIdx === i;
          return (
            <g
              key={d.label}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
              style={{ cursor: "pointer" }}
            >
              <g
                className="animate-bar-grow"
                style={{ animationDelay: `${i * 90}ms` }}
                filter={isHover ? `url(#${glowId})` : undefined}
              >
                <rect x={x} y={topY} width={barW} height={h} rx={RADIUS} fill={fill} opacity={isHover ? 0.95 : 1} />
                {h > RADIUS ? (
                  <rect
                    x={x}
                    y={HEIGHT - PAD.bottom - RADIUS}
                    width={barW}
                    height={RADIUS}
                    fill={fill}
                    opacity={isHover ? 0.95 : 1}
                  />
                ) : null}
                <rect x={x} y={topY} width={barW} height={Math.min(3, h)} rx={1.5} fill="white" opacity={0.35} />
              </g>
              <text
                x={cx}
                y={topY - 8}
                textAnchor="middle"
                fontSize={12}
                fontWeight={600}
                fill="var(--viz-text-primary)"
              >
                {yFormat(d.value)}
                {yUnit}
              </text>
              <text
                x={cx}
                y={HEIGHT - PAD.bottom + 18}
                textAnchor="middle"
                fontSize={11}
                fill="var(--viz-text-muted)"
              >
                {d.label}
              </text>
              {isHover ? (
                <circle cx={cx} cy={HEIGHT - PAD.bottom + 4} r={3} fill={solidColor} />
              ) : null}
              <rect
                x={PAD.left + slot * i}
                y={PAD.top}
                width={slot}
                height={PLOT_H}
                fill="transparent"
              />
            </g>
          );
        })}
      </svg>
      {hoverIdx !== null ? (
        <div
          className="pointer-events-none absolute z-10 flex -translate-x-1/2 -translate-y-[calc(100%+28px)] items-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-900 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          style={{
            left: `${(xCenter(hoverIdx) / WIDTH) * 100}%`,
            top: `${(yAt(data[hoverIdx].value) / HEIGHT) * 100}%`,
          }}
        >
          <span
            className="inline-block h-2 w-2 shrink-0 rounded-full"
            style={{
              backgroundColor: data[hoverIdx].muted ? "var(--viz-text-muted)" : "var(--viz-series-1)",
            }}
          />
          {data[hoverIdx].label}: {yFormat(data[hoverIdx].value)}
          {yUnit}
        </div>
      ) : null}
    </div>
  );
}
