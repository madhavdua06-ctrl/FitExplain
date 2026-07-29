export interface TopicFact {
  slug: string;
  title: string;
  quickFacts: unknown;
}

export interface DailyFact {
  fact: string;
  topicTitle: string;
  topicSlug: string;
}

function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (24 * 60 * 60 * 1000));
}

export function pickDailyFact(topics: TopicFact[], date: Date): DailyFact | null {
  const flattened: DailyFact[] = [];
  for (const topic of topics) {
    const facts = Array.isArray(topic.quickFacts) ? (topic.quickFacts as string[]) : [];
    for (const fact of facts) {
      flattened.push({ fact, topicTitle: topic.title, topicSlug: topic.slug });
    }
  }
  if (!flattened.length) return null;
  const index = dayOfYear(date) % flattened.length;
  return flattened[index];
}
