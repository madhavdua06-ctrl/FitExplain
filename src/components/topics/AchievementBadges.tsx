export interface BadgeDef {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  achieved: boolean;
}

export function AchievementBadges({ badges }: { badges: BadgeDef[] }) {
  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Achievements</h3>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {badges.map((badge, i) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.label}
              className={`animate-pop-in flex flex-col items-center gap-1.5 rounded-xl p-3 text-center transition hover:-translate-y-0.5 ${
                badge.achieved ? "glow-violet" : "opacity-40 grayscale"
              }`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  badge.achieved
                    ? "animate-pulse-glow bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white"
                    : "bg-slate-200 text-slate-400 dark:bg-white/10"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{badge.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
