import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Session } from "next-auth";

import { deleteBook } from "./actions";

// Hoist the mock functions so the same references can be used inside the
// vi.mock() factories and directly in assertions. Referencing the plain
// Mock values (rather than e.g. `db.book.deleteMany`) also keeps the
// `unbound-method` lint rule happy.
const mocks = vi.hoisted(() => ({
  deleteMany: vi.fn().mockResolvedValue({ count: 1 }),
  deleteReadingSessions: vi.fn(),
  getSession: vi.fn(),
  revalidatePath: vi.fn(),
  redirect: vi.fn((url: string) => {
    // The real redirect() halts the call by throwing; mirror that so the
    // unauthenticated branch aborts just like in production.
    throw new Error(`redirect:${url}`);
  }),
}));

vi.mock("~/server/db", () => ({
  db: {
    book: { deleteMany: mocks.deleteMany },
    readingSession: { deleteMany: mocks.deleteReadingSessions },
  },
}));

vi.mock("~/server/auth", () => ({ getSession: mocks.getSession }));

vi.mock("next/cache", () => ({ revalidatePath: mocks.revalidatePath }));

vi.mock("next/navigation", () => ({ redirect: mocks.redirect }));

const BOOK_ID = "book-1";
const OWNER_ID = "user-owner";

function sessionFor(userId: string | null): Session | null {
  if (userId === null) return null;
  return { user: { id: userId }, expires: "" };
}

describe("deleteBook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not delete when the caller is unauthenticated", async () => {
    mocks.getSession.mockResolvedValue(sessionFor(null));

    await expect(deleteBook(BOOK_ID)).rejects.toThrow("redirect:/login");

    expect(mocks.redirect).toHaveBeenCalledWith("/login");
    expect(mocks.deleteMany).not.toHaveBeenCalled();
    expect(mocks.revalidatePath).not.toHaveBeenCalled();
  });

  it("scopes the delete to the caller's own books", async () => {
    mocks.getSession.mockResolvedValue(sessionFor(OWNER_ID));

    await deleteBook(BOOK_ID);

    // The userId in the WHERE clause is what enforces ownership: a book
    // belonging to another user can never match this query.
    expect(mocks.deleteMany).toHaveBeenCalledWith({
      where: { id: BOOK_ID, userId: OWNER_ID },
    });
  });

  it("deletes the book for its owner", async () => {
    mocks.getSession.mockResolvedValue(sessionFor(OWNER_ID));

    const result = await deleteBook(BOOK_ID);

    expect(result).toEqual({ ok: true });
    expect(mocks.deleteMany).toHaveBeenCalledTimes(1);
    expect(mocks.revalidatePath).toHaveBeenCalledWith("/admin/books");
  });

  it("removes related ReadingSessions via onDelete: Cascade", async () => {
    mocks.getSession.mockResolvedValue(sessionFor(OWNER_ID));

    await deleteBook(BOOK_ID);

    // The action deletes only the book and relies on the database cascade
    // to clean up dependent ReadingSessions (no manual deletion in code).
    expect(mocks.deleteMany).toHaveBeenCalledWith({
      where: { id: BOOK_ID, userId: OWNER_ID },
    });
    expect(mocks.deleteReadingSessions).not.toHaveBeenCalled();

    // The cascade itself is guaranteed by the Prisma schema: the
    // ReadingSession -> Book relation must be declared with onDelete: Cascade.
    const schemaPath = path.join(
      fileURLToPath(new URL(".", import.meta.url)),
      "..",
      "..",
      "..",
      "..",
      "prisma",
      "schema.prisma",
    );
    const schema = fs.readFileSync(schemaPath, "utf8");
    const readingSessionBlock =
      /model ReadingSession \{([\s\S]*?)\}/.exec(schema)?.[1] ?? "";

    expect(readingSessionBlock).toContain(
      "book Book @relation(fields: [bookId], references: [id], onDelete: Cascade)",
    );
  });
});
