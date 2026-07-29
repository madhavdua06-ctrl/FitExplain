"use client";

import { useState, useTransition } from "react";
import { CheckCircle2 } from "lucide-react";
import { logWorkoutCompletion } from "@/lib/workout/actions";
import { useToast } from "@/lib/toast/ToastContext";

export function MarkWorkoutCompleteButton({
  dayIndex,
  dayLabel,
  completedToday,
}: {
  dayIndex: number;
  dayLabel: string;
  completedToday: boolean;
}) {
  const [isDone, setIsDone] = useState(completedToday);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  if (isDone) {
    return (
      <span className="animate-pop-in mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
        Completed today
      </span>
    );
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await logWorkoutCompletion(dayIndex, dayLabel);
          setIsDone(true);
          showToast(`Day ${dayIndex} marked complete — nice work!`, "success");
        })
      }
      className="mt-2 text-xs font-medium text-slate-500 underline decoration-slate-300 underline-offset-2 transition hover:text-emerald-600 hover:decoration-emerald-600 dark:text-slate-400"
    >
      Mark day complete
    </button>
  );
}
