import Link from "next/link";

import { auth } from "~/server/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1b103f] via-[#2a1b63] to-[#45308d] px-4 text-white">
      <div className="w-full max-w-xl rounded-[32px] border border-white/10 bg-white/10 p-12 text-center shadow-xl backdrop-blur-xl">
        <h1 className="mb-4 text-6xl font-extrabold tracking-tight">
          Shelfery
        </h1>

        <p className="mt-5 text-lg font-light tracking-wide text-white/70">
          {session?.user
            ? `Welcome back, ${session.user.name ?? "reader"}.`
            : "Welcome to your reading era."}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          {session?.user ? (
            <Link
              href="/admin/books"
              className="rounded-full bg-white px-8 py-3 font-semibold text-[#2d1b69] transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              Open My Shelf
            </Link>
          ) : (
            <>
              <Link
                href="/register"
                className="rounded-full bg-white px-8 py-3 font-semibold text-[#2d1b69] transition duration-300 hover:scale-105"
              >
                Start Reading
              </Link>

              <Link
                href="/login"
                className="text-white/70 transition hover:text-white"
              >
                Already have an account? Sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}