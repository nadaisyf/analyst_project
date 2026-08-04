import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] px-4 text-center text-white">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="mt-4 text-xl">
        <h1>Sorry, we couldn&apos;t find that page.</h1>
      </p>

      <Link
        href="/"
        className="mt-8 rounded-full bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-500"
      >
        Back to Home
      </Link>
    </main>
  );
}