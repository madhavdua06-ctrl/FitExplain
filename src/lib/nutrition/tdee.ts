export function calculateBmr({
  sex,
  age,
  weightKg,
  heightCm,
}: {
  sex?: string | null;
  age: number;
  weightKg: number;
  heightCm: number;
}): number {
  return 10 * weightKg + 6.25 * heightCm - 5 * age + (sex === "female" ? -161 : 5);
}

export function calculateTdee(params: {
  sex?: string | null;
  age: number;
  weightKg: number;
  heightCm: number;
  activityMultiplier: number;
}): number {
  return calculateBmr(params) * params.activityMultiplier;
}
