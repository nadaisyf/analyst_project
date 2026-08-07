import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
};

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center">
      <h2 className="text-2xl font-semibold">{title}</h2>

      <p className="mt-2 text-white/60">
        {description}
      </p>

      <Link
        href={actionHref}
        className="mt-6 inline-block rounded-full bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-500"
      >
        {actionLabel}
      </Link>
    </div>
  );
}