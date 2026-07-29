import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TopicsGrid } from "@/components/topics/TopicsGrid";

export default async function TopicsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  const [topics, progress] = await Promise.all([
    prisma.topic.findMany({ orderBy: { order: "asc" } }),
    session
      ? prisma.topicProgress.findMany({ where: { userId: session.user.id }, select: { topicSlug: true } })
      : Promise.resolve([]),
  ]);
  const completedSlugs = new Set(progress.map((p) => p.topicSlug));

  const topicSummaries = topics.map((topic) => ({
    id: topic.id,
    slug: topic.slug,
    title: topic.title,
    shortDescription: topic.shortDescription,
    category: topic.category,
    completed: completedSlugs.has(topic.slug),
  }));

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <span className="text-xs font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-400">
        Research-backed
      </span>
      <h1 className="mt-1 text-3xl font-bold tracking-tight">
        <span className="text-gradient">Fitness Topics</span>
      </h1>
      <p className="mt-2 max-w-xl text-slate-600 dark:text-slate-300">
        Explained simply, or with the underlying science, charts, and cited studies — flip the toggle
        in the header anytime.
      </p>
      {session ? (
        <p className="mt-2 text-sm font-medium text-cyan-600 dark:text-cyan-400">
          {completedSlugs.size}/{topics.length} completed
        </p>
      ) : null}

      <div className="mt-8">
        <TopicsGrid topics={topicSummaries} />
      </div>
    </div>
  );
}
