"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] px-4 text-center text-white">
      <h1 className="text-4xl font-bold">
        Oops! Something went wrong.
      </h1>

      <p className="mt-4 text-white/70">
        An unexpected error occurred. Please try again.
      </p>

      <button
        onClick={reset}
        className="mt-8 rounded-full bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-500"
      >
        Try Again
      </button>
    </main>
  );
}