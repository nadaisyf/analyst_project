import { RegisterForm } from "~/app/register/_components/register-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex w-full flex-col items-center gap-6 px-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Create an account</h1>
        <RegisterForm />
      </div>
    </main>
  );
}
