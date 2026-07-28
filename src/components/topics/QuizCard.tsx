"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";
import { submitQuiz } from "@/lib/topics/actions";
import type { QuizQuestion } from "@/lib/topics/types";

export function QuizCard({
  slug,
  questions,
  isLoggedIn,
}: {
  slug: string;
  questions: QuizQuestion[];
  isLoggedIn: boolean;
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (!questions.length) return null;

  const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0), 0);
  const allAnswered = answers.every((a) => a !== null);

  function selectAnswer(qIndex: number, optionIndex: number) {
    if (submitted) return;
    setAnswers((current) => {
      const next = [...current];
      next[qIndex] = optionIndex;
      return next;
    });
  }

  function handleSubmit() {
    setSubmitted(true);
    if (isLoggedIn) {
      startTransition(async () => {
        await submitQuiz(slug, score);
      });
    }
  }

  return (
    <div className="space-y-4">
      {questions.map((q, qIndex) => (
        <div
          key={q.question}
          className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
        >
          <p className="font-medium text-slate-900 dark:text-white">
            {qIndex + 1}. {q.question}
          </p>
          <div className="mt-3 space-y-2">
            {q.options.map((option, optIndex) => {
              const isSelected = answers[qIndex] === optIndex;
              const isCorrect = optIndex === q.correctIndex;
              return (
                <button
                  key={option}
                  type="button"
                  disabled={submitted}
                  onClick={() => selectAnswer(qIndex, optIndex)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-left text-sm transition ${
                    submitted
                      ? isCorrect
                        ? "border-emerald-500 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/30"
                        : isSelected
                          ? "border-red-400 bg-red-50 dark:border-red-800 dark:bg-red-950/30"
                          : "border-slate-200 dark:border-slate-700"
                      : isSelected
                        ? "border-indigo-500 bg-indigo-50 dark:border-indigo-700 dark:bg-indigo-950/30"
                        : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
                  }`}
                >
                  <span className="text-slate-700 dark:text-slate-200">{option}</span>
                  {submitted && isCorrect ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                  ) : null}
                  {submitted && isSelected && !isCorrect ? (
                    <XCircle className="h-4 w-4 shrink-0 text-red-500" aria-hidden />
                  ) : null}
                </button>
              );
            })}
          </div>
          {submitted ? (
            <p className="animate-fade-in-up mt-3 text-xs text-slate-500 dark:text-slate-400">
              {q.explanation}
            </p>
          ) : null}
        </div>
      ))}

      {!submitted ? (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:opacity-50"
        >
          {allAnswered ? "Check my answers" : `Answer all ${questions.length} questions to continue`}
        </button>
      ) : (
        <div className="animate-pop-in flex items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900 dark:bg-indigo-950/30">
          <Trophy className="h-6 w-6 shrink-0 text-indigo-600" aria-hidden />
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              You scored {score}/{questions.length}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isLoggedIn
                ? isPending
                  ? "Saving to your journey…"
                  : "Topic marked as complete on your journey."
                : "Log in to save your progress."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
