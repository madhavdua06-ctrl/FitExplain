import { pickExercises } from "./exercisePools";
import type { DaySchedule, Goal, OnboardingInput, PlanResult, SplitType } from "./types";

const MAX_TRAINING_DAYS = 6;

function resolveSplitType(input: OnboardingInput): SplitType {
  if (input.frequency <= 3) return "FULL_BODY";
  if (input.frequency <= 5) {
    return input.experience === "ADVANCED" ? "PUSH_PULL_LEGS" : "UPPER_LOWER";
  }
  return "PUSH_PULL_LEGS";
}

function buildWeeklySchedule(input: OnboardingInput, splitType: SplitType): DaySchedule[] {
  const { equipment, limitations } = input;
  const trainingDays = Math.min(input.frequency, MAX_TRAINING_DAYS);

  if (splitType === "FULL_BODY") {
    const fullBodyDay: Omit<DaySchedule, "day"> = {
      focus: "Full Body",
      exercises: [
        ...pickExercises(equipment, "push", 1, limitations),
        ...pickExercises(equipment, "pull", 1, limitations),
        ...pickExercises(equipment, "legs", 1, limitations),
        ...pickExercises(equipment, "core", 1, limitations),
      ],
    };
    return Array.from({ length: trainingDays }, (_, i) => ({ day: i + 1, ...fullBodyDay }));
  }

  if (splitType === "UPPER_LOWER") {
    const upperDay: Omit<DaySchedule, "day"> = {
      focus: "Upper Body",
      exercises: [
        ...pickExercises(equipment, "push", 2, limitations),
        ...pickExercises(equipment, "pull", 2, limitations),
      ],
    };
    const lowerDay: Omit<DaySchedule, "day"> = {
      focus: "Lower Body",
      exercises: [
        ...pickExercises(equipment, "legs", 3, limitations),
        ...pickExercises(equipment, "core", 1, limitations),
      ],
    };
    return Array.from({ length: trainingDays }, (_, i) => ({
      day: i + 1,
      ...(i % 2 === 0 ? upperDay : lowerDay),
    }));
  }

  // PUSH_PULL_LEGS
  const pushDay: Omit<DaySchedule, "day"> = {
    focus: "Push",
    exercises: [...pickExercises(equipment, "push", 3, limitations), ...pickExercises(equipment, "core", 1, limitations)],
  };
  const pullDay: Omit<DaySchedule, "day"> = {
    focus: "Pull",
    exercises: [...pickExercises(equipment, "pull", 3, limitations), ...pickExercises(equipment, "core", 1, limitations)],
  };
  const legsDay: Omit<DaySchedule, "day"> = {
    focus: "Legs",
    exercises: [...pickExercises(equipment, "legs", 3, limitations), ...pickExercises(equipment, "core", 1, limitations)],
  };
  const cycle = [pushDay, pullDay, legsDay];
  return Array.from({ length: trainingDays }, (_, i) => ({ day: i + 1, ...cycle[i % 3] }));
}

function resolveNutritionAndCardio(goal: Goal): {
  nutrition: PlanResult["nutrition"];
  cardio: PlanResult["cardio"];
  rationaleKey: string;
} {
  switch (goal) {
    case "WEIGHT_LOSS":
      return {
        nutrition: { calorieDirection: "DEFICIT", calorieAdjustmentPct: -17, proteinPerKgMin: 1.8, proteinPerKgMax: 2.2 },
        cardio: { sessionsPerWeek: 4, style: "Moderate-intensity cardio (brisk walking, cycling, or swimming) to support the deficit while preserving muscle." },
        rationaleKey: "deficit_for_weight_loss",
      };
    case "MUSCLE_GAIN":
      return {
        nutrition: { calorieDirection: "SURPLUS", calorieAdjustmentPct: 10, proteinPerKgMin: 1.6, proteinPerKgMax: 2.2 },
        cardio: { sessionsPerWeek: 2, style: "Light cardio for cardiovascular health only — kept minimal to protect the calorie surplus." },
        rationaleKey: "surplus_for_muscle_gain",
      };
    case "ENDURANCE":
      return {
        nutrition: { calorieDirection: "MAINTENANCE", calorieAdjustmentPct: 0, proteinPerKgMin: 1.2, proteinPerKgMax: 1.6 },
        cardio: { sessionsPerWeek: 3, style: "Zone-2 base training 2–3x/week plus one higher-intensity interval session." },
        rationaleKey: "maintenance_for_endurance",
      };
    case "GENERAL_HEALTH":
      return {
        nutrition: { calorieDirection: "MAINTENANCE", calorieAdjustmentPct: 0, proteinPerKgMin: 1.2, proteinPerKgMax: 1.6 },
        cardio: { sessionsPerWeek: 3, style: "Mixed cardio 2–3x/week — whatever you enjoy: walking, cycling, dancing, sports." },
        rationaleKey: "maintenance_for_general_health",
      };
  }
}

const GOAL_TOPIC_SLUGS: Record<Goal, string[]> = {
  WEIGHT_LOSS: ["caloric-deficit", "hydration"],
  MUSCLE_GAIN: ["muscle-protein-synthesis", "progressive-overload"],
  ENDURANCE: ["vo2-max", "hydration"],
  GENERAL_HEALTH: ["recovery-sleep", "hydration"],
};

const SPLIT_RATIONALE_KEY: Record<SplitType, string> = {
  FULL_BODY: "full_body_rationale",
  UPPER_LOWER: "upper_lower_rationale",
  PUSH_PULL_LEGS: "ppl_rationale",
};

const LIMITATION_RATIONALE_KEY = {
  KNEE: "knee_substitutions_applied",
  LOWER_BACK: "lower_back_substitutions_applied",
  SHOULDER: "shoulder_substitutions_applied",
} as const;

export function generatePlan(input: OnboardingInput): PlanResult {
  const splitType = resolveSplitType(input);
  const weeklySchedule = buildWeeklySchedule(input, splitType);
  const { nutrition, cardio, rationaleKey: goalRationaleKey } = resolveNutritionAndCardio(input.goal);

  const rationaleKeys = [goalRationaleKey, SPLIT_RATIONALE_KEY[splitType]];
  if (input.frequency >= 6) rationaleKeys.push("ppl_rest_day_enforced");
  for (const limitation of input.limitations) {
    rationaleKeys.push(LIMITATION_RATIONALE_KEY[limitation]);
  }

  const relatedTopicSlugs = Array.from(
    new Set(["progressive-overload", "recovery-sleep", ...GOAL_TOPIC_SLUGS[input.goal]]),
  );

  return {
    splitType,
    weeklySchedule,
    nutrition,
    cardio,
    relatedTopicSlugs,
    rationaleKeys,
  };
}
