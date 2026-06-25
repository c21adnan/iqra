import Link from "next/link";

const lessons = [
  ["01", "Offer Design", "Shape the promise, audience, and transformation."],
  ["02", "Curriculum Builder", "Plan modules, lessons, resources, and milestones."],
  ["03", "Student Experience", "Design progress, certificates, and member access."],
];

export default function CoursesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link className="text-sm font-semibold text-[#173f35]" href="/">
        Back to home
      </Link>
      <section className="mt-10 rounded-[2rem] border border-black/10 bg-white p-8 shadow-xl shadow-[#173f35]/5">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b15e35]">Course hosting</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-[-0.05em]">
          Build structured learning products that feel simple to run.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-black/60">
          This page is the starting point for the LMS side of IQRA: courses, lessons, downloadable resources, student
          progress, and protected access.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {lessons.map(([number, name, description]) => (
          <article key={name} className="rounded-2xl border border-black/10 bg-white p-6">
            <p className="text-xs font-semibold text-black/35">{number}</p>
            <h2 className="mt-8 text-xl font-semibold">{name}</h2>
            <p className="mt-3 text-sm leading-6 text-black/55">{description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
