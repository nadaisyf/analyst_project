"use client";

import { useState } from "react";
import Link from "next/link";

import {
  type BookListItem,
  READING_STATUS_LABELS,
} from "~/app/admin/books/schema";

import { DeleteBookDialog } from "./delete-book-dialog";

export function BooksTable({ books }: { books: BookListItem[] }) {
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const deleteTarget =
    books.find((book) => book.id === deleteTargetId) ?? null;

  if (books.length === 0) {
    return (
      <p className="rounded-2xl bg-white/5 px-4 py-12 text-center text-white/60">
        No books yet. Add your first book.
      </p>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-2xl bg-white/5">
        <table className="w-full text-left text-sm">
          <thead className="text-white/60">
            <tr className="border-b border-white/10">
              <th scope="col" className="px-4 py-3 font-medium">
                Title
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Author
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Status
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Added
              </th>
              <th scope="col" className="px-4 py-3 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr
                key={book.id}
                className="border-b border-white/10 last:border-0"
              >
                <td className="px-4 py-3 font-medium">{book.title}</td>
                <td className="px-4 py-3 text-white/80">{book.author}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs">
                    {READING_STATUS_LABELS[book.readingStatus]}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/60">
                  {new Date(book.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/books/${book.id}/edit`}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold transition hover:bg-white/20"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDeleteTargetId(book.id)}
                      className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-200 transition hover:bg-red-500/40"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteTarget ? (
        <DeleteBookDialog
          book={deleteTarget}
          onClose={() => setDeleteTargetId(null)}
        />
      ) : null}
    </>
  );
}
