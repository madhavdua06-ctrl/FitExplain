import type { EquipmentTier, ExerciseSlot, Limitation } from "./types";

interface ExerciseCandidate extends ExerciseSlot {
  avoidFor?: Limitation[];
}

type Role = "push" | "pull" | "legs" | "core";
type Pool = Record<EquipmentTier, Record<Role, ExerciseCandidate[]>>;

export const EXERCISE_POOLS: Pool = {
  NONE: {
    push: [
      { name: "Push-Ups", sets: 3, reps: "8-15" },
      { name: "Incline Push-Ups", sets: 3, reps: "10-15" },
      {
        name: "Triceps Dips (chair)",
        sets: 3,
        reps: "8-12",
        avoidFor: ["SHOULDER"],
        notes: "Skip if shoulder pain — substitute another set of Incline Push-Ups",
      },
    ],
    pull: [
      { name: "Inverted Rows (table or low bar)", sets: 3, reps: "8-12" },
      { name: "Doorway Band Rows", sets: 3, reps: "12-15" },
      { name: "Superman Holds", sets: 3, reps: "12-15" },
    ],
    legs: [
      { name: "Bodyweight Squats", sets: 3, reps: "12-20" },
      {
        name: "Walking Lunges",
        sets: 3,
        reps: "10 per leg",
        avoidFor: ["KNEE"],
        notes: "Skip if knee pain — substitute Glute Bridges",
      },
      { name: "Glute Bridges", sets: 3, reps: "15-20" },
      { name: "Calf Raises", sets: 3, reps: "15-20" },
    ],
    core: [{ name: "Plank", sets: 3, reps: "30-60s" }],
  },
  HOME_BASIC: {
    push: [
      { name: "Dumbbell Bench Press (floor or bench)", sets: 4, reps: "8-12" },
      {
        name: "Dumbbell Shoulder Press",
        sets: 3,
        reps: "8-12",
        avoidFor: ["SHOULDER"],
        notes: "Skip if shoulder pain — substitute Neutral-Grip DB Floor Press",
      },
      { name: "Neutral-Grip DB Floor Press", sets: 3, reps: "8-12" },
    ],
    pull: [
      { name: "Dumbbell Rows", sets: 4, reps: "8-12" },
      { name: "Band Pull-Aparts", sets: 3, reps: "15-20" },
      { name: "Dumbbell Bicep Curls", sets: 3, reps: "10-12" },
    ],
    legs: [
      { name: "Dumbbell Goblet Squat", sets: 4, reps: "8-12" },
      {
        name: "Dumbbell Romanian Deadlift",
        sets: 3,
        reps: "8-12",
        avoidFor: ["LOWER_BACK"],
        notes: "Skip if lower-back pain — substitute Glute Bridges (weighted)",
      },
      {
        name: "Dumbbell Walking Lunges",
        sets: 3,
        reps: "10 per leg",
        avoidFor: ["KNEE"],
        notes: "Skip if knee pain — substitute Dumbbell Step-Ups on a low step",
      },
      { name: "Standing Calf Raises", sets: 3, reps: "15-20" },
    ],
    core: [{ name: "Weighted Plank", sets: 3, reps: "30-45s" }],
  },
  FULL_GYM: {
    push: [
      { name: "Barbell Bench Press", sets: 4, reps: "6-10" },
      {
        name: "Overhead Press",
        sets: 3,
        reps: "6-10",
        avoidFor: ["SHOULDER"],
        notes: "Skip if shoulder pain — substitute Landmine Press",
      },
      { name: "Landmine Press", sets: 3, reps: "8-12" },
      { name: "Cable Triceps Pushdown", sets: 3, reps: "10-15" },
    ],
    pull: [
      { name: "Barbell Row", sets: 4, reps: "6-10" },
      { name: "Lat Pulldown", sets: 3, reps: "8-12" },
      { name: "Seated Cable Row", sets: 3, reps: "8-12" },
    ],
    legs: [
      {
        name: "Barbell Back Squat",
        sets: 4,
        reps: "6-10",
        avoidFor: ["KNEE"],
        notes: "Skip if knee pain — substitute Leg Press with a limited range of motion",
      },
      { name: "Leg Press", sets: 3, reps: "8-12" },
      {
        name: "Romanian Deadlift",
        sets: 3,
        reps: "8-12",
        avoidFor: ["LOWER_BACK"],
        notes: "Skip if lower-back pain — substitute Leg Curl Machine",
      },
      { name: "Leg Curl Machine", sets: 3, reps: "10-15" },
      { name: "Standing Calf Raise", sets: 3, reps: "12-15" },
    ],
    core: [{ name: "Cable Woodchoppers", sets: 3, reps: "12 per side" }],
  },
};

export function pickExercises(
  equipment: EquipmentTier,
  role: Role,
  count: number,
  limitations: Limitation[],
): ExerciseSlot[] {
  const pool = EXERCISE_POOLS[equipment][role];
  const allowed = pool.filter(
    (candidate) => !candidate.avoidFor?.some((limitation) => limitations.includes(limitation)),
  );
  return allowed.slice(0, count).map(({ name, sets, reps, notes }) => ({ name, sets, reps, notes }));
}
