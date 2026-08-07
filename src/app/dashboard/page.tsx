import { redirect } from "next/navigation";

import { getSession } from "~/server/auth";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  redirect("/admin/books");
}