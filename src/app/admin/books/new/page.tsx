import { BookForm } from "~/app/admin/books/components/book-form";
import { requireUser } from "~/app/admin/books/require-user";
import { createBook } from "~/app/admin/books/actions";

export default async function NewBookPage() {
  await requireUser();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="mx-auto max-w-xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight">Add book</h1>
        <BookForm action={createBook} submitLabel="Add book" />
      </div>
    </main>
  );
}
