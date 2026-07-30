"use server";

import { revalidatePath } from "next/cache";

import { db } from "~/server/db";

import {
  type BookActionResult,
  createBookSchema,
  updateBookSchema,
} from "./schema";
import { requireUser } from "./require-user";

function parseBookInput(
  formData: FormData,
  schema: typeof createBookSchema,
) {
  return schema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
    totalPages: formData.get("totalPages"),
    readingStatus: formData.get("readingStatus"),
  });
}

export async function createBook(
  formData: FormData,
): Promise<BookActionResult> {
  const user = await requireUser();

  const parsed = parseBookInput(formData, createBookSchema);
  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  await db.book.create({
    data: { ...parsed.data, userId: user.id },
  });

  revalidatePath("/admin/books");
  return { ok: true };
}

export async function updateBook(
  id: string,
  formData: FormData,
): Promise<BookActionResult> {
  const user = await requireUser();

  const parsed = parseBookInput(formData, updateBookSchema);
  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // Scope by userId so a user can only edit their own books.
  await db.book.updateMany({
    where: { id, userId: user.id },
    data: parsed.data,
  });

  revalidatePath("/admin/books");
  return { ok: true };
}

export async function deleteBook(id: string): Promise<BookActionResult> {
  const user = await requireUser();

  // Scope by userId so a user can only delete their own books.
  await db.book.deleteMany({ where: { id, userId: user.id } });

  revalidatePath("/admin/books");
  return { ok: true };
}
