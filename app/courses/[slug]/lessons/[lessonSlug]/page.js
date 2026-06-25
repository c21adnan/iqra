import Link from "next/link";
import { courses, getCourse, getLesson, getNextLesson } from "../../../../lib/courses";

export function generateStaticParams() {
  return courses.flatMap((course) =>
    course.lessons.map((lesson) => ({
      slug: course.slug,
      lessonSlug: lesson.slug,
    })),
  );
}

export default function LessonPage({ params }) {
  const course = getCourse(params.slug);
  const lesson = getLesson(params.slug, params.lessonSlug);
  const nextLesson = course && lesson ? getNextLesson(course, lesson.slug) : undefined;

  if (!course || !lesson) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <Link className="text-sm font-semibold text-[#173f35]" href="/courses/">
          Back to courses
        </Link>
        <h1 className="mt-10 text-4xl font-semibold">Lesson not found</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Link className="text-sm font-semibold text-[#173f35]" href={`/courses/${course.slug}/`}>
        Back to {course.title}
      </Link>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
        <article className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b15e35]">{lesson.type} lesson</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">{lesson.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-black/60">{lesson.summary}</p>

          <div className="mt-8 rounded-3xl bg-[#173f35] p-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">Lesson workspace</p>
            <h2 className="mt-4 text-2xl font-semibold">What the learner sees next</h2>
            <ul className="mt-5 grid gap-3 text-white/70">
              <li className="rounded-2xl bg-white/10 p-4">Watch or read the lesson content.</li>
              <li className="rounded-2xl bg-white/10 p-4">Download the workbook or checklist.</li>
              <li className="rounded-2xl bg-white/10 p-4">Mark the lesson complete and continue.</li>
            </ul>
          </div>
        </article>

        <aside className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
          <p className="text-sm text-black/45">{course.title}</p>
          <h2 className="mt-2 text-2xl font-semibold">Lesson details</h2>
          <div className="mt-6 grid gap-3">
            <Detail label="Type" value={lesson.type} />
            <Detail label="Length" value={`${lesson.minutes} minutes`} />
            <Detail label="Status" value="Ready to publish" />
          </div>
          {nextLesson ? (
            <Link
              className="mt-8 block rounded-xl bg-[#173f35] px-5 py-3 text-center text-sm font-semibold text-white"
              href={`/courses/${course.slug}/lessons/${nextLesson.slug}/`}
            >
              Next lesson
            </Link>
          ) : (
            <Link
              className="mt-8 block rounded-xl bg-[#173f35] px-5 py-3 text-center text-sm font-semibold text-white"
              href="/dashboard/"
            >
              View dashboard
            </Link>
          )}
        </aside>
      </section>
    </main>
  );
}

function Detail({ label, value }) {
  return (
    <div className="rounded-2xl bg-[#f7f7f2] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/35">{label}</p>
      <p className="mt-2 font-semibold">{value}</p>
    </div>
  );
}
