import {
  TrendingUp,
  Beef,
  Scale,
  HeartPulse,
  Moon,
  Droplet,
  Pill,
  PieChart,
  Flame,
  CalendarCheck,
  ShieldCheck,
  Dumbbell,
  Footprints,
} from "lucide-react";

const MOTIF_COLOR: Record<string, string> = {
  "progressive-overload": "text-emerald-500 dark:text-emerald-400",
  "muscle-protein-synthesis": "text-orange-500 dark:text-orange-400",
  "caloric-deficit": "text-amber-500 dark:text-amber-400",
  "vo2-max": "text-rose-500 dark:text-rose-400",
  "recovery-sleep": "text-indigo-500 dark:text-indigo-400",
  hydration: "text-sky-500 dark:text-sky-400",
  "supplements-that-work": "text-fuchsia-500 dark:text-fuchsia-400",
  "macronutrients-101": "text-orange-400 dark:text-orange-300",
  "doms-muscle-soreness": "text-red-500 dark:text-red-400",
  "habit-formation": "text-violet-500 dark:text-violet-400",
  "injury-prevention": "text-teal-500 dark:text-teal-400",
  "resistance-vs-cardio": "text-cyan-500 dark:text-cyan-400",
};

function Rings({ delayed = false }: { delayed?: boolean }) {
  return (
    <>
      <span
        className="motif-ring absolute inset-0 rounded-full border-2 border-current"
        style={delayed ? { animationDelay: "1.2s" } : undefined}
        aria-hidden
      />
      <span
        className="motif-ring absolute inset-0 rounded-full border-2 border-current"
        style={{ animationDelay: delayed ? "0s" : "1.2s" }}
        aria-hidden
      />
    </>
  );
}

function motifFor(slug: string, iconSize: number) {
  switch (slug) {
    case "progressive-overload":
      return (
        <>
          <span className="absolute inset-x-0 bottom-1 flex items-end justify-center gap-[3px]" aria-hidden>
            <span className="motif-bar h-2 w-1 rounded-sm bg-current opacity-30" style={{ animationDelay: "0s" }} />
            <span className="motif-bar h-3 w-1 rounded-sm bg-current opacity-30" style={{ animationDelay: "0.2s" }} />
            <span className="motif-bar h-4 w-1 rounded-sm bg-current opacity-30" style={{ animationDelay: "0.4s" }} />
          </span>
          <TrendingUp size={iconSize} className="relative" strokeWidth={2} />
        </>
      );

    case "muscle-protein-synthesis":
      return (
        <>
          <Rings />
          <Beef size={iconSize} className="relative" strokeWidth={2} />
        </>
      );

    case "caloric-deficit":
      return (
        <span className="motif-tilt inline-flex">
          <Scale size={iconSize} strokeWidth={2} />
        </span>
      );

    case "vo2-max":
      return (
        <span className="relative inline-flex overflow-hidden rounded-full">
          <HeartPulse size={iconSize} strokeWidth={2} />
          <span
            className="motif-sweep absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-current/40 to-transparent"
            aria-hidden
          />
        </span>
      );

    case "recovery-sleep":
      return (
        <>
          <span className="motif-twinkle absolute top-0 right-1 h-1 w-1 rounded-full bg-current" style={{ animationDelay: "0s" }} aria-hidden />
          <span className="motif-twinkle absolute bottom-1 right-0 h-[3px] w-[3px] rounded-full bg-current" style={{ animationDelay: "0.6s" }} aria-hidden />
          <span className="motif-twinkle absolute top-2 left-0 h-1 w-1 rounded-full bg-current" style={{ animationDelay: "1.1s" }} aria-hidden />
          <Moon size={iconSize} className="relative" strokeWidth={2} />
        </>
      );

    case "hydration":
      return (
        <>
          <Rings />
          <Droplet size={iconSize} className="relative" strokeWidth={2} />
        </>
      );

    case "supplements-that-work":
      return (
        <span className="relative inline-flex overflow-hidden rounded-full">
          <Pill size={iconSize} strokeWidth={2} />
          <span
            className="motif-sweep absolute inset-y-0 left-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-current/50 to-transparent"
            aria-hidden
          />
        </span>
      );

    case "macronutrients-101":
      return (
        <>
          <span className="absolute inset-x-0 -bottom-1 flex items-center justify-center gap-1" aria-hidden>
            <span className="motif-fill h-1 w-1 rounded-full bg-current" style={{ animationDelay: "0s" }} />
            <span className="motif-fill h-1 w-1 rounded-full bg-current" style={{ animationDelay: "0.5s" }} />
            <span className="motif-fill h-1 w-1 rounded-full bg-current" style={{ animationDelay: "1s" }} />
          </span>
          <PieChart size={iconSize} className="relative" strokeWidth={2} />
        </>
      );

    case "doms-muscle-soreness":
      return (
        <>
          <Rings delayed />
          <Flame size={iconSize} className="relative" strokeWidth={2} />
        </>
      );

    case "habit-formation":
      return (
        <>
          <span className="absolute inset-x-0 -bottom-1 flex items-center justify-center gap-1" aria-hidden>
            <span className="motif-fill h-1 w-1 rounded-sm bg-current" style={{ animationDelay: "0s" }} />
            <span className="motif-fill h-1 w-1 rounded-sm bg-current" style={{ animationDelay: "0.3s" }} />
            <span className="motif-fill h-1 w-1 rounded-sm bg-current" style={{ animationDelay: "0.6s" }} />
            <span className="motif-fill h-1 w-1 rounded-sm bg-current" style={{ animationDelay: "0.9s" }} />
          </span>
          <CalendarCheck size={iconSize} className="relative" strokeWidth={2} />
        </>
      );

    case "injury-prevention":
      return (
        <>
          <Rings />
          <ShieldCheck size={iconSize} className="relative" strokeWidth={2} />
        </>
      );

    case "resistance-vs-cardio":
      return (
        <>
          <Dumbbell size={iconSize} className="motif-crossfade-a absolute" strokeWidth={2} />
          <Footprints size={iconSize} className="motif-crossfade-b absolute" strokeWidth={2} />
        </>
      );

    default:
      return <TrendingUp size={iconSize} strokeWidth={2} />;
  }
}

export function TopicMotif({ slug, size = "lg" }: { slug: string; size?: "sm" | "lg" }) {
  const boxDim = size === "lg" ? "h-16 w-16" : "h-10 w-10";
  const iconSize = size === "lg" ? 30 : 20;
  const color = MOTIF_COLOR[slug] ?? "text-cyan-500 dark:text-cyan-400";

  return (
    <span
      className={`relative flex ${boxDim} shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-current/10 ${color}`}
      aria-hidden
    >
      {motifFor(slug, iconSize)}
    </span>
  );
}
