import Link from "next/link";

import { BooksTable } from "~/app/admin/books/components/books-table";
import { requireUser } from "~/app/admin/books/require-user";
import { db } from "~/server/db";
import { logout } from "~/app/dashboard/actions";

export default async function AdminBooksPage() {
  const user = await requireUser();

  const books = await db.book.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      author: true,
      readingStatus: true,
      createdAt: true,
    },
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">My Shelf</h1>
            <p className="text-white/60">Everything you have been reading, all in one place</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/books/new"
              className="rounded-full bg-white/10 px-5 py-2 font-semibold transition hover:bg-white/20"
            >
             + Add book
            </Link>

            <form action={logout}>
              <button
                type="submit"
                className="rounded-full border border-white/20 px-5 py-2 font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                Sign out
              </button>
            </form>
          </div>
        </header>

        {books.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center">
            <h2 className="text-2xl font-semibold">Your shelf is empty</h2>
            <p className="mt-2 text-white/60">
              Add your first book and start building your reading collection.
            </p>

            <Link
              href="/admin/books/new"
              className="mt-6 inline-block rounded-full bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-500"
            >
              Add your first book
            </Link>
          </div>
        ) : (
          <BooksTable books={books} />
        )}
      </div>
    </main>
  );
}