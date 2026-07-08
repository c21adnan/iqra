import Link from "next/link";
import ProgramCatalog from "./ProgramCatalog";

export default function ProgramsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link className="text-sm font-semibold text-[#173f35]" href="/">
          Back to home
        </Link>
        <Link className="rounded-xl bg-[#173f35] px-4 py-2 text-sm font-semibold text-white" href="/creator/">
          Creator workspace
        </Link>
      </div>

      <section className="mt-10 rounded-[2rem] bg-[#173f35] p-8 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Published programs</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-0.05em]">
          Student-facing courses created in IQRA.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">
          Courses marked as Published in the creator workspace appear here automatically from the server course store.
        </p>
      </section>

      <section className="mt-8">
        <ProgramCatalog />
      </section>
    </main>
  );
}
