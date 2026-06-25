import Link from "next/link";
import { courses, getCourse } from "../../lib/courses";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export default function CourseDetailPage({ params }) {
  const course = getCourse(params.slug);

  if (!course) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <Link className="text-sm font-semibold text-[#173f35]" href="/courses/">
          Back to courses
        </Link>
        <h1 className="mt-10 text-4xl font-semibold">Course not found</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Link className="text-sm font-semibold text-[#173f35]" href="/courses/">
        Back to courses
      </Link>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-[2rem] bg-[#173f35] p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">{course.category}</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">{course.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">{course.summary}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Mini label="Level" value={course.level} />
            <Mini label="Duration" value={course.duration} />
            <Mini label="Students" value={course.students} />
          </div>
        </div>

        <aside className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b15e35]">Outcome</p>
          <p className="mt-4 leading-7 text-black/60">{course.outcome}</p>
          <div className="mt-8">
            <div className="mb-2 flex justify-between text-xs font-semibold text-black/45">
              <span>Student progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-black/10">
              <div className="h-full rounded-full bg-[#173f35]" style={{ width: `${course.progress}%` }} />
            </div>
          </div>
          <Link
            className="mt-8 block rounded-xl bg-[#173f35] px-5 py-3 text-center text-sm font-semibold text-white"
            href={`/courses/${course.slug}/lessons/${course.lessons[0].slug}/`}
          >
            Start first lesson
          </Link>
        </aside>
      </section>

      <section className="mt-8 rounded-3xl border border-black/10 bg-white p-6">
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">Course lessons</h2>
        <div className="mt-5 grid gap-3">
          {course.lessons.map((lesson, index) => (
            <Link
              key={lesson.slug}
              className="grid gap-4 rounded-2xl bg-[#f7f7f2] p-4 transition hover:bg-[#efece2] md:grid-cols-[80px_1fr_120px]"
              href={`/courses/${course.slug}/lessons/${lesson.slug}/`}
            >
              <span className="text-sm font-semibold text-black/35">Lesson {index + 1}</span>
              <span>
                <strong className="block">{lesson.title}</strong>
                <span className="mt-1 block text-sm leading-6 text-black/55">{lesson.summary}</span>
              </span>
              <span className="text-sm font-semibold text-[#173f35]">{lesson.minutes} min</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function Mini({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">{label}</p>
      <p className="mt-2 text-lg font-semibold">{value}</p>
    </div>
  );
}
