import { prisma } from "@/lib/prisma";
import { TopicCard } from "@/components/topics/TopicCard";

export default async function TopicsPage() {
  const topics = await prisma.topic.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
        Research-backed
      </span>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        Fitness Topics
      </h1>
      <p className="mt-2 max-w-xl text-slate-600 dark:text-slate-300">
        Explained simply, or with the underlying science, charts, and cited studies — flip the toggle
        in the header anytime.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            slug={topic.slug}
            title={topic.title}
            shortDescription={topic.shortDescription}
            category={topic.category}
          />
        ))}
      </div>
    </div>
  );
}
