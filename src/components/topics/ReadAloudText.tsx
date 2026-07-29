"use client";

import { useReadAloud } from "@/lib/readAloud/ReadAloudContext";

export function ReadAloudText() {
  const { paragraphSentences, activeIndex, playState } = useReadAloud();

  return (
    <div className="space-y-4">
      {paragraphSentences.map((sentences, pi) => (
        <p key={pi}>
          {sentences.map((s) => (
            <span
              key={s.index}
              className={
                playState !== "idle" && s.index === activeIndex
                  ? "animate-pop-in rounded bg-cyan-200/70 px-0.5 text-slate-900 dark:bg-cyan-500/30 dark:text-white"
                  : undefined
              }
            >
              {s.text}{" "}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
