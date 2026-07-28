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
    sources: [
      {
        authors: "Schoenfeld BJ, Ogborn D, Krieger JW",
        year: 2017,
        title:
          "Dose-response relationship between weekly resistance training volume and increases in muscle mass: a systematic review and meta-analysis",
        journal: "Journal of Sports Sciences",
        url: "https://pubmed.ncbi.nlm.nih.gov/27433992/",
      },
      {
        authors: "Norton LE, Layman DK",
        year: 2006,
        title: "Leucine regulates translation initiation of protein synthesis in skeletal muscle after exercise",
        journal: "Journal of Nutrition",
        url: "https://pubmed.ncbi.nlm.nih.gov/16424142/",
      },
    ],
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
      "Resistance training creates mechanical and metabolic stress that activates muscle protein synthesis (MPS) via the mTOR signaling pathway, particularly sensitive to the amino acid leucine — dose-response trials commonly put the per-meal threshold for maximal stimulation in the rough range of 2–3g, though the exact figure varies by study and body size. Muscle growth is the net result of MPS exceeding muscle protein breakdown (MPB) over time. Controlled feeding studies on protein timing and distribution show that spreading intake across 3–4 meals of about 0.3g/kg each produces higher 24-hour MPS than the same total protein concentrated in one or two meals.",
    sources: [
      {
        authors: "Areta JL, Burke LM, Ross ML, et al.",
        year: 2013,
        title:
          "Timing and distribution of protein ingestion during prolonged recovery from resistance exercise alters myofibrillar protein synthesis",
        journal: "Journal of Physiology",
        url: "https://pubmed.ncbi.nlm.nih.gov/23459753/",
      },
      {
        authors: "Mamerow MM, Mettler JA, English KL, et al.",
        year: 2014,
        title: "Dietary protein distribution positively influences 24-h muscle protein synthesis in healthy adults",
        journal: "Journal of Nutrition",
        url: "https://pubmed.ncbi.nlm.nih.gov/24477298/",
      },
    ],
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
      "Weight change is governed by the energy balance equation: calories in versus total energy expenditure (BMR + TEF + NEAT + EAT). A sustained caloric deficit forces the body to mobilize stored triglycerides via lipolysis to cover the shortfall. However, prolonged deficits trigger adaptive thermogenesis — a disproportionate drop in metabolic rate beyond what reduced body mass alone would predict, documented to persist for years after major sustained weight loss. Higher protein intake during a deficit helps preserve lean mass: controlled trials show a higher-protein deficit yields greater fat loss with better-preserved (or even increased) lean mass than a lower-protein deficit of the same size.",
    sources: [
      {
        authors: "Fothergill E, Guo J, Howard L, et al.",
        year: 2016,
        title: "Persistent metabolic adaptation 6 years after \"The Biggest Loser\" competition",
        journal: "Obesity",
        url: "https://pubmed.ncbi.nlm.nih.gov/27136388/",
      },
      {
        authors: "Longland TM, Oikawa SY, Mitchell CJ, Devries MC, Phillips SM",
        year: 2016,
        title:
          "Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss: a randomized trial",
        journal: "American Journal of Clinical Nutrition",
        url: "https://pubmed.ncbi.nlm.nih.gov/26817506/",
      },
    ],
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
      "VO2 max is defined as the maximum rate of oxygen consumption during incremental exercise, measured in mL O2/kg/min. It's described by the Fick equation: VO2 = cardiac output × arteriovenous oxygen difference — meaning it depends on both central adaptations (stroke volume, cardiac output) and peripheral adaptations (capillary density, mitochondrial density, oxidative enzyme activity in muscle). Zone-2 (low-intensity, sustainable) training primarily builds peripheral/mitochondrial capacity and fat oxidation efficiency, while high-intensity interval training (HIIT) drives central adaptations like stroke volume more efficiently — which is why well-rounded programs combine both. A large cohort study of over 750,000 US veterans found cardiorespiratory fitness inversely associated with all-cause mortality across every age, race, and sex group studied.",
    sources: [
      {
        authors: "Kokkinos P, Faselis C, Samuel IBH, et al.",
        year: 2022,
        title: "Cardiorespiratory Fitness and Mortality Risk Across the Spectra of Age, Race, and Sex",
        journal: "Journal of the American College of Cardiology",
        url: "https://pubmed.ncbi.nlm.nih.gov/35926933/",
      },
      {
        authors: "Kaminsky LA, Arena R, Myers J",
        year: 2015,
        title:
          "Reference Standards for Cardiorespiratory Fitness Measured With Cardiopulmonary Exercise Testing (the FRIEND Registry)",
        journal: "Mayo Clinic Proceedings",
        url: "https://pubmed.ncbi.nlm.nih.gov/26455884/",
      },
    ],
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
      "The majority of growth hormone release happens in pulsatile bursts tied to the first slow-wave (deep) sleep episode of the night — a foundational finding from sleep-endocrinology research — and this hormonal environment supports tissue repair and muscle protein synthesis overnight. Just one night of total sleep deprivation has been shown to reduce postprandial muscle protein synthesis and disrupt the cortisol/testosterone balance, a hormonal pattern also seen in overtraining syndrome. Glycogen resynthesis — replenishing the muscle's carbohydrate fuel stores — also occurs primarily during rest periods and can take 24–48 hours to fully complete after a depleting session, which is part of the physiological rationale for built-in rest days.",
    sources: [
      {
        authors: "Sassin JF, Parker DC, Mace JW, et al.",
        year: 1969,
        title: "Human Growth Hormone Release: Relation to Slow-Wave Sleep and Sleep-Waking Cycles",
        journal: "Science",
        url: "https://pubmed.ncbi.nlm.nih.gov/4307378/",
      },
      {
        authors: "Lamon S, Morabito A, Arentson-Lantz E, et al.",
        year: 2021,
        title: "The effect of acute sleep deprivation on skeletal muscle protein synthesis and the hormonal environment",
        journal: "Physiological Reports",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7785053/",
      },
    ],
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
      "Dehydration reduces plasma volume, which increases cardiovascular strain — the heart has to work harder to maintain the same cardiac output, and thermoregulation via sweat evaporation becomes less efficient as fluid reserves drop. Sodium and potassium, lost through sweat, are essential for nerve conduction and fluid balance across cell membranes, which is why electrolyte replacement matters for longer or hotter sessions. The American College of Sports Medicine's position stand identifies a threshold around 2% body-mass loss from fluid deficit as the point where measurable performance decrements reliably appear, worsening further with additional water loss and heat.",
    sources: [
      {
        authors: "Sawka MN, Burke LM, Eichner ER, Maughan RJ, Montain SJ, Stachenfeld NS",
        year: 2007,
        title: "American College of Sports Medicine position stand: Exercise and Fluid Replacement",
        journal: "Medicine & Science in Sports & Exercise",
        url: "https://pubmed.ncbi.nlm.nih.gov/17277604/",
      },
      {
        authors: "Cheuvront SN, Kenefick RW",
        year: 2014,
        title: "Dehydration: Physiology, Assessment, and Performance Effects",
        journal: "Comprehensive Physiology",
        url: "https://pubmed.ncbi.nlm.nih.gov/24692140/",
      },
    ],
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
