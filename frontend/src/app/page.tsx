import { LoginForm } from "@/components/forms/loginForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
      <LoginForm />
    </main>
  );
}
