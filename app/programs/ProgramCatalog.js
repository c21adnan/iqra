"use client";

import { useEffect, useState } from "react";

export default function ProgramCatalog() {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("Loading published programs...");

  useEffect(() => {
    async function loadPrograms() {
      try {
        const response = await fetch("/course-api.php?public=1", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok || !data.ok) {
          setMessage(data.message || "Published programs could not be loaded.");
          return;
        }
        const published = Array.isArray(data.courses) ? data.courses : [];
        setCourses(published);
        setMessage(published.length > 0 ? "" : "No courses have been published yet.");
      } catch {
        setMessage("Published programs are unavailable right now.");
      }
    }

    loadPrograms();
  }, []);

  if (message) {
    return <p className="rounded-3xl border border-black/10 bg-white p-6 text-black/60">{message}</p>;
  }

  return (
    <div className="grid gap-5">
      {courses.map((course) => (
        <article key={course.id || course.slug} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8f4322]">Published program</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{course.title}</h2>
              <p className="mt-2 text-sm font-semibold text-[#173f35]">{course.audience}</p>
            </div>
            <span className="rounded-full bg-[#f7f7f2] px-4 py-2 text-xs font-semibold text-[#173f35]">
              {course.modules?.length || 0} modules
            </span>
          </div>
          <p className="mt-4 max-w-3xl leading-7 text-black/60">{course.description}</p>
          <div className="mt-5 grid gap-3">
            {(course.modules || []).map((module) => (
              <section key={module.id || module.title} className="rounded-2xl bg-[#f7f7f2] p-4">
                <h3 className="font-semibold">{module.title}</h3>
                <div className="mt-3 grid gap-2">
                  {(module.lessons || []).map((lesson) => (
                    <div key={lesson.id || lesson.title} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white px-4 py-3 text-sm">
                      <span>{lesson.title}</span>
                      <span className="text-black/45">
                        {lesson.format} {lesson.duration ? `- ${lesson.duration}` : ""}
                      </span>
                      {lesson.access === "Free preview" ? (
                        <span className="rounded-full bg-[#173f35] px-3 py-1 text-xs font-semibold text-white">Preview</span>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
