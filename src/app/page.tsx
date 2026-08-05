import Link from "next/link";

import { auth } from "~/server/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] px-4 text-white">
      <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Shelfery
          </h1>
          
          <p className="text-center text-xl text-white/70">
          {session?.user
          ? `Welcome back, ${session.user.name ?? "reader"}. Ready for your next chapter?`
          : "your reading starts here."}
          </p>

        <div className="flex gap-4">
          {session?.user ? (
            <Link
              href="/dashboard"
              className="rounded-full bg-white/10 px-8 py-3 font-semibold transition hover:bg-white/20"
            >
              Go to dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full bg-white/10 px-8 py-3 font-semibold transition hover:bg-white/20"
              >
                Sign in
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-white/10 px-8 py-3 font-semibold transition hover:bg-white/20"
              >
                Create account
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}