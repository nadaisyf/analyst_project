"use client";

import { useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  type BookActionResult,
  type BookFormErrors,
  type BookFormValues,
  READING_STATUS_OPTIONS,
} from "~/app/admin/books/schema";

type BookFormProps = {
  action: (formData: FormData) => Promise<BookActionResult>;
  defaultValues?: BookFormValues;
  submitLabel?: string;
};

export function BookForm({
  action,
  defaultValues,
  submitLabel = "Save",
}: BookFormProps) {
  const router = useRouter();
  const [errors, setErrors] = useState<BookFormErrors>({});
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setErrors({});

    startTransition(async () => {
      const result = await action(formData);
      if (!result.ok) {
        setErrors(result.errors);
        return;
      }
      router.push("/admin/books");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="text-sm text-white/70">Title</span>
        <input
          name="title"
          type="text"
          defaultValue={defaultValues?.title}
          aria-invalid={Boolean(errors.title)}
          className="rounded-full bg-white/10 px-4 py-2 text-white placeholder:text-white/40"
        />
        {errors.title?.[0] ? (
          <span className="text-sm text-red-300">{errors.title[0]}</span>
        ) : null}
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-white/70">Author</span>
        <input
          name="author"
          type="text"
          defaultValue={defaultValues?.author}
          aria-invalid={Boolean(errors.author)}
          className="rounded-full bg-white/10 px-4 py-2 text-white placeholder:text-white/40"
        />
        {errors.author?.[0] ? (
          <span className="text-sm text-red-300">{errors.author[0]}</span>
        ) : null}
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-white/70">Total pages</span>
        <input
          name="totalPages"
          type="number"
          min={1}
          step={1}
          defaultValue={defaultValues?.totalPages}
          aria-invalid={Boolean(errors.totalPages)}
          className="rounded-full bg-white/10 px-4 py-2 text-white placeholder:text-white/40"
        />
        {errors.totalPages?.[0] ? (
          <span className="text-sm text-red-300">{errors.totalPages[0]}</span>
        ) : null}
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-white/70">Reading status</span>
        <select
          name="readingStatus"
          defaultValue={defaultValues?.readingStatus}
          aria-invalid={Boolean(errors.readingStatus)}
          className="rounded-full bg-white/10 px-4 py-2 text-white"
        >
          {READING_STATUS_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-[#15162c]"
            >
              {option.label}
            </option>
          ))}
        </select>
        {errors.readingStatus?.[0] ? (
          <span className="text-sm text-red-300">
            {errors.readingStatus[0]}
          </span>
        ) : null}
      </label>

      <div className="mt-2 flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-white/10 px-6 py-2 font-semibold transition hover:bg-white/20 disabled:opacity-50"
        >
          {isPending ? "Saving..." : submitLabel}
        </button>
        <Link
          href="/admin/books"
          className="rounded-full px-6 py-2 font-semibold text-white/70 transition hover:text-white"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
