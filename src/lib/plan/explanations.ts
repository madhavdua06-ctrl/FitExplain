export interface Explanation {
  simple: string;
  scientific: string;
}

export const planExplanations: Record<string, Explanation> = {
  deficit_for_weight_loss: {
    simple:
      "You'll eat a little less than you burn so your body taps into stored fat for energy.",
    scientific:
      "A ~15–20% caloric deficit relative to estimated TDEE drives negative energy balance, prompting lipolysis to cover the shortfall, while elevated protein intake spares lean mass.",
  },
  surplus_for_muscle_gain: {
    simple:
      "You'll eat a bit more than you burn so your body has the raw materials to build new muscle.",
    scientific:
      "A ~10% caloric surplus supplies substrate for anabolism, supporting muscle protein synthesis beyond maintenance while minimizing excess fat accrual.",
  },
  maintenance_for_endurance: {
    simple:
      "You'll eat roughly what you burn, since the goal is better stamina — not gaining or losing weight.",
    scientific:
      "Calories are held near maintenance/TDEE to fuel glycogen replenishment and mitochondrial/cardiovascular adaptations without the recovery cost of a deficit.",
  },
  maintenance_for_general_health: {
    simple:
      "You'll eat roughly what you burn — the focus here is consistent movement and balanced habits, not a specific weight change.",
    scientific:
      "Calories at maintenance support consistent training adherence and recovery capacity while broader health markers (VO2 max, strength, resting heart rate) improve.",
  },
  full_body_rationale: {
    simple:
      "With fewer training days, hitting your whole body each session gets you the most total work in per week.",
    scientific:
      "At 2–3 sessions/week, full-body training maximizes per-session muscle protein synthesis stimulus frequency for each muscle group given the limited weekly volume.",
  },
  upper_lower_rationale: {
    simple:
      "Splitting into upper-body and lower-body days lets each muscle group work hard and then rest before it's hit again.",
    scientific:
      "An upper/lower split at 4–5 days/week balances training frequency (~2x/muscle group/week) with enough volume per session and adequate recovery between sessions.",
  },
  ppl_rationale: {
    simple:
      "Grouping by push, pull, and leg movements lets you train more often per week while each muscle still gets proper rest.",
    scientific:
      "A push/pull/legs split distributes volume across movement patterns with non-overlapping recovery demands, supporting higher weekly frequency (5–6 sessions) without compounding fatigue on the same tissues.",
  },
  ppl_rest_day_enforced: {
    simple:
      "Even with a high number of training days, we keep at least one full rest day — recovery is when your muscles actually grow.",
    scientific:
      "Capping training at 6 days/week preserves at least one full recovery day, supporting glycogen resynthesis and reducing cumulative neuromuscular fatigue and overtraining risk.",
  },
  knee_substitutions_applied: {
    simple: "A few leg exercises were swapped out or noted to protect your knees.",
    scientific:
      "Deep knee-flexion movements (e.g. deep lunges, heavy squats) were deprioritized in favor of options with reduced tibiofemoral shear and patellofemoral loading.",
  },
  lower_back_substitutions_applied: {
    simple: "A few exercises were swapped out or noted to go easier on your lower back.",
    scientific:
      "Loaded spinal-flexion and heavy hip-hinge movements were deprioritized in favor of options that reduce compressive and shear load on the lumbar spine.",
  },
  shoulder_substitutions_applied: {
    simple: "A few pressing exercises were swapped out or noted to protect your shoulders.",
    scientific:
      "Overhead and behind-neck pressing patterns were deprioritized in favor of options with a more neutral glenohumeral joint path and reduced impingement risk.",
  },
};
