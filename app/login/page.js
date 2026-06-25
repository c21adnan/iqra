import Link from "next/link";
import { AuthLoginPanel } from "../components/AuthActions";

export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-screen max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <section>
        <Link className="text-sm font-semibold text-[#173f35]" href="/">
          Back to home
        </Link>
        <p className="mt-12 text-sm font-semibold uppercase tracking-[0.2em] text-[#b15e35]">Member access</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">Sign in to continue learning.</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-black/60">
          This is the static authentication preview. The next technical step is connecting Clerk or Auth0 so this page
          becomes a real secure login.
        </p>
      </section>

      <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-xl shadow-[#173f35]/5">
        <AuthLoginPanel />

        <p className="mt-6 text-center text-sm text-black/50">
          New here?{" "}
          <Link className="font-semibold text-[#173f35]" href="/register/">
            Create your workspace
          </Link>
        </p>
      </section>
    </main>
  );
}
