import Link from "next/link";
import CourseWorkspace from "./CourseWorkspace";

export default function CreatorPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link className="text-sm font-semibold text-[#173f35]" href="/dashboard/">
          Back to dashboard
        </Link>
        <Link className="rounded-xl border border-black/15 bg-white px-4 py-2 text-sm font-semibold text-[#173f35]" href="/courses/">
          Preview catalog
        </Link>
      </div>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8f4322]">Creator workspace</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-0.05em]">
            Build your own course from dashboard to published program.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-black/65">
            This is the creator side of IQRA: outline the offer, organize modules, add lessons, set access rules, and
            preview what students will see before we connect the database and video provider.
          </p>
        </div>
        <aside className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8f4322]">Creator flow</p>
          <div className="mt-5 grid gap-3">
            {["Course blueprint", "Curriculum builder", "Lesson media", "Student preview", "Publish checklist"].map(
              (item, index) => (
                <div key={item} className="flex items-center justify-between rounded-2xl bg-[#f7f7f2] px-4 py-3">
                  <span className="font-semibold">{item}</span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black/40">
                    {index + 1}
                  </span>
                </div>
              )
            )}
          </div>
        </aside>
      </section>

      <section className="mt-8">
        <CourseWorkspace />
      </section>
    </main>
  );
}
