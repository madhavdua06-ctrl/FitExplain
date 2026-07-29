"use client";

import { useState, useTransition } from "react";
import { submitOnboarding } from "@/app/(protected)/onboarding/actions";
import type {
  OnboardingFormValues,
  Goal,
  Experience,
  EquipmentTier,
  Limitation,
} from "@/lib/validation/onboarding";

const GOALS: { value: Goal; label: string; description: string }[] = [
  { value: "WEIGHT_LOSS", label: "Weight Loss", description: "Lose fat while keeping muscle" },
  { value: "MUSCLE_GAIN", label: "Muscle Gain", description: "Build strength and size" },
  { value: "ENDURANCE", label: "Endurance", description: "Improve stamina and cardio fitness" },
  { value: "GENERAL_HEALTH", label: "General Health", description: "Stay active and feel better overall" },
];

const EXPERIENCES: { value: Experience; label: string }[] = [
  { value: "BEGINNER", label: "Beginner — new to structured training" },
  { value: "INTERMEDIATE", label: "Intermediate — training consistently for 6+ months" },
  { value: "ADVANCED", label: "Advanced — training consistently for 2+ years" },
];

const EQUIPMENT: { value: EquipmentTier; label: string }[] = [
  { value: "NONE", label: "No equipment — bodyweight only" },
  { value: "HOME_BASIC", label: "Home basics — dumbbells or resistance bands" },
  { value: "FULL_GYM", label: "Full gym access" },
];

const LIMITATIONS: { value: Limitation; label: string }[] = [
  { value: "KNEE", label: "Knee" },
  { value: "LOWER_BACK", label: "Lower back" },
  { value: "SHOULDER", label: "Shoulder" },
];

const TOTAL_STEPS = 4;
const optionCard = (active: boolean) =>
  `flex cursor-pointer flex-col rounded-xl border p-4 transition ${
    active
      ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/30 dark:bg-emerald-950/30"
      : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600"
  }`;
const inputClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800";

export function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [goal, setGoal] = useState<Goal | null>(null);
  const [experience, setExperience] = useState<Experience | null>(null);
  const [frequency, setFrequency] = useState(3);
  const [equipment, setEquipment] = useState<EquipmentTier | null>(null);
  const [limitations, setLimitations] = useState<Limitation[]>([]);
  const [age, setAge] = useState("");
  const [sex, setSex] = useState<"male" | "female" | "unspecified" | "">("");
  const [weightKg, setWeightKg] = useState("");
  const [heightCm, setHeightCm] = useState("");

  function toggleLimitation(value: Limitation) {
    setLimitations((current) =>
      current.includes(value) ? current.filter((l) => l !== value) : [...current, value],
    );
  }

  function canProceed() {
    if (step === 1) return goal !== null;
    if (step === 2) return experience !== null && equipment !== null;
    return true;
  }

  function handleSubmit() {
    if (!goal || !experience || !equipment) {
      setError("Please complete all required steps.");
      return;
    }

    const values: OnboardingFormValues = {
      goal,
      experience,
      frequency,
      equipment,
      limitations,
      age: age ? Number(age) : undefined,
      sex: sex || undefined,
      weightKg: weightKg ? Number(weightKg) : undefined,
      heightCm: heightCm ? Number(heightCm) : undefined,
    };

    setError(null);
    startTransition(async () => {
      try {
        await submitOnboarding(values);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      }
    });
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="flex gap-2">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < step ? "bg-gradient-to-r from-cyan-500 to-violet-600" : "bg-slate-200 dark:bg-white/10"
            }`}
          />
        ))}
      </div>

      <div key={step} className="animate-fade-in-up">
      {step === 1 ? (
        <fieldset className="space-y-3">
          <legend className="mb-2 text-lg font-semibold">What&apos;s your main goal?</legend>
          {GOALS.map((g) => (
            <label key={g.value} className={optionCard(goal === g.value)}>
              <input
                type="radio"
                name="goal"
                value={g.value}
                checked={goal === g.value}
                onChange={() => setGoal(g.value)}
                className="sr-only"
              />
              <span className="font-medium">{g.label}</span>
              <span className="text-sm text-slate-500">{g.description}</span>
            </label>
          ))}
        </fieldset>
      ) : null}

      {step === 2 ? (
        <div className="space-y-6">
          <fieldset className="space-y-3">
            <legend className="mb-2 text-lg font-semibold">Experience level</legend>
            {EXPERIENCES.map((e) => (
              <label key={e.value} className={`flex items-center ${optionCard(experience === e.value)}`}>
                <input
                  type="radio"
                  name="experience"
                  value={e.value}
                  checked={experience === e.value}
                  onChange={() => setExperience(e.value)}
                  className="mr-3"
                />
                {e.label}
              </label>
            ))}
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="mb-2 text-lg font-semibold">Equipment access</legend>
            {EQUIPMENT.map((eq) => (
              <label key={eq.value} className={`flex items-center ${optionCard(equipment === eq.value)}`}>
                <input
                  type="radio"
                  name="equipment"
                  value={eq.value}
                  checked={equipment === eq.value}
                  onChange={() => setEquipment(eq.value)}
                  className="mr-3"
                />
                {eq.label}
              </label>
            ))}
          </fieldset>

          <div>
            <label className="block text-sm font-medium">How many days per week can you train?</label>
            <input
              type="range"
              min={2}
              max={7}
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="mt-2 w-full"
            />
            <p className="text-sm text-slate-500">{frequency} days/week</p>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <fieldset className="space-y-3">
          <legend className="mb-2 text-lg font-semibold">
            Any areas we should train around? (optional)
          </legend>
          {LIMITATIONS.map((l) => (
            <label
              key={l.value}
              className="flex cursor-pointer items-center rounded-xl border border-slate-200 p-3 dark:border-slate-700"
            >
              <input
                type="checkbox"
                checked={limitations.includes(l.value)}
                onChange={() => toggleLimitation(l.value)}
                className="mr-3"
              />
              {l.label}
            </label>
          ))}
        </fieldset>
      ) : null}

      {step === 4 ? (
        <fieldset className="space-y-4">
          <legend className="mb-2 text-lg font-semibold">A few optional stats</legend>
          <p className="text-sm text-slate-500">These help fine-tune future features — all optional.</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Sex</label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value as typeof sex)}
                className={inputClass}
              >
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unspecified">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Weight (kg)</label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Height (cm)</label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </fieldset>
      ) : null}
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 disabled:opacity-40 dark:text-slate-300"
        >
          Back
        </button>
        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={() => canProceed() && setStep((s) => s + 1)}
            disabled={!canProceed()}
            className="btn-pop glow-cyan rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-cyan-400 hover:to-violet-500 disabled:opacity-50"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="btn-pop glow-cyan rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-cyan-400 hover:to-violet-500 disabled:opacity-60"
          >
            {isPending ? "Generating your plan…" : "Generate my plan"}
          </button>
        )}
      </div>
    </div>
  );
}
