"use client";

import { useMode } from "@/lib/mode/ModeContext";

export function ModeText({
  simple,
  scientific,
}: {
  simple: React.ReactNode;
  scientific: React.ReactNode;
}) {
  const { mode } = useMode();
  return <>{mode === "simple" ? simple : scientific}</>;
}
