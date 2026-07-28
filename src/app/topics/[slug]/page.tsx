import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ModeText } from "@/components/ModeText";

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = await prisma.topic.findUnique({ where: { slug } });
  if (!topic) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 py-12">
      <Link href="/topics" className="text-sm font-medium text-emerald-600 hover:underline">
        ← All topics
      </Link>
      <span className="mt-4 block text-xs font-semibold uppercase tracking-wide text-emerald-600">
        {topic.category}
      </span>
      <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{topic.title}</h1>
      <div className="mt-6 text-base leading-relaxed text-slate-700 dark:text-slate-300">
        <ModeText
          simple={<p>{topic.simpleContent}</p>}
          scientific={<p>{topic.scientificContent}</p>}
        />
      </div>
    </article>
  );
}
