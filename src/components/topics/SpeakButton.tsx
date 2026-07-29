"use client";

import { useEffect, useState } from "react";
import { Volume2, Pause, Play, Square } from "lucide-react";
import { useMode } from "@/lib/mode/ModeContext";

type SpeechState = "idle" | "speaking" | "paused";

const btnClass =
  "btn-pop no-print glass flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-cyan-400/50 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400";

export function SpeakButton({
  simpleText,
  scientificText,
}: {
  simpleText: string;
  scientificText: string;
}) {
  const { mode } = useMode();
  const [state, setState] = useState<SpeechState>("idle");

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, [mode]);

  function start() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const text = mode === "simple" ? simpleText : scientificText;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.98;
    utterance.onend = () => setState("idle");
    utterance.onerror = () => setState("idle");
    window.speechSynthesis.speak(utterance);
    setState("speaking");
  }

  function pause() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.pause();
    setState("paused");
  }

  function resume() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.resume();
    setState("speaking");
  }

  function stop() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setState("idle");
  }

  if (state === "idle") {
    return (
      <button type="button" onClick={start} className={btnClass}>
        <Volume2 className="h-3.5 w-3.5" aria-hidden />
        Listen
      </button>
    );
  }

  return (
    <div className="no-print flex shrink-0 items-center gap-1.5">
      <button type="button" onClick={state === "speaking" ? pause : resume} className={btnClass}>
        {state === "speaking" ? (
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
      <button type="button" onClick={stop} className={btnClass} aria-label="Stop reading">
        <Square className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  );
}
