import Link from "next/link";
import { demoMember } from "../lib/account";

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
        <div className="rounded-3xl bg-[#f7f7f2] p-5">
          <p className="text-sm font-semibold text-black/45">Demo account</p>
          <p className="mt-2 text-2xl font-semibold">{demoMember.email}</p>
          <p className="mt-1 text-sm text-black/50">Password: connect-auth-next</p>
        </div>

        <form className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold">
            Email
            <input
              className="rounded-xl border border-black/10 bg-[#f7f7f2] px-4 py-3 font-normal outline-none"
              defaultValue={demoMember.email}
              type="email"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Password
            <input
              className="rounded-xl border border-black/10 bg-[#f7f7f2] px-4 py-3 font-normal outline-none"
              defaultValue="connect-auth-next"
              type="password"
            />
          </label>
          <Link
            className="mt-2 rounded-xl bg-[#173f35] px-5 py-3 text-center text-sm font-semibold text-white"
            href="/dashboard/"
          >
            Continue to dashboard
          </Link>
        </form>

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
