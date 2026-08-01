import Link from "next/link";

import { BooksTable } from "~/app/admin/books/components/books-table";
import { requireUser } from "~/app/admin/books/require-user";
import { db } from "~/server/db";

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
            <h1 className="text-3xl font-extrabold tracking-tight">Books</h1>
            <p className="text-white/60">Manage your library</p>
          </div>
          <Link
            href="/admin/books/new"
            className="rounded-full bg-white/10 px-5 py-2 font-semibold transition hover:bg-white/20"
          >
            Add book
          </Link>
        </header>

        <BooksTable books={books} />
      </div>
    </main>
  );
}

asdf;

