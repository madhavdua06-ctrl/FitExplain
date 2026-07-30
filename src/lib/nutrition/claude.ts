import Anthropic from "@anthropic-ai/sdk";
import { nutritionEstimateSchema, type NutritionEstimate } from "@/lib/validation/nutrition";
import { NUTRIENT_KEYS, NUTRIENT_META } from "@/lib/nutrition/rda";

type EstimateResult = { ok: true; data: NutritionEstimate } | { ok: false; message: string };

const nutrientProperties = Object.fromEntries(
  NUTRIENT_KEYS.map((key) => {
    const meta = NUTRIENT_META[key];
    const unitLabel = meta.unit === "mcg" ? "micrograms (mcg)" : "milligrams (mg)";
    return [key, { type: "number", description: `${meta.label} in ${unitLabel}` }];
  }),
);

const LOG_NUTRITION_TOOL = {
  name: "log_nutrition",
  description: "Record the estimated nutrition breakdown for a described meal or food.",
  strict: true,
  input_schema: {
    type: "object",
    properties: {
      calories: { type: "number", description: "Total calories (kcal)" },
      proteinG: { type: "number", description: "Protein in grams" },
      carbsG: { type: "number", description: "Carbohydrates in grams" },
      fatG: { type: "number", description: "Fat in grams" },
      nutrients: {
        type: "object",
        description:
          "Estimated micronutrient amounts, each in the unit specified for that field. Use 0 for a nutrient this food contributes negligibly.",
        properties: nutrientProperties,
        required: NUTRIENT_KEYS,
        additionalProperties: false,
      },
    },
    required: ["calories", "proteinG", "carbsG", "fatG", "nutrients"],
    additionalProperties: false,
  },
} as const;

const SYSTEM_PROMPT =
  "You estimate nutrition facts for a single described meal or food. Assume one typical serving using standard restaurant or home-cooking portions when the amount isn't specified. Always give your best estimate rather than refusing or asking for clarification.";

export async function estimateNutrition(description: string): Promise<EstimateResult> {
  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      tool_choice: { type: "tool", name: "log_nutrition" },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tools: [LOG_NUTRITION_TOOL as any],
      messages: [{ role: "user", content: description }],
    });

    const toolUse = response.content.find(
      (block): block is Anthropic.ToolUseBlock => block.type === "tool_use",
    );
    if (!toolUse) {
      return { ok: false, message: "Couldn't understand that meal description — try being more specific." };
    }

    const parsed = nutritionEstimateSchema.safeParse(toolUse.input);
    if (!parsed.success) {
      return { ok: false, message: "Couldn't understand that meal description — try being more specific." };
    }

    return { ok: true, data: parsed.data };
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return { ok: false, message: "Nutrition lookup is busy — try again in a moment." };
    }
    return { ok: false, message: "Couldn't estimate nutrition right now." };
  }
}
