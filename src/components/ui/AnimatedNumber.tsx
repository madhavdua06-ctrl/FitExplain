"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedNumber({
  value,
  suffix = "",
  durationMs = 900,
}: {
  value: number;
  suffix?: string;
  durationMs?: number;
}) {
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const effectiveDuration = prefersReducedMotion ? 0 : durationMs;

    let raf: number;
    const start = performance.now();
    function tick(now: number) {
      const progress = effectiveDuration <= 0 ? 1 : Math.min(1, (now - start) / effectiveDuration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, durationMs]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}
