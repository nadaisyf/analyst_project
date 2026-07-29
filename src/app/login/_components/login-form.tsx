"use client";

import { useActionState } from "react";

import { login, type LoginState } from "~/app/login/actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    undefined,
  );

  return (
    <form
      action={formAction}
      className="flex w-full max-w-sm flex-col gap-4"
      noValidate
    >
      {state?.error ? (
        <p
          role="alert"
          className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-200"
        >
          {state.error}
        </p>
      ) : null}

      <label className="flex flex-col gap-1 text-sm">
        Email
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-base outline-none focus:border-white"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Password
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
          className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-base outline-none focus:border-white"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-full bg-white/20 px-10 py-3 font-semibold transition hover:bg-white/30 disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
