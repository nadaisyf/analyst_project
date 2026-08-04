export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8">
          <div className="h-8 w-48 animate-pulse rounded bg-white/10" />
          <div className="mt-3 h-4 w-72 animate-pulse rounded bg-white/10" />
        </div>

        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-16 animate-pulse rounded-xl bg-white/10"
            />
          ))}
        </div>
      </div>
    </main>
  );
}