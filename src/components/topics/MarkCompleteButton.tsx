"use client";

import { useState, useTransition } from "react";
import { CheckCircle2 } from "lucide-react";
import { markTopicComplete } from "@/lib/topics/actions";
import { useToast } from "@/lib/toast/ToastContext";

export function MarkCompleteButton({ slug, completed }: { slug: string; completed: boolean }) {
  const [isDone, setIsDone] = useState(completed);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  if (isDone) {
    return (
      <span className="animate-pop-in inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
        <CheckCircle2 className="h-4 w-4" aria-hidden />
        Completed
      </span>
    );
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await markTopicComplete(slug);
          setIsDone(true);
          showToast("Topic marked as complete — nice work!", "success");
        })
      }
      className="text-sm font-medium text-slate-500 underline decoration-slate-300 underline-offset-2 transition hover:text-emerald-600 hover:decoration-emerald-600 dark:text-slate-400"
    >
      Mark as read without the quiz
    </button>
  );
}
