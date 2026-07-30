import { z } from "zod";

export const readingStatusSchema = z.enum(["UNREAD", "READING", "FINISHED"]);

export const bookInputSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  author: z.string().trim().min(1, "Author is required"),
  totalPages: z.coerce
    .number()
    .int("Total pages must be a whole number")
    .positive("Total pages must be greater than 0"),
  readingStatus: readingStatusSchema,
});

export const createBookSchema = bookInputSchema;
export const updateBookSchema = bookInputSchema;

export type ReadingStatus = z.infer<typeof readingStatusSchema>;
export type BookInput = z.infer<typeof bookInputSchema>;

export type BookFormValues = {
  title: string;
  author: string;
  totalPages: number;
  readingStatus: ReadingStatus;
};

export type BookListItem = {
  id: string;
  title: string;
  author: string;
  readingStatus: ReadingStatus;
  createdAt: Date;
};

export type BookFormErrors = {
  title?: string[];
  author?: string[];
  totalPages?: string[];
  readingStatus?: string[];
};

export type BookActionResult =
  | { ok: true }
  | { ok: false; errors: BookFormErrors };

export const READING_STATUS_OPTIONS: { value: ReadingStatus; label: string }[] =
  [
    { value: "UNREAD", label: "Unread" },
    { value: "READING", label: "Reading" },
    { value: "FINISHED", label: "Finished" },
  ];

export const READING_STATUS_LABELS: Record<ReadingStatus, string> = {
  UNREAD: "Unread",
  READING: "Reading",
  FINISHED: "Finished",
};
