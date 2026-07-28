import Link from "next/link";

export function TopicCard({
  slug,
  title,
  shortDescription,
  category,
}: {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
}) {
  return (
    <Link
      href={`/topics/${slug}`}
      className="block rounded-xl border border-slate-200 p-5 transition hover:border-emerald-600 hover:shadow-sm dark:border-slate-700"
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
        {category}
      </span>
      <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{shortDescription}</p>
    </Link>
  );
}
