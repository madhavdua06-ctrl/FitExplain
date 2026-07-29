import { prisma } from "@/lib/prisma";
import { pickDailyFact } from "@/lib/topics/dailyTip";
import { DailyTipBanner } from "./DailyTipBanner";

export async function DailyTip() {
  const topics = await prisma.topic.findMany({
    select: { slug: true, title: true, quickFacts: true },
  });
  const daily = pickDailyFact(topics, new Date());
  if (!daily) return null;

  return <DailyTipBanner fact={daily.fact} topicTitle={daily.topicTitle} topicSlug={daily.topicSlug} />;
}
