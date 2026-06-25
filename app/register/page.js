import Link from "next/link";

const fields = ["Full name", "Email address", "Workspace name"];

export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link className="text-sm font-semibold text-[#173f35]" href="/">
        Back to home
      </Link>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="rounded-[2rem] bg-[#173f35] p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">Create workspace</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">Start an IQRA creator account.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
            This signup flow previews the account setup experience before we connect real authentication, billing, and
            database storage.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["Account", "Plan", "Dashboard"].map((step, index) => (
              <div key={step} className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs font-semibold text-white/40">Step {index + 1}</p>
                <p className="mt-2 font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <form className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Workspace details</h2>
          <div className="mt-6 grid gap-4">
            {fields.map((field) => (
              <label key={field} className="grid gap-2 text-sm font-semibold">
                {field}
                <input className="rounded-xl border border-black/10 bg-[#f7f7f2] px-4 py-3 font-normal outline-none" />
              </label>
            ))}
          </div>
          <Link
            className="mt-6 block rounded-xl bg-[#173f35] px-5 py-3 text-center text-sm font-semibold text-white"
            href="/account/"
          >
            Create demo account
          </Link>
          <p className="mt-5 text-sm text-black/50">
            Already have access?{" "}
            <Link className="font-semibold text-[#173f35]" href="/login/">
              Sign in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
