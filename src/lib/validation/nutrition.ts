import { z } from "zod";
import { NUTRIENT_KEYS } from "@/lib/nutrition/rda";

const nutrientsShape = Object.fromEntries(
  NUTRIENT_KEYS.map((key) => [key, z.number().min(0).max(20000)]),
) as Record<(typeof NUTRIENT_KEYS)[number], z.ZodNumber>;

export const nutritionEstimateSchema = z.object({
  calories: z.number().min(0).max(3000),
  proteinG: z.number().min(0).max(500),
  carbsG: z.number().min(0).max(500),
  fatG: z.number().min(0).max(500),
  nutrients: z.object(nutrientsShape),
});

export type NutritionEstimate = z.infer<typeof nutritionEstimateSchema>;
