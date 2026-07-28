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
    keyTakeaways: [
      "Increase the challenge gradually — more weight, reps, or sets — every 1-2 weeks.",
      "Track your workouts so you actually know if you're progressing.",
      "Small, consistent increases beat occasional huge jumps.",
    ],
    commonMistakes: [
      {
        mistake: "Chasing heavier weight every single session",
        fix: "Progress every 1-2 weeks instead — your body needs time to adapt, and rushing raises injury risk.",
      },
      {
        mistake: "Never tracking your workouts",
        fix: "Log your sets, reps, and weight so you can tell whether you're actually overloading or just repeating the same session.",
      },
      {
        mistake: "Only adding weight, never reps or sets",
        fix: "Overload can come from more weight, more reps, more sets, or less rest — mix it up when a straight weight increase stalls.",
      },
    ],
    faqs: [
      {
        question: "How often should I increase the weight?",
        answer:
          "Roughly every 1-2 weeks for most lifters, once you can comfortably complete all your target reps with good form.",
      },
      {
        question: "What if I can't add weight to the bar?",
        answer: "Add a rep, add a set, slow down the tempo, or shorten rest between sets — all count as overload.",
      },
      {
        question: "Can beginners progress faster?",
        answer:
          "Yes — beginners often add weight nearly every session for the first few months (often called \"newbie gains\") before progress naturally slows.",
      },
    ],
    quiz: [
      {
        question: "What is progressive overload?",
        options: [
          "Lifting the heaviest weight possible every session",
          "Gradually increasing training demands over time",
          "Doing more cardio each week",
          "Eating more calories than you burn",
        ],
        correctIndex: 1,
        explanation:
          "Progressive overload means gradually increasing the challenge — weight, reps, sets, or other variables — so your body keeps adapting.",
      },
      {
        question: "Which of these counts as progressive overload?",
        options: [
          "Only increasing the weight on the bar",
          "Increasing weight, reps, sets, OR reducing rest between sets",
          "Doing the exact same workout every week",
          "Training to complete failure every set",
        ],
        correctIndex: 1,
        explanation: "Overload can come from several variables, not just added weight.",
      },
      {
        question: "What happens without a rising training stimulus?",
        options: [
          "Continuous improvement forever",
          "A plateau — no signal to keep adapting",
          "Immediate muscle loss",
          "Increased VO2 max only",
        ],
        correctIndex: 1,
        explanation:
          "Without an increasing stimulus, your body has no reason to keep adapting, and progress plateaus.",
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
    keyTakeaways: [
      "Spread protein across 3-4 meals a day rather than loading it all into one.",
      "Aim for roughly 0.3g/kg of protein per meal for a good MPS response.",
      "Resistance training plus adequate protein is what drives net muscle growth.",
    ],
    commonMistakes: [
      {
        mistake: "Eating most protein at dinner only",
        fix: "Spread protein across 3-4 meals — even distribution produces more muscle protein synthesis over 24 hours than the same total skewed to one meal.",
      },
      {
        mistake: "Thinking you need protein within a rigid 30-minute \"anabolic window\"",
        fix: "Total daily protein and consistent distribution matter far more than perfect meal timing around a workout.",
      },
      {
        mistake: "Under-eating protein while cutting calories",
        fix: "Protein needs go up, not down, during a calorie deficit to protect muscle mass.",
      },
    ],
    faqs: [
      {
        question: "Do I need protein immediately after my workout?",
        answer:
          "It helps, but the \"anabolic window\" is much wider than once thought — a meal within a few hours works fine.",
      },
      {
        question: "Can I get all my protein from one big meal?",
        answer:
          "You technically can hit your total, but spreading it across the day produces a better 24-hour muscle protein synthesis response.",
      },
      {
        question: "Is plant protein as effective as animal protein?",
        answer:
          "Plant proteins can work well but are often lower in leucine per gram — eating a bit more, or combining sources, closes the gap.",
      },
    ],
    quiz: [
      {
        question: "About how much protein per meal is generally needed to maximally trigger MPS?",
        options: ["0.05-0.1g/kg", "0.3g/kg", "1g/kg", "No amount matters, only total daily protein"],
        correctIndex: 1,
        explanation:
          "Roughly 0.3g/kg per meal is a commonly cited estimate for maximizing the MPS response, though it varies by study and body size.",
      },
      {
        question: "What did the research on protein distribution find?",
        options: [
          "Timing doesn't matter at all",
          "Spreading protein across 3-4 meals produced higher 24-hour MPS than concentrating it",
          "Only nighttime protein counts",
          "Protein distribution only matters for endurance athletes",
        ],
        correctIndex: 1,
        explanation:
          "Studies on protein distribution (e.g. Mamerow et al. 2014) found even spacing produced meaningfully higher 24-hour MPS.",
      },
      {
        question: "Muscle growth is the net result of...",
        options: ["MPS alone", "MPB alone", "MPS exceeding MPB over time", "Cardio training"],
        correctIndex: 2,
        explanation:
          "Growth happens when muscle protein synthesis (MPS) consistently outpaces muscle protein breakdown (MPB).",
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
    keyTakeaways: [
      "A moderate, sustainable deficit beats an extreme crash diet for keeping weight off.",
      "Higher protein during a deficit helps preserve muscle while losing fat.",
      "Expect weight loss to slow over time — that's normal metabolic adaptation, not failure.",
    ],
    commonMistakes: [
      {
        mistake: "Cutting calories too aggressively",
        fix: "Large deficits are hard to sustain and cost more muscle — aim for a moderate ~15-20% deficit instead.",
      },
      {
        mistake: "Not adjusting as you lose weight",
        fix: "As you get lighter, your maintenance calories drop too — periodically recalculate your target.",
      },
      {
        mistake: "Ignoring protein while cutting calories",
        fix: "Low protein during a deficit accelerates muscle loss — keep protein intake high even as total calories drop.",
      },
    ],
    faqs: [
      {
        question: "Why did my weight loss stall even though I haven't changed anything?",
        answer:
          "This is adaptive thermogenesis — your metabolism slows somewhat as you lose weight and adapt to a sustained deficit. It's normal, not a sign you're doing something wrong.",
      },
      {
        question: "How big should my deficit be?",
        answer:
          "A moderate ~15-20% deficit below maintenance is generally more sustainable and better preserves muscle than an extreme deficit.",
      },
      {
        question: "Does the exact ratio of carbs/fat matter for weight loss?",
        answer:
          "Total calories matter far more than the split between carbs and fat for weight loss itself — a major 2-year randomized trial found little difference between diet compositions when calories were controlled.",
      },
    ],
    quiz: [
      {
        question: "What is adaptive thermogenesis?",
        options: [
          "A type of cardio workout",
          "A disproportionate drop in metabolic rate during sustained dieting",
          "A supplement that boosts metabolism",
          "A form of muscle damage",
        ],
        correctIndex: 1,
        explanation:
          "Adaptive thermogenesis is a metabolic slowdown beyond what reduced body mass alone predicts — part of why weight loss often stalls.",
      },
      {
        question: "What helps preserve lean mass during a calorie deficit?",
        options: ["Eating less protein", "Eating more protein", "Avoiding all exercise", "Eating at random times"],
        correctIndex: 1,
        explanation:
          "Higher protein intake during a deficit has been shown to better preserve (or even increase) lean mass compared to a lower-protein deficit.",
      },
      {
        question: "According to a major 2-year randomized trial, what mattered most for weight loss?",
        options: [
          "The exact carb/fat/protein ratio",
          "Total calorie intake, more than macronutrient ratio",
          "Only doing cardio",
          "Eating only at night",
        ],
        correctIndex: 1,
        explanation: "The POUNDS LOST trial found diet composition made little difference when total calories were matched.",
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
    keyTakeaways: [
      "VO2 max reflects how efficiently your body delivers and uses oxygen during hard exercise.",
      "Both steady-state (zone 2) and interval training (HIIT) improve VO2 max, in different ways.",
      "Higher cardiorespiratory fitness is one of the strongest predictors of long-term health outcomes.",
    ],
    commonMistakes: [
      {
        mistake: "Only doing one type of cardio",
        fix: "Combine zone-2 (steady, sustainable) training with occasional higher-intensity intervals for well-rounded improvements.",
      },
      {
        mistake: "Assuming VO2 max only matters for athletes",
        fix: "Research links higher cardiorespiratory fitness to lower all-cause mortality risk for everyone, not just competitive athletes.",
      },
      {
        mistake: "Going all-out every session",
        fix: "Most of your cardio volume should be at a conversational, sustainable pace — reserve high intensity for a session or two per week.",
      },
    ],
    faqs: [
      {
        question: "Can I improve my VO2 max at any age?",
        answer:
          "Yes — cardiorespiratory fitness responds to training throughout life, though the rate of improvement and ceiling vary with age and starting point.",
      },
      {
        question: "Is HIIT better than steady-state cardio for VO2 max?",
        answer:
          "They improve different underlying adaptations — HIIT tends to boost central adaptations (like stroke volume) more efficiently, while zone-2 builds peripheral/mitochondrial capacity. Most programs benefit from both.",
      },
      {
        question: "How is VO2 max measured?",
        answer:
          "Precisely, via a lab treadmill or bike test measuring oxygen consumption at maximal effort. Wearables estimate it, often less precisely, from heart rate and pace data.",
      },
    ],
    quiz: [
      {
        question: "What does the Fick equation describe?",
        options: [
          "Muscle protein synthesis rate",
          "VO2 max as cardiac output × arteriovenous oxygen difference",
          "Caloric deficit calculations",
          "Sleep cycle stages",
        ],
        correctIndex: 1,
        explanation: "The Fick equation breaks VO2 max into central (cardiac output) and peripheral (oxygen extraction) components.",
      },
      {
        question: "A large cohort study of US veterans found that higher cardiorespiratory fitness was linked to...",
        options: [
          "No difference in health outcomes",
          "Lower all-cause mortality across every age, race, and sex group studied",
          "Only better athletic performance",
          "Higher injury risk",
        ],
        correctIndex: 1,
        explanation:
          "The Kokkinos et al. 2022 study of over 750,000 veterans found fitness inversely associated with mortality risk across every group studied.",
      },
      {
        question: "Which training style primarily builds peripheral/mitochondrial adaptations?",
        options: [
          "Heavy powerlifting",
          "Zone-2, low-intensity sustainable training",
          "Static stretching",
          "Maximal 1-rep attempts",
        ],
        correctIndex: 1,
        explanation:
          "Zone-2 training primarily builds peripheral capacity — capillary density, mitochondrial density, and fat oxidation efficiency.",
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
    keyTakeaways: [
      "Muscle repair happens during rest and sleep, not during the workout itself.",
      "Growth hormone release is concentrated in the first slow-wave sleep episodes of the night.",
      "Skipping sleep or rest days undercuts training progress, not just how you feel.",
    ],
    commonMistakes: [
      {
        mistake: "Training hard every single day with no rest days",
        fix: "Build in at least one full rest day — that's when your body actually completes repair and glycogen resynthesis.",
      },
      {
        mistake: "Sacrificing sleep to fit in an extra workout",
        fix: "One night of poor sleep measurably reduces muscle protein synthesis the next day — protecting sleep protects your training results.",
      },
      {
        mistake: "Ignoring recovery when progress stalls",
        fix: "A plateau is often a recovery problem, not a training problem — check sleep and rest days before adding more volume.",
      },
    ],
    faqs: [
      {
        question: "How much sleep do I actually need for recovery?",
        answer: "Most adults need 7-9 hours; athletes and heavy trainees often do better toward the higher end of that range.",
      },
      {
        question: "Is it bad to train the same muscle group two days in a row?",
        answer:
          "Generally yes for hard resistance training — muscles typically need 24-48 hours to recover and complete glycogen resynthesis after a depleting session.",
      },
      {
        question: "Does poor sleep really affect muscle growth, not just energy?",
        answer:
          "Yes — even a single night of total sleep deprivation has been shown to measurably reduce muscle protein synthesis and disrupt the cortisol/testosterone balance.",
      },
    ],
    quiz: [
      {
        question: "When is the majority of growth hormone released during sleep?",
        options: [
          "Evenly throughout the night",
          "In pulsatile bursts tied to the first slow-wave sleep episode",
          "Only in the last hour before waking",
          "During REM sleep only",
        ],
        correctIndex: 1,
        explanation:
          "Foundational sleep-endocrinology research found GH release concentrated around the first slow-wave sleep episode of the night.",
      },
      {
        question: "What did one night of total sleep deprivation do in controlled research?",
        options: [
          "Nothing measurable",
          "Reduced next-day muscle protein synthesis and disrupted hormone balance",
          "Increased muscle growth",
          "Improved recovery speed",
        ],
        correctIndex: 1,
        explanation:
          "Research found a single night of total sleep deprivation reduced postprandial muscle protein synthesis and disrupted cortisol/testosterone balance.",
      },
      {
        question: "Roughly how long does glycogen resynthesis take after a depleting session?",
        options: ["10 minutes", "1-2 hours", "24-48 hours", "2 weeks"],
        correctIndex: 2,
        explanation: "Full glycogen resynthesis typically takes 24-48 hours, part of the rationale for built-in rest days.",
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
    keyTakeaways: [
      "Even mild dehydration (around 2% body-mass loss) can measurably hurt performance.",
      "Drink steadily through the day rather than loading up right before training.",
      "Sodium and potassium matter for longer or hotter sessions, not just plain water.",
    ],
    commonMistakes: [
      {
        mistake: "Only drinking water when you feel thirsty",
        fix: "Thirst lags behind actual fluid deficit — drink steadily through the day instead of waiting to feel thirsty.",
      },
      {
        mistake: "Chugging a large volume of water right before training",
        fix: "Hydrate steadily in the hours leading up to a session rather than all at once immediately beforehand.",
      },
      {
        mistake: "Ignoring electrolytes on long or hot sessions",
        fix: "Sodium and potassium losses through sweat matter for nerve conduction and fluid balance on longer or hotter workouts — plain water alone may not be enough.",
      },
    ],
    faqs: [
      {
        question: "How do I know if I'm dehydrated?",
        answer:
          "Practical signs include dark urine, unusual fatigue, and a harder-than-expected effort at a normal pace — a simple check is weighing yourself before/after a session to estimate fluid loss.",
      },
      {
        question: "Do I need a sports drink, or is water enough?",
        answer:
          "For sessions under about an hour, water is usually enough. For longer or hotter sessions, electrolytes (sodium especially) become more important.",
      },
      {
        question: "How much does dehydration actually affect performance?",
        answer:
          "ACSM identifies roughly 2% body-mass water loss as the threshold where performance decrements reliably appear, worsening further with more loss and heat.",
      },
    ],
    quiz: [
      {
        question: "What body-mass water loss threshold is commonly linked to measurable performance decrements?",
        options: ["0.5%", "~2%", "10%", "There is no such threshold"],
        correctIndex: 1,
        explanation:
          "ACSM's position stand identifies roughly 2% body-mass loss from fluid deficit as the point where performance decrements reliably appear.",
      },
      {
        question: "Why does dehydration increase cardiovascular strain?",
        options: [
          "It has no cardiovascular effect",
          "Reduced plasma volume makes the heart work harder to maintain cardiac output",
          "It only affects digestion",
          "It lowers heart rate",
        ],
        correctIndex: 1,
        explanation: "Dehydration reduces plasma volume, forcing the heart to work harder to maintain the same cardiac output.",
      },
      {
        question: "When do electrolytes (sodium/potassium) matter most?",
        options: [
          "Never, water is always sufficient",
          "Only during sleep",
          "Longer or hotter training sessions with significant sweat loss",
          "Only for strength training",
        ],
        correctIndex: 2,
        explanation: "Electrolyte replacement becomes more important for longer or hotter sessions with substantial sweat loss.",
      },
    ],
  },
  {
    slug: "supplements-that-work",
    title: "Creatine & Supplements That Work",
    shortDescription: "Cutting through the supplement noise — what's actually backed by evidence.",
    category: "nutrition",
    order: 7,
    simpleContent:
      "Walk into any supplement store and you'll see hundreds of products promising huge results. The truth is way simpler: almost all of that shelf space is unnecessary. Only a small handful of supplements have strong, repeated evidence behind them — creatine and caffeine are the two clearest examples. Creatine helps you produce a bit more strength and power in the gym, which adds up to better results over time. Caffeine gives you a genuine, measurable boost in how hard and long you can push. Everything else is either unproven, marginal, or just expensive flavored powder.",
    scientificContent:
      "Creatine monohydrate increases phosphocreatine stores in skeletal muscle, allowing faster ATP regeneration during high-intensity efforts — the International Society of Sports Nutrition's position stand concludes it is the most effective legal ergogenic nutritional supplement currently available for increasing high-intensity exercise capacity and lean body mass. Caffeine acts primarily as an adenosine receptor antagonist, reducing perceived exertion and increasing central nervous system drive; an umbrella review of 21 meta-analyses confirmed ergogenic effects on strength, power, and endurance performance across a wide range of doses and populations. Most other marketed supplements (isolated BCAAs, fat burners, testosterone boosters) lack comparable independent replication.",
    sources: [
      {
        authors: "Kreider RB, Kalman DS, Antonio J, et al.",
        year: 2017,
        title:
          "International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine",
        journal: "Journal of the International Society of Sports Nutrition",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5469049/",
      },
      {
        authors: "Grgic J, Grgic I, Pickering C, Schoenfeld BJ, Bishop DJ, Pedisic Z",
        year: 2020,
        title:
          "Wake up and smell the coffee: caffeine supplementation and exercise performance — an umbrella review of 21 published meta-analyses",
        journal: "British Journal of Sports Medicine",
        url: "https://pubmed.ncbi.nlm.nih.gov/30926628/",
      },
    ],
    keyTakeaways: [
      "Creatine and caffeine have by far the strongest evidence of any exercise supplements.",
      "Most other marketed supplements lack comparable independent research support.",
      "Supplements provide a small edge on top of training and nutrition — not a substitute for either.",
    ],
    commonMistakes: [
      {
        mistake: "Buying expensive supplement stacks with unproven ingredients",
        fix: "Prioritize the few supplements with strong, repeated evidence — creatine and caffeine — before spending on anything else.",
      },
      {
        mistake: "Cycling on/off creatine unnecessarily",
        fix: "Consistent daily use (no need to cycle) maintains elevated muscle phosphocreatine stores.",
      },
      {
        mistake: "Expecting supplements to replace training and diet",
        fix: "Supplements provide a small edge on top of solid training and nutrition — they don't substitute for either.",
      },
    ],
    faqs: [
      {
        question: "Do I need to \"load\" creatine?",
        answer:
          "A loading phase (~20g/day for a week) saturates muscle stores faster, but a steady 3-5g/day reaches the same saturation within about a month.",
      },
      {
        question: "Is creatine safe long-term?",
        answer:
          "Research, including the ISSN position stand, has not found evidence of harm in healthy individuals at recommended doses over years of use.",
      },
      {
        question: "How much caffeine is an effective dose?",
        answer:
          "Research generally supports roughly 3-6mg/kg of bodyweight taken 30-60 minutes before exercise, though individual tolerance varies substantially.",
      },
    ],
    quiz: [
      {
        question: "Which two supplements have the strongest research backing for exercise performance?",
        options: [
          "BCAAs and fat burners",
          "Creatine and caffeine",
          "Testosterone boosters and BCAAs",
          "None of them work",
        ],
        correctIndex: 1,
        explanation: "Creatine and caffeine are the two supplements with the most consistent, repeated evidence of benefit.",
      },
      {
        question: "How does creatine primarily help performance?",
        options: [
          "It burns fat directly",
          "It increases phosphocreatine stores, speeding ATP regeneration for high-intensity efforts",
          "It replaces the need for protein",
          "It works only for endurance athletes",
        ],
        correctIndex: 1,
        explanation: "Creatine increases phosphocreatine stores, allowing faster ATP regeneration during high-intensity work.",
      },
      {
        question: "How does caffeine mainly improve performance?",
        options: [
          "By providing calories for energy",
          "By blocking adenosine receptors, reducing perceived exertion",
          "By building muscle directly",
          "By replacing electrolytes",
        ],
        correctIndex: 1,
        explanation: "Caffeine acts as an adenosine receptor antagonist, reducing perceived exertion and increasing CNS drive.",
      },
    ],
  },
  {
    slug: "macronutrients-101",
    title: "Macronutrients 101",
    shortDescription: "What protein, carbs, and fat actually do — and why the ratio matters less than you think.",
    category: "nutrition",
    order: 8,
    simpleContent:
      "Protein, carbs, and fat are the three \"macronutrients\" that make up almost everything you eat. Protein builds and repairs tissue (like muscle). Carbs are your body's preferred quick-energy source, especially for hard exercise. Fat supports hormone production and long-term energy storage. Here's the surprising part: a big 2-year study found that the exact ratio between them mattered far less for weight loss than simply eating fewer calories overall. That doesn't mean ratios don't matter at all — protein especially matters for muscle — but you don't need to fear carbs or fat to reach your goals.",
    scientificContent:
      "Protein (4 kcal/g) supplies amino acids for tissue repair and enzyme/hormone synthesis; carbohydrate (4 kcal/g) is the preferred substrate for high-intensity exercise via glycolysis and glycogen storage; fat (9 kcal/g) supports steroid hormone synthesis, cell membrane structure, and long-duration energy supply. A landmark 2-year randomized controlled trial (the POUNDS LOST study, n=811) comparing diets with different fat/protein/carbohydrate compositions but matched calorie targets found no significant difference in weight loss between compositions — total energy balance, not macronutrient ratio, was the dominant driver of weight change. This doesn't eliminate the case for protein specifically, which independently affects satiety and lean-mass retention, but it does undercut claims that a specific carb/fat ratio is uniquely \"fat-burning.\"",
    sources: [
      {
        authors: "Institute of Medicine, Food and Nutrition Board",
        year: 2005,
        title:
          "Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, Cholesterol, Protein, and Amino Acids (Macronutrients)",
        journal: "National Academies Press",
        url: "https://www.nationalacademies.org/read/10490",
      },
      {
        authors: "Sacks FM, Bray GA, Carey VJ, et al.",
        year: 2009,
        title: "Comparison of Weight-Loss Diets with Different Compositions of Fat, Protein, and Carbohydrates",
        journal: "New England Journal of Medicine",
        url: "https://pubmed.ncbi.nlm.nih.gov/19246357/",
      },
    ],
    keyTakeaways: [
      "Protein and carbs = 4 kcal/g, fat = 9 kcal/g.",
      "Total calories matter more than macronutrient ratio for weight change.",
      "Protein is the exception — it matters independently for satiety and muscle retention.",
    ],
    commonMistakes: [
      {
        mistake: "Fearing carbs or fat entirely",
        fix: "Total calories matter far more for weight change than the ratio between carbs and fat — cutting a whole macro group isn't necessary for most goals.",
      },
      {
        mistake: "Ignoring protein because \"macros are all the same\"",
        fix: "Protein is the exception — it independently affects satiety and muscle retention regardless of the calorie/ratio debate.",
      },
      {
        mistake: "Assuming a diet \"ratio\" has magic fat-burning properties",
        fix: "A 2-year, 811-person trial found little difference in weight loss between compositions when calories were matched.",
      },
    ],
    faqs: [
      {
        question: "Is a low-carb diet better for fat loss?",
        answer:
          "Not inherently — when total calories are matched, research shows little difference between low-carb and other compositions for weight loss.",
      },
      {
        question: "Do I need to eat fat to lose fat?",
        answer:
          "You need some dietary fat for hormone health, but not a specific ratio — the deciding factor for weight is overall calorie balance.",
      },
      {
        question: "Why does protein get special treatment if ratios don't matter much?",
        answer:
          "Protein uniquely affects satiety and muscle retention during a deficit, independent of the ratio-vs-weight-loss finding — it's the exception, not the rule.",
      },
    ],
    quiz: [
      {
        question: "How many kcal are in one gram of fat?",
        options: ["4", "7", "9", "0"],
        correctIndex: 2,
        explanation: "Fat provides 9 kcal per gram, more than double protein or carbohydrate.",
      },
      {
        question: "What did the POUNDS LOST 2-year trial find about macronutrient ratios and weight loss?",
        options: [
          "Low-carb was clearly best",
          "Ratio mattered little when total calories were matched",
          "High-fat diets caused weight gain regardless of calories",
          "Protein ratio had no effect on anything",
        ],
        correctIndex: 1,
        explanation: "The 811-person trial found little difference in weight loss between compositions when calories were matched.",
      },
      {
        question: "Which macronutrient is the body's preferred fuel for high-intensity exercise?",
        options: ["Fat", "Protein", "Carbohydrate", "None — the body uses only stored fat"],
        correctIndex: 2,
        explanation: "Carbohydrate is the preferred substrate for high-intensity exercise via glycolysis and glycogen storage.",
      },
    ],
  },
  {
    slug: "doms-muscle-soreness",
    title: "DOMS & Muscle Soreness",
    shortDescription: "Why you're sore a day later — and what actually helps (hint: not the lactic acid myth).",
    category: "recovery",
    order: 9,
    simpleContent:
      "That deep soreness you feel 24-48 hours after a hard workout is called DOMS — delayed onset muscle soreness. Despite what you might have heard, it's not caused by lactic acid buildup (that clears within about an hour of finishing exercise). It's actually from tiny amounts of muscle micro-damage and the inflammation that follows as your body repairs it. Some soreness is a normal part of training, especially with a new exercise, but it's not a requirement for progress — plenty of effective, productive workouts leave you barely sore. Light movement, massage, and time are what actually help it fade faster.",
    scientificContent:
      "DOMS results from mechanical microtrauma to muscle fibers and connective tissue during unaccustomed or eccentric-heavy loading, followed by a local inflammatory response — not lactic acid, which clears from muscle tissue within roughly an hour of exercise cessation. Peak soreness typically occurs 24-72 hours post-exercise. A systematic review and meta-analysis of randomized trials found massage therapy meaningfully reduced DOMS intensity compared to control conditions, supporting mechanical/manual recovery modalities (massage, and by extension self-myofascial release like foam rolling) as effective interventions, alongside light active recovery.",
    sources: [
      {
        authors: "Cleak MJ, Eston RG",
        year: 1992,
        title: "Delayed onset muscle soreness: mechanisms and management",
        journal: "Journal of Sports Sciences",
        url: "https://pubmed.ncbi.nlm.nih.gov/1518094/",
      },
      {
        authors: "Guo J, Li L, Gong Y, Zhu R, Xu J, Zou J, Chen X",
        year: 2017,
        title: "Massage Alleviates Delayed Onset Muscle Soreness after Strenuous Exercise: A Systematic Review and Meta-Analysis",
        journal: "Frontiers in Physiology",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5623674/",
      },
    ],
    keyTakeaways: [
      "DOMS comes from muscle micro-damage and inflammation, not lactic acid.",
      "Peak soreness usually hits 24-72 hours after a hard or unfamiliar workout.",
      "Massage and light activity help it fade faster than complete rest.",
    ],
    commonMistakes: [
      {
        mistake: "Believing lactic acid causes next-day soreness",
        fix: "Lactic acid clears within about an hour of finishing exercise — DOMS is from micro-damage and inflammation, showing up a day or two later.",
      },
      {
        mistake: "Thinking no soreness means no progress",
        fix: "Soreness isn't a required signal of an effective workout — many productive sessions leave you barely sore, especially once you're used to an exercise.",
      },
      {
        mistake: "Completely avoiding movement when sore",
        fix: "Light activity (walking, easy cardio) tends to help soreness fade faster than total rest.",
      },
    ],
    faqs: [
      {
        question: "Is it safe to train again while sore?",
        answer:
          "Usually yes, especially training a different muscle group — but very heavy loading on already-sore muscle may increase injury risk, so use judgment.",
      },
      {
        question: "Do stretching and ice baths cure DOMS?",
        answer:
          "Evidence for stretching and ice baths specifically reducing DOMS is weak; massage and light activity have more consistent support.",
      },
      {
        question: "Why am I sorer after a new exercise than my usual routine?",
        answer:
          "Unaccustomed movements, especially with a lot of eccentric (lengthening) muscle action, cause more microtrauma — your body adapts and soreness lessens with repeated exposure.",
      },
    ],
    quiz: [
      {
        question: "What actually causes DOMS?",
        options: [
          "Lactic acid buildup",
          "Micro-damage to muscle fibers and the resulting inflammation",
          "Dehydration",
          "Low blood sugar",
        ],
        correctIndex: 1,
        explanation: "DOMS comes from mechanical microtrauma and the inflammatory response that follows, not lactic acid.",
      },
      {
        question: "When does DOMS typically peak?",
        options: [
          "Immediately during exercise",
          "30 minutes after exercise",
          "24-72 hours after exercise",
          "2 weeks after exercise",
        ],
        correctIndex: 2,
        explanation: "Peak soreness typically occurs 24-72 hours after the triggering exercise.",
      },
      {
        question: "What does research show helps reduce DOMS intensity?",
        options: [
          "Complete bed rest for a week",
          "Massage / manual therapy",
          "Avoiding all future exercise",
          "Ice baths only, nothing else works",
        ],
        correctIndex: 1,
        explanation: "A meta-analysis of randomized trials found massage therapy meaningfully reduced DOMS intensity.",
      },
    ],
  },
  {
    slug: "habit-formation",
    title: "Habit Formation & Adherence",
    shortDescription: "Why \"21 days to a habit\" is a myth — and what the real research says.",
    category: "mindset",
    order: 10,
    simpleContent:
      "You've probably heard it takes 21 days to build a habit. That number isn't real — it traces back to a mistaken reading of an old book, not actual habit research. A real study that tracked people building a new daily habit found it took a median of 66 days for a behavior to start feeling automatic — anywhere from about 18 to 254 days depending on the person and the habit. The takeaway: don't expect a workout routine to feel effortless after three weeks. Consistency over months, not weeks, is what actually makes exercise become second nature.",
    scientificContent:
      "The commonly cited \"21 days\" habit-formation figure has no basis in behavioral science research; it originated from a misreading of a 1960s self-help book. Controlled research (Lally et al. 2010) tracking 96 participants building a self-selected daily habit over 12 weeks found automaticity increased along an asymptotic curve, plateauing at a median of 66 days, with substantial individual variation (range 18-254 days) depending on behavior complexity and the person. Separately, self-determination theory research on exercise adherence finds autonomous motivation (exercising because you value it, not just external pressure) is a consistent predictor of long-term adherence, more so than motivation driven purely by guilt or external reward.",
    sources: [
      {
        authors: "Lally P, van Jaarsveld CHM, Potts HWW, Wardle J",
        year: 2010,
        title: "How are habits formed: Modelling habit formation in the real world",
        journal: "European Journal of Social Psychology",
        url: "https://onlinelibrary.wiley.com/doi/abs/10.1002/ejsp.674",
      },
      {
        authors: "Teixeira PJ, Carraça EV, Markland D, Silva MN, Ryan RM",
        year: 2012,
        title: "Exercise, physical activity, and self-determination theory: a systematic review",
        journal: "International Journal of Behavioral Nutrition and Physical Activity",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3441783/",
      },
    ],
    keyTakeaways: [
      "The \"21 days\" habit myth isn't based on real research.",
      "Real studies show a median of 66 days for a habit to feel automatic.",
      "Autonomous motivation — valuing the activity itself — predicts long-term adherence better than willpower alone.",
    ],
    commonMistakes: [
      {
        mistake: "Giving up because a routine doesn't feel automatic after 3 weeks",
        fix: "Real research shows automaticity takes a median of 66 days — give a new routine months, not weeks.",
      },
      {
        mistake: "Relying purely on willpower or guilt to stay consistent",
        fix: "Autonomous motivation — finding a personal reason you actually value — predicts long-term adherence better than external pressure.",
      },
      {
        mistake: "Trying to change too many habits at once",
        fix: "Habit research generally studied one behavior at a time — stacking several new habits simultaneously makes each one harder to establish.",
      },
    ],
    faqs: [
      {
        question: "Is 21 days really not enough to build a habit?",
        answer:
          "Correct — that number isn't from real habit-formation research. A controlled study found a median of 66 days, with a wide range depending on the person and behavior.",
      },
      {
        question: "What makes a habit easier to build?",
        answer:
          "Simpler behaviors, consistent context/timing cues, and autonomous motivation (doing it because you value it) all help automaticity develop faster.",
      },
      {
        question: "Does missing one day ruin a habit in progress?",
        answer:
          "The original research found occasional missed days didn't meaningfully affect the overall habit-formation curve — consistency over time matters more than a single miss.",
      },
    ],
    quiz: [
      {
        question: "Where did the \"21 days to build a habit\" myth actually come from?",
        options: [
          "A large clinical trial",
          "A misreading of an old self-help book, not real research",
          "The World Health Organization",
          "A study specifically on exercise habits",
        ],
        correctIndex: 1,
        explanation: "The 21-day figure traces back to a misreading of a 1960s self-help book, not controlled research.",
      },
      {
        question: "In a real controlled study, how long did it take habits to become automatic on average?",
        options: ["3 days", "21 days", "A median of 66 days", "2 years"],
        correctIndex: 2,
        explanation: "Lally et al. (2010) found a median of 66 days, ranging from 18 to 254 days.",
      },
      {
        question: "What consistently predicts long-term exercise adherence in research?",
        options: [
          "Only external rewards like money",
          "Autonomous motivation — valuing the activity itself",
          "Punishment for missing a session",
          "Nothing predicts adherence",
        ],
        correctIndex: 1,
        explanation: "Self-determination theory research finds autonomous motivation is a consistent predictor of long-term adherence.",
      },
    ],
  },
  {
    slug: "injury-prevention",
    title: "Injury Prevention & Joint Health",
    shortDescription: "The training habits research links to fewer injuries — not just stretching.",
    category: "training",
    order: 11,
    simpleContent:
      "A lot of people think injury prevention is mostly about stretching before a workout. The strongest evidence actually points somewhere else: strength training itself. Studies tracking thousands of athletes found that those doing regular strength training had less than a third of the injuries compared to those who didn't. A proper warm-up still matters too — a structured program of dynamic movements has been shown to meaningfully cut down on the more severe injuries, even if it doesn't eliminate every minor one. The takeaway: consistent strength work is one of the best injury-prevention tools available, and warming up properly adds another layer of protection.",
    scientificContent:
      "A systematic review and meta-analysis of randomized controlled trials (Lauersen et al. 2014, n=26,610) found strength training reduced sports injuries to less than one-third the rate seen in control groups — one of the strongest effects documented in the injury-prevention literature, exceeding the effect sizes seen for stretching or proprioception training alone. Separately, a large cluster-randomized trial of a structured dynamic warm-up program (Soligard et al. 2008, 125 clubs) found it significantly reduced severe and overuse injuries in young athletes, though it did not significantly reduce the overall rate of all lower-extremity injuries — meaning warm-ups appear to meaningfully reduce the most serious injury types specifically, rather than eliminating minor ones.",
    sources: [
      {
        authors: "Lauersen JB, Bertelsen DM, Andersen LB",
        year: 2014,
        title:
          "The effectiveness of exercise interventions to prevent sports injuries: a systematic review and meta-analysis of randomised controlled trials",
        journal: "British Journal of Sports Medicine",
        url: "https://pubmed.ncbi.nlm.nih.gov/24100287/",
      },
      {
        authors: "Soligard T, Myklebust G, Steffen K, et al.",
        year: 2008,
        title:
          "Comprehensive warm-up programme to prevent injuries in young female footballers: cluster randomised controlled trial",
        journal: "BMJ",
        url: "https://pubmed.ncbi.nlm.nih.gov/19066253/",
      },
    ],
    keyTakeaways: [
      "Strength training has one of the strongest injury-prevention effects documented in research.",
      "A structured dynamic warm-up reduces severe and overuse injuries specifically.",
      "No single intervention eliminates injury risk entirely — layer strength training, warm-ups, and sensible progression.",
    ],
    commonMistakes: [
      {
        mistake: "Relying only on stretching for injury prevention",
        fix: "Strength training has a much larger evidence-backed effect on injury reduction than stretching alone.",
      },
      {
        mistake: "Skipping warm-ups to save time",
        fix: "A structured dynamic warm-up has been shown to meaningfully reduce severe and overuse injuries in large randomized trials.",
      },
      {
        mistake: "Assuming any single measure eliminates all injury risk",
        fix: "Even effective interventions like strength training and warm-ups reduce risk substantially — they don't eliminate it entirely.",
      },
    ],
    faqs: [
      {
        question: "Does strength training really prevent injuries, or just build muscle?",
        answer:
          "Both — a meta-analysis of over 26,000 participants found strength training reduced sports injuries to less than a third of control rates.",
      },
      {
        question: "Is dynamic stretching better than static stretching for warm-ups?",
        answer:
          "Dynamic, movement-based warm-ups are generally preferred before training, since they prepare muscles for the specific movements ahead without the temporary strength reduction sometimes seen after prolonged static stretching.",
      },
      {
        question: "Do warm-ups prevent all injuries?",
        answer:
          "No — research found warm-up programs significantly reduced severe and overuse injuries specifically, but not the overall rate of all injuries.",
      },
    ],
    quiz: [
      {
        question: "According to a meta-analysis of 26,610 participants, how did strength training affect injury rates?",
        options: [
          "No effect",
          "Reduced injuries to less than one-third of control rates",
          "Doubled injury rates",
          "Only helped upper-body injuries",
        ],
        correctIndex: 1,
        explanation: "Lauersen et al. (2014) found strength training reduced injuries to less than a third of control rates.",
      },
      {
        question: "What did the large warm-up trial (Soligard et al.) find?",
        options: [
          "No effect on any injuries",
          "Reduced severe/overuse injuries, though not the overall lower-extremity injury rate",
          "Increased injury risk",
          "Only worked for adults",
        ],
        correctIndex: 1,
        explanation: "The trial found significant reductions in severe and overuse injuries specifically, not all injuries overall.",
      },
      {
        question: "Which is most strongly linked to injury reduction in the research?",
        options: ["Stretching alone", "Strength training", "Avoiding exercise entirely", "Wearing compression gear"],
        correctIndex: 1,
        explanation: "Strength training has one of the largest documented effects on injury reduction.",
      },
    ],
  },
  {
    slug: "resistance-vs-cardio",
    title: "Resistance Training vs. Cardio for Fat Loss",
    shortDescription: "What a head-to-head trial found when comparing training styles for fat loss.",
    category: "training",
    order: 12,
    simpleContent:
      "If you had to pick just one type of exercise for fat loss, which wins — lifting weights or cardio? A clinical trial that directly compared the two (plus a combination) over 22 weeks found that resistance training alone actually produced the biggest drop in body fat percentage, edging out cardio-only and combined training. That said, the differences between groups were fairly modest, and for people who stuck closely to their assigned program, combining both types of training pulled ahead. The real-world answer: either works, but combining strength and cardio training — while keeping your diet in check — tends to be the strongest overall approach.",
    scientificContent:
      "A randomized clinical trial (Sigal et al. 2014, the HEARTY trial, conducted in obese adolescents) directly compared aerobic-only, resistance-only, and combined training over 22 weeks. Intention-to-treat percentage-body-fat changes were: control −0.3%, aerobic-only −1.1%, resistance-only −1.6%, combined −1.4%. Among participants with ≥70% program adherence, combined training outperformed aerobic-only (−2.4% vs −1.2%, p=.04). A separate 2025 systematic review and meta-analysis (Lafontant et al.) found aerobic training outperformed resistance training on absolute fat-mass loss by roughly 1.06kg, and combined training outperformed resistance-only by roughly 1.09kg fat mass, with no significant group differences in body fat percentage specifically — suggesting the exact ranking depends on which outcome measure (percentage vs. absolute mass) and population is examined. Note: HEARTY was conducted in adolescents (14-18y), not general adults, so results should be generalized cautiously.",
    sources: [
      {
        authors: "Sigal RJ, Alberga AS, Goldfield GS, et al.",
        year: 2014,
        title:
          "Effects of Aerobic Training, Resistance Training, or Both on Percentage Body Fat and Cardiometabolic Risk Markers in Obese Adolescents: The HEARTY Randomized Clinical Trial",
        journal: "JAMA Pediatrics",
        url: "https://pubmed.ncbi.nlm.nih.gov/25243536/",
      },
      {
        authors: "Lafontant K, Rukstela A, Hanson A, et al.",
        year: 2025,
        title: "Comparison of concurrent, resistance, or aerobic training on body fat loss: a systematic review and meta-analysis",
        journal: "Journal of the International Society of Sports Nutrition",
        url: "https://www.tandfonline.com/doi/full/10.1080/15502783.2025.2507949",
      },
    ],
    keyTakeaways: [
      "A head-to-head trial found resistance training alone produced the largest body-fat-percentage drop of any single approach.",
      "Combining resistance and aerobic training outperformed either alone among highly adherent participants.",
      "Results come from a trial in obese adolescents — treat as a strong data point, not a universal law for all populations.",
    ],
    commonMistakes: [
      {
        mistake: "Assuming cardio is always necessary for fat loss",
        fix: "A head-to-head trial found resistance training alone produced a comparable or larger body-fat-percentage drop than cardio alone.",
      },
      {
        mistake: "Picking only one training style and ignoring the other entirely",
        fix: "Among highly adherent participants, combining resistance and aerobic training outperformed either alone.",
      },
      {
        mistake: "Applying adolescent-trial results directly to adult programming without caveats",
        fix: "The most detailed head-to-head trial was conducted in obese adolescents — general adult results may differ somewhat.",
      },
    ],
    faqs: [
      {
        question: "So which is better for fat loss, lifting or cardio?",
        answer:
          "A direct trial found resistance training alone produced the largest body-fat-percentage drop, but a broader meta-analysis found aerobic training had a slight edge on absolute fat-mass loss — the honest answer is \"it depends on the outcome measured,\" and combining both is a strong default.",
      },
      {
        question: "Do I need to do cardio if I only want to lose fat, not run faster?",
        answer:
          "Not strictly — resistance training alone produced meaningful fat loss in controlled research — but combining both tends to perform best, especially with good adherence.",
      },
      {
        question: "Does resistance training burn as many calories as cardio during the session?",
        answer:
          "Usually fewer calories per session than sustained cardio, but it preserves and can build muscle, which affects long-term body composition beyond the single-session calorie burn.",
      },
    ],
    quiz: [
      {
        question:
          "In the HEARTY trial (adolescents), which single group had the largest body-fat-percentage reduction (intention-to-treat)?",
        options: ["Control", "Aerobic-only", "Resistance-only", "Combined"],
        correctIndex: 2,
        explanation: "Resistance-only showed the largest ITT reduction (-1.6%), though combined training pulled ahead among highly adherent participants.",
      },
      {
        question: "Among participants with high adherence (≥70%), which approach performed best vs. aerobic-only?",
        options: [
          "Resistance-only performed worse",
          "Combined training significantly outperformed aerobic-only",
          "No group differed",
          "Control performed best",
        ],
        correctIndex: 1,
        explanation: "Among highly adherent participants, combined training significantly outperformed aerobic-only (-2.4% vs -1.2%).",
      },
      {
        question: "What's an important caveat about the HEARTY trial's results?",
        options: [
          "It was conducted in elite athletes",
          "It was conducted in obese adolescents, not general adults",
          "It only lasted 2 weeks",
          "It didn't measure body fat at all",
        ],
        correctIndex: 1,
        explanation: "HEARTY was conducted in obese adolescents (14-18y) — results should be generalized to adults cautiously.",
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
