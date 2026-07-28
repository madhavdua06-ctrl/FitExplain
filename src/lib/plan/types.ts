export type Goal = "WEIGHT_LOSS" | "MUSCLE_GAIN" | "ENDURANCE" | "GENERAL_HEALTH";
export type Experience = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type EquipmentTier = "NONE" | "HOME_BASIC" | "FULL_GYM";
export type Limitation = "KNEE" | "LOWER_BACK" | "SHOULDER";
export type SplitType = "FULL_BODY" | "UPPER_LOWER" | "PUSH_PULL_LEGS";

export interface OnboardingInput {
  goal: Goal;
  experience: Experience;
  frequency: number;
  equipment: EquipmentTier;
  limitations: Limitation[];
  age?: number;
  sex?: "male" | "female" | "unspecified";
  weightKg?: number;
  heightCm?: number;
}

export interface ExerciseSlot {
  name: string;
  sets: number;
  reps: string;
  notes?: string;
}

export interface DaySchedule {
  day: number;
  focus: string;
  exercises: ExerciseSlot[];
}

export interface PlanResult {
  splitType: SplitType;
  weeklySchedule: DaySchedule[];
  nutrition: {
    calorieDirection: "DEFICIT" | "SURPLUS" | "MAINTENANCE";
    calorieAdjustmentPct: number;
    proteinPerKgMin: number;
    proteinPerKgMax: number;
  };
  cardio: {
    sessionsPerWeek: number;
    style: string;
  };
  relatedTopicSlugs: string[];
  rationaleKeys: string[];
}
