import Link from "next/link";
import { courses } from "../lib/courses";

const metrics = [
  ["Revenue", "$12,480", "+18% this month"],
  ["Members", "1,264", "84 new signups"],
  ["Course Progress", "64%", "across active learners"],
  ["Email Growth", "9,430", "total subscribers"],
];

const tasks = ["Publish course catalog", "Connect Stripe plan", "Write welcome email", "Add protected lesson access"];

export default function DashboardPage() {
  const nextCourse = courses[0];
  const nextLesson = nextCourse.lessons[1];

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Link className="text-sm font-semibold text-[#173f35]" href="/">
        Back to home
      </Link>
      <section className="mt-10 flex flex-col justify-between gap-5 rounded-[2rem] bg-[#173f35] p-8 text-white md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">Student dashboard preview</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">Learning, revenue, and growth in one view.</h1>
          <p className="mt-4 max-w-2xl leading-7 text-white/65">
            This dashboard now connects to the course catalog, showing learner progress, next lessons, and launch tasks.
          </p>
        </div>
        <Link
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#173f35]"
          href={`/courses/${nextCourse.slug}/lessons/${nextLesson.slug}/`}
        >
          Continue lesson
        </Link>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(([label, value, note]) => (
          <article key={label} className="rounded-2xl border border-black/10 bg-white p-6">
            <p className="text-sm text-black/50">{label}</p>
            <p className="mt-3 text-3xl font-semibold">{value}</p>
            <p className="mt-2 text-sm text-[#b15e35]">{note}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-black/10 bg-white p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">Active courses</h2>
            <Link className="text-sm font-semibold text-[#173f35]" href="/courses/">
              View catalog
            </Link>
          </div>
          <div className="mt-5 grid gap-3">
            {courses.map((course) => (
              <Link
                key={course.slug}
                className="rounded-2xl bg-[#f7f7f2] p-4 transition hover:bg-[#efece2]"
                href={`/courses/${course.slug}/`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span>
                    <strong className="block">{course.title}</strong>
                    <span className="mt-1 block text-sm text-black/45">{course.lessons.length} lessons</span>
                  </span>
                  <span className="text-sm font-semibold text-[#173f35]">{course.progress}%</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/10">
                  <div className="h-full rounded-full bg-[#173f35]" style={{ width: `${course.progress}%` }} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-6">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">Launch checklist</h2>
          <div className="mt-5 grid gap-3">
            {tasks.map((task, index) => (
              <div key={task} className="flex items-center justify-between rounded-2xl bg-[#f7f7f2] p-4">
                <span className="font-medium">{task}</span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black/45">
                  Step {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
