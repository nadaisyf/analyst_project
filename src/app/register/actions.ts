"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { registerUser } from "~/server/auth/register";

export type RegisterState = { error?: string } | undefined;

const registerSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function register(_prev: RegisterState, formData: FormData) {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      error:
        "Please enter your name, a valid email, and a password of at least 8 characters.",
    };
  }

  const result = await registerUser(parsed.data);

  if (result.ok) {
    redirect("/login");
  }

  if (result.reason === "duplicate_email") {
    return { error: "An account with this email already exists." };
  }

  return { error: "Something went wrong. Please try again later." };
}
