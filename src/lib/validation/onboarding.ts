import { z } from "zod";

export const goalSchema = z.enum(["WEIGHT_LOSS", "MUSCLE_GAIN", "ENDURANCE", "GENERAL_HEALTH"]);
export const experienceSchema = z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]);
export const equipmentTierSchema = z.enum(["NONE", "HOME_BASIC", "FULL_GYM"]);
export const limitationSchema = z.enum(["KNEE", "LOWER_BACK", "SHOULDER"]);

export const onboardingSchema = z.object({
  goal: goalSchema,
  experience: experienceSchema,
  frequency: z.number().int().min(2).max(7),
  equipment: equipmentTierSchema,
  equipmentList: z.array(z.string()).optional(),
  limitations: z.array(limitationSchema).default([]),
  age: z.number().int().min(13).max(100).optional(),
  sex: z.enum(["male", "female", "unspecified"]).optional(),
  weightKg: z.number().positive().max(400).optional(),
  heightCm: z.number().positive().max(300).optional(),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
export type Goal = z.infer<typeof goalSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type EquipmentTier = z.infer<typeof equipmentTierSchema>;
export type Limitation = z.infer<typeof limitationSchema>;
