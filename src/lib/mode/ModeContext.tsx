"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { setModeAction } from "./actions";

export type Mode = "simple" | "scientific";

interface ModeContextValue {
  mode: Mode;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextValue | null>(null);

export function ModeProvider({
  initialMode,
  children,
}: {
  initialMode: Mode;
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);

  const toggleMode = useCallback(() => {
    const next: Mode = mode === "simple" ? "scientific" : "simple";
    setMode(next);
    void setModeAction(next);
  }, [mode]);

  return <ModeContext.Provider value={{ mode, toggleMode }}>{children}</ModeContext.Provider>;
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within a ModeProvider");
  return ctx;
}
