"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { CheckCircle2, PartyPopper, Info, X } from "lucide-react";

export type ToastVariant = "success" | "celebrate" | "info";

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const VARIANT_ICON: Record<ToastVariant, React.ComponentType<{ className?: string }>> = {
  success: CheckCircle2,
  celebrate: PartyPopper,
  info: Info,
};

const VARIANT_STYLE: Record<ToastVariant, string> = {
  success: "border-emerald-400/50 text-emerald-700 dark:text-emerald-400",
  celebrate: "border-violet-400/50 text-violet-700 dark:text-violet-400",
  info: "border-cyan-400/50 text-cyan-700 dark:text-cyan-400",
};

function Confetti() {
  const pieces = Array.from({ length: 14 }, (_, i) => i);
  const colors = ["#22d3ee", "#a78bfa", "#f472b6", "#34d399", "#fbbf24"];
  return (
    <span className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
      {pieces.map((i) => (
        <span
          key={i}
          className="animate-confetti-piece absolute top-1/2 left-1/2 h-1.5 w-1.5 rounded-sm"
          style={{
            backgroundColor: colors[i % colors.length],
            animationDelay: `${i * 0.03}s`,
            transform: `rotate(${i * 26}deg)`,
          }}
        />
      ))}
    </span>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const showToast = useCallback((message: string, variant: ToastVariant = "success") => {
    const id = idRef.current++;
    setToasts((current) => [...current, { id, message, variant }]);
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  function dismiss(id: number) {
    setToasts((current) => current.filter((t) => t.id !== id));
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 sm:items-end sm:right-4 sm:left-auto">
        {toasts.map((t) => {
          const Icon = VARIANT_ICON[t.variant];
          return (
            <div
              key={t.id}
              className={`animate-toast-in glass pointer-events-auto relative flex items-center gap-2 overflow-visible rounded-xl border px-4 py-3 text-sm font-medium shadow-lg ${VARIANT_STYLE[t.variant]}`}
            >
              {t.variant === "celebrate" ? <Confetti /> : null}
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              <span className="text-slate-700 dark:text-slate-200">{t.message}</span>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                className="ml-1 shrink-0 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
