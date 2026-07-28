import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const topics = [
  {
    slug: "progressive-overload",
    title: "Progressive Overload",
    shortDescription: "Why your workouts need to keep getting a little harder.",
    category: "training",
    order: 1,
    simpleContent:
      "Think of your muscles like a staircase — if you keep climbing the same three steps every day, you stop getting anywhere new. Progressive overload just means gradually making your workouts a bit harder over time: a little more weight, one more rep, or an extra set every week or two. That small, steady challenge is what tells your body \"keep adapting\" instead of settling into a plateau. You don't need to make huge jumps — small, consistent increases beat occasional big pushes.",
    scientificContent:
      "Progressive overload works through mechanotransduction: as mechanical tension on a muscle fiber increases beyond its accustomed load, it triggers intracellular signaling (including the mTOR pathway) that drives muscle protein synthesis and satellite cell activation. Without a rising stimulus, the body has no signal to keep adapting, and gains plateau — a concept modeled by supercompensation, where a training stress is followed by a recovery period that leaves the tissue slightly more capable than before. Structured periodization (linear increases in load over weeks, or undulating variation in volume/intensity) is used to manage this stimulus so fatigue doesn't outpace adaptation.",
  },
  {
    slug: "muscle-protein-synthesis",
    title: "How Muscle Grows",
    shortDescription: "The repair-and-rebuild cycle behind every gain.",
    category: "nutrition",
    order: 2,
    simpleContent:
      "When you lift weights, you're actually creating tiny amounts of damage in your muscle fibers. That's normal and expected — it's not a bad thing. Your body then repairs that damage using protein from your diet, and it rebuilds the fiber slightly stronger and bigger than before, so it's better prepared next time. Repeat that cycle consistently — train, eat enough protein, recover — and that's the entire engine behind muscle growth.",
    scientificContent:
      "Resistance training creates mechanical and metabolic stress that activates muscle protein synthesis (MPS) via the mTOR signaling pathway, particularly sensitive to the amino acid leucine (a threshold of roughly 2–3g per meal is generally needed to maximally stimulate MPS). Muscle growth is the net result of MPS exceeding muscle protein breakdown (MPB) over time. Research on protein timing and distribution suggests spreading intake across 3–4 meals of about 0.3g/kg each keeps MPS elevated more consistently across the day than the same total protein concentrated in one or two meals.",
  },
  {
    slug: "caloric-deficit",
    title: "Caloric Deficit & Weight Loss",
    shortDescription: "The core idea behind sustainable fat loss.",
    category: "nutrition",
    order: 3,
    simpleContent:
      "Weight loss really comes down to one thing: eating somewhat less than you burn, consistently, over weeks and months. A small, sustainable deficit — the kind you can stick to without feeling miserable — beats an extreme crash diet almost every time, because extreme deficits are hard to maintain and tend to cost you muscle along with fat. Pair a modest deficit with enough protein and you'll lose weight while holding onto more of your strength.",
    scientificContent:
      "Weight change is governed by the energy balance equation: calories in versus total energy expenditure (BMR + TEF + NEAT + EAT). A sustained caloric deficit forces the body to mobilize stored triglycerides via lipolysis to cover the shortfall. However, prolonged deficits trigger adaptive thermogenesis — a disproportionate drop in metabolic rate beyond what reduced body mass alone would predict — which is part of why weight loss often stalls over time. Higher protein intake during a deficit helps mitigate this metabolic adaptation and preferentially spares lean mass over fat mass compared to a low-protein deficit of the same size.",
  },
  {
    slug: "vo2-max",
    title: "VO2 Max & Cardiovascular Fitness",
    shortDescription: "The score behind how long you can go before gassing out.",
    category: "training",
    order: 4,
    simpleContent:
      "VO2 max is basically a score for how well your heart and lungs can deliver oxygen to your muscles while you're exercising. A higher number means you can go longer and harder before you're completely out of breath — and it's not just useful for athletes. Research consistently links a higher VO2 max to a longer, healthier life overall, which makes cardio training worth doing even if performance isn't your main goal.",
    scientificContent:
      "VO2 max is defined as the maximum rate of oxygen consumption during incremental exercise, measured in mL O2/kg/min. It's described by the Fick equation: VO2 = cardiac output × arteriovenous oxygen difference — meaning it depends on both central adaptations (stroke volume, cardiac output) and peripheral adaptations (capillary density, mitochondrial density, oxidative enzyme activity in muscle). Zone-2 (low-intensity, sustainable) training primarily builds peripheral/mitochondrial capacity and fat oxidation efficiency, while high-intensity interval training (HIIT) drives central adaptations like stroke volume more efficiently — which is why well-rounded programs combine both. Epidemiological studies consistently rank VO2 max among the strongest predictors of all-cause mortality risk.",
  },
  {
    slug: "recovery-sleep",
    title: "Recovery & Sleep",
    shortDescription: "Why the gym is where you break down, not where you grow.",
    category: "recovery",
    order: 5,
    simpleContent:
      "Here's something that surprises a lot of people: you don't actually build muscle during your workout. The workout just creates the stimulus — the actual growing happens afterward, during rest, and especially during sleep. If you're skimping on sleep or never taking a day off, you're undoing a good chunk of the effort you put in at the gym, because your body never gets the chance to finish the repair job.",
    scientificContent:
      "The majority of growth hormone release happens in pulsatile bursts during slow-wave (deep) sleep, and this hormonal environment supports tissue repair and muscle protein synthesis overnight. Chronic sleep deprivation shifts the cortisol-to-testosterone ratio unfavorably, a hallmark pattern also seen in overtraining syndrome, and measurably impairs both insulin sensitivity and next-day muscle protein synthesis. Glycogen resynthesis — replenishing the muscle's carbohydrate fuel stores — also occurs primarily during rest periods and can take 24–48 hours to fully complete after a depleting session, which is part of the physiological rationale for built-in rest days.",
  },
  {
    slug: "hydration",
    title: "Hydration & Electrolytes",
    shortDescription: "Why water is a bigger lever on performance than people think.",
    category: "recovery",
    order: 6,
    simpleContent:
      "Even mild dehydration — well before you'd say you're actually thirsty — can make a workout feel noticeably harder than it should. The fix is simple: drink water steadily through the day rather than chugging it all right before you train, and drink a bit more around workouts, especially if you're sweating a lot or training somewhere hot.",
    scientificContent:
      "Dehydration reduces plasma volume, which increases cardiovascular strain — the heart has to work harder to maintain the same cardiac output, and thermoregulation via sweat evaporation becomes less efficient as fluid reserves drop. Sodium and potassium, lost through sweat, are essential for nerve conduction and fluid balance across cell membranes, which is why electrolyte replacement matters for longer or hotter sessions. Performance research generally identifies a threshold around 2% body-mass loss from fluid deficit as the point where measurable performance decrements — reduced endurance capacity, elevated perceived exertion — reliably appear.",
  },
];

async function main() {
  for (const topic of topics) {
    await prisma.topic.upsert({
      where: { slug: topic.slug },
      update: topic,
      create: topic,
    });
  }
  console.log(`Seeded ${topics.length} topics.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
