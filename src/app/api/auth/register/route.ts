import { NextResponse } from "next/server";

import { registerUser } from "~/server/auth/register";

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const result = await registerUser(json);

  if (!result.ok) {
    if (result.reason === "duplicate_email") {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  return NextResponse.json({ id: result.user.id, email: result.user.email });
}
