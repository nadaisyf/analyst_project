import { notFound } from "next/navigation";

import { BookForm } from "~/app/admin/books/components/book-form";
import { updateBook } from "~/app/admin/books/actions";
import { requireUser } from "~/app/admin/books/require-user";
import { db } from "~/server/db";

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireUser();

  const book = await db.book.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      author: true,
      totalPages: true,
      readingStatus: true,
      userId: true,
    },
  });

  if (book?.userId !== user.id) {
    notFound();
  }

  const updateBookWithId = updateBook.bind(null, book.id);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="mx-auto max-w-xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight">
          Edit book
        </h1>
        <BookForm
          action={updateBookWithId}
          submitLabel="Save changes"
          defaultValues={{
            title: book.title,
            author: book.author,
            totalPages: book.totalPages,
            readingStatus: book.readingStatus,
          }}
        />
      </div>
    </main>
  );
}
