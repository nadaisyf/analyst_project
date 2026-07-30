"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteBook } from "~/app/admin/books/actions";
import { type BookListItem } from "~/app/admin/books/schema";

type DeleteBookDialogProps = {
  book: BookListItem;
  onClose: () => void;
};

export function DeleteBookDialog({
  book,
  onClose,
}: DeleteBookDialogProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      const result = await deleteBook(book.id);
      if (result.ok) {
        router.refresh();
        onClose();
      }
    });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-book-title"
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
    >
      <div className="w-full max-w-md rounded-2xl bg-[#15162c] p-6 shadow-xl">
        <h2 id="delete-book-title" className="text-lg font-semibold">
          Delete book?
        </h2>
        <p className="mt-2 text-white/70">
          Are you sure you want to delete <strong>{book.title}</strong>? This
          action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isPending}
            className="rounded-full bg-red-500/80 px-4 py-2 text-sm font-semibold transition hover:bg-red-500 disabled:opacity-50"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
