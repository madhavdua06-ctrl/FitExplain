"use client";

import { useEffect, useState } from "react";
import { Volume2, Square } from "lucide-react";
import { useMode } from "@/lib/mode/ModeContext";

export function SpeakButton({
  simpleText,
  scientificText,
}: {
  simpleText: string;
  scientificText: string;
}) {
  const { mode } = useMode();
  const [speaking, setSpeaking] = useState(false);
  const [supported] = useState(() => typeof window !== "undefined" && "speechSynthesis" in window);

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

  if (!supported) return null;

  function toggle() {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const text = mode === "simple" ? simpleText : scientificText;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.98;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="btn-pop no-print glass flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-cyan-400/50 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
    >
      {speaking ? (
        <>
          <Square className="h-3.5 w-3.5" aria-hidden />
          Stop
        </>
      ) : (
        <>
          <Volume2 className="h-3.5 w-3.5" aria-hidden />
          Listen
        </>
      )}
    </button>
  );
}
