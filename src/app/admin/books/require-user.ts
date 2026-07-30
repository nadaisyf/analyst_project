import { redirect } from "next/navigation";

import { getSession } from "~/server/auth";

/**
 * Ensures the current request is authenticated and returns the session user.
 * Reuses the app's `getSession()` abstraction; redirects unauthenticated
 * requests to /login (mirrors the /dashboard guard).
 */
export async function requireUser() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return session.user;
}
