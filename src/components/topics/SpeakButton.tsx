"use client";

import { Volume2, Pause, Play, Square, SkipBack, SkipForward } from "lucide-react";
import { useReadAloud } from "@/lib/readAloud/ReadAloudContext";

const btnClass =
  "btn-pop no-print glass flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-cyan-400/50 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400";
const iconBtnClass =
  "btn-pop no-print glass flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:border-cyan-400/50 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-40";

export function SpeakButton() {
  const { playState, totalSentences, activeIndex, start, pause, resume, stop, rewind, forward } = useReadAloud();

  if (totalSentences === 0) return null;

  if (playState === "idle") {
    return (
      <button type="button" onClick={start} className={btnClass}>
        <Volume2 className="h-3.5 w-3.5" aria-hidden />
        Listen
      </button>
    );
  }

  return (
    <div className="no-print flex shrink-0 items-center gap-1.5">
      <button
        type="button"
        onClick={rewind}
        disabled={activeIndex <= 0}
        className={iconBtnClass}
        aria-label="Previous sentence"
      >
        <SkipBack className="h-3.5 w-3.5" aria-hidden />
      </button>
      <button type="button" onClick={playState === "speaking" ? pause : resume} className={btnClass}>
        {playState === "speaking" ? (
          <>
            <Pause className="h-3.5 w-3.5" aria-hidden />
            Pause
          </>
        ) : (
          <>
            <Play className="h-3.5 w-3.5" aria-hidden />
            Resume
          </>
        )}
      </button>
      <button
        type="button"
        onClick={forward}
        disabled={activeIndex >= totalSentences - 1}
        className={iconBtnClass}
        aria-label="Next sentence"
      >
        <SkipForward className="h-3.5 w-3.5" aria-hidden />
      </button>
      <button type="button" onClick={stop} className={iconBtnClass} aria-label="Stop reading">
        <Square className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  );
}
