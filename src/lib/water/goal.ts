export function computeWaterGoalMl(weightKg?: number | null): number {
  return weightKg ? weightKg * 33 : 2500;
}
