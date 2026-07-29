import "server-only";

import bcrypt from "bcrypt";
import { z } from "zod";

import { Prisma } from "../../../generated/prisma";
import { db } from "~/server/db";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

export type RegisterOutcome =
  | { ok: true; user: { id: string; email: string } }
  | { ok: false; reason: "invalid_input" | "duplicate_email" };

export async function registerUser(raw: unknown): Promise<RegisterOutcome> {
  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, reason: "invalid_input" };
  }

  const email = parsed.data.email.toLowerCase();
  const { password, name } = parsed.data;

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return { ok: false, reason: "duplicate_email" };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const user = await db.user.create({
      data: { email, name, passwordHash },
    });
    return { ok: true, user: { id: user.id, email: user.email ?? email } };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { ok: false, reason: "duplicate_email" };
    }
    throw error;
  }
}
