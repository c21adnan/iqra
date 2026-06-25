import Link from "next/link";
import { courses } from "../lib/courses";

export default function CoursesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Link className="text-sm font-semibold text-[#173f35]" href="/">
        Back to home
      </Link>

      <section className="mt-10 grid gap-8 rounded-[2rem] border border-black/10 bg-white p-8 shadow-xl shadow-[#173f35]/5 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b15e35]">Course hosting</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-[-0.05em]">
            A working course catalog for the IQRA LMS.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-black/60">
            This is the first functional learning module: course cards, detail pages, lesson pages, student progress,
            and clear calls to continue learning.
          </p>
        </div>
        <div className="grid gap-3 rounded-3xl bg-[#f7f7f2] p-5 sm:grid-cols-3">
          <Stat value={courses.length} label="courses" />
          <Stat value="9" label="lessons" />
          <Stat value="64%" label="avg progress" />
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {courses.map((course) => (
          <article key={course.slug} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-[#f7f7f2] px-3 py-1 text-xs font-semibold text-black/55">
                {course.category}
              </span>
              <span className="text-xs font-semibold text-black/35">{course.level}</span>
            </div>
            <h2 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">{course.title}</h2>
            <p className="mt-3 min-h-20 leading-7 text-black/55">{course.summary}</p>
            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs font-semibold text-black/45">
                <span>Student progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-black/10">
                <div className="h-full rounded-full bg-[#173f35]" style={{ width: `${course.progress}%` }} />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5 text-sm">
              <span className="text-black/45">{course.duration}</span>
              <Link className="font-semibold text-[#173f35]" href={`/courses/${course.slug}/`}>
                Open course
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-black/35">{label}</p>
    </div>
  );
}
