import { redirect } from "next/navigation";

import { logout } from "~/app/dashboard/actions";
import { getSession } from "~/server/auth";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Dashboard</h1>
        <p className="text-xl">
          Logged in as {session.user.email ?? "unknown user"}
        </p>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-full bg-white/10 px-6 py-2 font-semibold transition hover:bg-white/20"
          >
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
