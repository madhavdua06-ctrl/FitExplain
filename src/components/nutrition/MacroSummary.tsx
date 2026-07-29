import { Flame, Beef } from "lucide-react";
import { RadialProgress } from "@/components/charts/RadialProgress";
import { StatTile, StatRow } from "@/components/charts/StatTile";

export function MacroSummary({
  calories,
  calorieTarget,
  proteinG,
  proteinTargetMin,
  proteinTargetMax,
  carbsG,
  fatG,
}: {
  calories: number;
  calorieTarget: number;
  proteinG: number;
  proteinTargetMin: number;
  proteinTargetMax: number;
  carbsG: number;
  fatG: number;
}) {
  const caloriePct = calorieTarget > 0 ? (calories / calorieTarget) * 100 : 0;
  const proteinPct = proteinTargetMax > 0 ? (proteinG / proteinTargetMax) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-around gap-6">
        <RadialProgress
          percent={caloriePct}
          label="Calories today"
          sublabel={`${Math.round(calories)} / ${Math.round(calorieTarget)} kcal`}
          colorVar="--viz-series-1"
          icon={<Flame className="h-4 w-4" />}
        />
        <RadialProgress
          percent={proteinPct}
          label="Protein today"
          sublabel={`${Math.round(proteinG)} / ${Math.round(proteinTargetMin)}–${Math.round(proteinTargetMax)}g`}
          colorVar="--viz-series-2"
          icon={<Beef className="h-4 w-4" />}
        />
      </div>
      <StatRow>
        <StatTile label="Carbs" value={`${Math.round(carbsG)}g`} />
        <StatTile label="Fat" value={`${Math.round(fatG)}g`} />
      </StatRow>
    </div>
  );
}
