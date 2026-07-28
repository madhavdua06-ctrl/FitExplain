import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ModeText } from "@/components/ModeText";
import { TopicChart } from "@/components/topics/TopicChart";
import { Sources, type Source } from "@/components/topics/Sources";

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = await prisma.topic.findUnique({ where: { slug } });
  if (!topic) notFound();

  const sources = (topic.sources ?? []) as unknown as Source[];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/topics"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        All topics
      </Link>
      <span className="mt-4 block text-xs font-semibold uppercase tracking-wide text-emerald-600">
        {topic.category}
      </span>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        {topic.title}
      </h1>
      <div className="mt-6 text-base leading-relaxed text-slate-700 dark:text-slate-300">
        <ModeText
          simple={<p>{topic.simpleContent}</p>}
          scientific={<p>{topic.scientificContent}</p>}
        />
      </div>

      <div className="mt-8">
        <TopicChart slug={topic.slug} />
      </div>

      <Sources sources={sources} />
    </article>
  );
}
