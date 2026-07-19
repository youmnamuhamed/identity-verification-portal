import { VerificationForm } from "@/components/verification/VerificationForm";

export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <VerificationForm />
      </div>
    </main>
  );
}
