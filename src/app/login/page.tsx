import { LoginForm } from "~/app/login/_components/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex w-full flex-col items-center gap-6 px-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Sign in</h1>
        <LoginForm />
      </div>
    </main>
  );
}
