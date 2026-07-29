"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useMode } from "@/lib/mode/ModeContext";

export interface ReadAloudSentence {
  text: string;
  index: number;
}

type PlayState = "idle" | "speaking" | "paused";

interface ReadAloudContextValue {
  paragraphSentences: ReadAloudSentence[][];
  totalSentences: number;
  playState: PlayState;
  activeIndex: number;
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  rewind: () => void;
  forward: () => void;
}

const ReadAloudContext = createContext<ReadAloudContextValue | null>(null);

function splitSentences(text: string): string[] {
  const matches = text.match(/[^.!?]+[.!?]+(?=\s|$)\s*/g);
  return (matches ?? [text]).map((s) => s.trim()).filter(Boolean);
}

function buildParagraphSentences(text: string): ReadAloudSentence[][] {
  const paragraphs = text.split(/\n\n+/);
  let globalIndex = 0;
  return paragraphs.map((paragraph) =>
    splitSentences(paragraph).map((s) => {
      const item = { text: s, index: globalIndex };
      globalIndex += 1;
      return item;
    }),
  );
}

export function ReadAloudProvider({
  simpleText,
  scientificText,
  children,
}: {
  simpleText: string;
  scientificText: string;
  children: React.ReactNode;
}) {
  const { mode } = useMode();
  const text = mode === "simple" ? simpleText : scientificText;

  const paragraphSentences = useMemo(() => buildParagraphSentences(text), [text]);
  const flatSentences = useMemo(() => paragraphSentences.flat(), [paragraphSentences]);

  const [playState, setPlayState] = useState<PlayState>("idle");
  const [activeIndex, setActiveIndex] = useState(-1);
  const activeIndexRef = useRef(-1);
  const flatSentencesRef = useRef(flatSentences);
  flatSentencesRef.current = flatSentences;
  // Bumped on every speakFrom()/stop() call so a stale onend/onerror from an
  // utterance that's since been superseded (rewind/forward/start called
  // again before the browser's cancel-triggered error event fires) can't
  // clobber state that a newer call already set.
  const generationRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Cancel playback when the Simple/Scientific mode changes — the cancelled
  // utterance's onerror handler (below) resets playState/activeIndex, so we
  // don't setState directly inside this effect.
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, [mode]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function speakFrom(idx: number) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const sentences = flatSentencesRef.current;
    const myGeneration = ++generationRef.current;
    if (idx < 0 || idx >= sentences.length) {
      setPlayState("idle");
      setActiveIndex(-1);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(sentences[idx].text);
    utterance.rate = 0.98;
    utterance.onend = () => {
      if (generationRef.current !== myGeneration) return;
      const next = idx + 1;
      if (next < flatSentencesRef.current.length) {
        speakFrom(next);
      } else {
        setPlayState("idle");
        setActiveIndex(-1);
      }
    };
    utterance.onerror = () => {
      if (generationRef.current !== myGeneration) return;
      setPlayState("idle");
      setActiveIndex(-1);
    };
    window.speechSynthesis.speak(utterance);
    setActiveIndex(idx);
    setPlayState("speaking");
  }

  function start() {
    speakFrom(0);
  }

  function rewind() {
    speakFrom(Math.max(0, activeIndexRef.current - 1));
  }

  function forward() {
    speakFrom(Math.min(flatSentencesRef.current.length - 1, activeIndexRef.current + 1));
  }

  function pause() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.pause();
    setPlayState("paused");
  }

  function resume() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.resume();
    setPlayState("speaking");
  }

  function stop() {
    generationRef.current++;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setPlayState("idle");
    setActiveIndex(-1);
  }

  return (
    <ReadAloudContext.Provider
      value={{
        paragraphSentences,
        totalSentences: flatSentences.length,
        playState,
        activeIndex,
        start,
        pause,
        resume,
        stop,
        rewind,
        forward,
      }}
    >
      {children}
    </ReadAloudContext.Provider>
  );
}

export function useReadAloud() {
  const ctx = useContext(ReadAloudContext);
  if (!ctx) throw new Error("useReadAloud must be used within a ReadAloudProvider");
  return ctx;
}
