export type NutrientKey =
  | "vitaminA"
  | "vitaminC"
  | "vitaminD"
  | "vitaminE"
  | "vitaminK"
  | "vitaminB6"
  | "vitaminB12"
  | "folate"
  | "calcium"
  | "iron"
  | "magnesium"
  | "zinc"
  | "potassium";

export const NUTRIENT_KEYS: NutrientKey[] = [
  "vitaminA",
  "vitaminC",
  "vitaminD",
  "vitaminE",
  "vitaminK",
  "vitaminB6",
  "vitaminB12",
  "folate",
  "calcium",
  "iron",
  "magnesium",
  "zinc",
  "potassium",
];

export const NUTRIENT_META: Record<NutrientKey, { label: string; unit: string }> = {
  vitaminA: { label: "Vitamin A", unit: "mcg" },
  vitaminC: { label: "Vitamin C", unit: "mg" },
  vitaminD: { label: "Vitamin D", unit: "mcg" },
  vitaminE: { label: "Vitamin E", unit: "mg" },
  vitaminK: { label: "Vitamin K", unit: "mcg" },
  vitaminB6: { label: "Vitamin B6", unit: "mg" },
  vitaminB12: { label: "Vitamin B12", unit: "mcg" },
  folate: { label: "Folate", unit: "mcg" },
  calcium: { label: "Calcium", unit: "mg" },
  iron: { label: "Iron", unit: "mg" },
  magnesium: { label: "Magnesium", unit: "mg" },
  zinc: { label: "Zinc", unit: "mg" },
  potassium: { label: "Potassium", unit: "mg" },
};

// General adult (19-50) reference values, NIH Office of Dietary Supplements.
export const RDA_MALE: Record<NutrientKey, number> = {
  vitaminA: 900,
  vitaminC: 90,
  vitaminD: 15,
  vitaminE: 15,
  vitaminK: 120,
  vitaminB6: 1.3,
  vitaminB12: 2.4,
  folate: 400,
  calcium: 1000,
  iron: 8,
  magnesium: 400,
  zinc: 11,
  potassium: 3400,
};

export const RDA_FEMALE: Record<NutrientKey, number> = {
  vitaminA: 700,
  vitaminC: 75,
  vitaminD: 15,
  vitaminE: 15,
  vitaminK: 90,
  vitaminB6: 1.3,
  vitaminB12: 2.4,
  folate: 400,
  calcium: 1000,
  iron: 18,
  magnesium: 310,
  zinc: 8,
  potassium: 2600,
};

export function getRdaTarget(key: NutrientKey, sex?: string | null): number {
  return sex === "female" ? RDA_FEMALE[key] : RDA_MALE[key];
}
