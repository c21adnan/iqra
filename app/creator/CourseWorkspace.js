"use client";

import { useEffect, useMemo, useState } from "react";

const blankLesson = { title: "", format: "Video", duration: "", access: "Included" };
const starterCourse = {
  title: "My Training Program",
  audience: "New students",
  promise: "Help learners reach one clear outcome.",
  description: "A practical course built from your framework, lessons, and resources.",
  status: "Draft",
  modules: [
    {
      title: "Module 1: Foundation",
      lessons: [
        { title: "Welcome and roadmap", format: "Video", duration: "8 min", access: "Free preview" },
        { title: "First core concept", format: "Video", duration: "12 min", access: "Included" },
      ],
    },
  ],
};

const storageKey = "iqra_creator_workspace_course";

export default function CourseWorkspace() {
  const [course, setCourse] = useState(starterCourse);
  const [savedAt, setSavedAt] = useState("");
  const [activeModule, setActiveModule] = useState(0);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        setCourse(JSON.parse(saved));
      }
    } catch {
      setCourse(starterCourse);
    }
  }, []);

  const lessonCount = useMemo(
    () => course.modules.reduce((total, module) => total + module.lessons.length, 0),
    [course.modules]
  );

  const completion = useMemo(() => {
    const checks = [
      course.title.trim(),
      course.audience.trim(),
      course.promise.trim(),
      course.description.trim(),
      course.modules.length > 0,
      lessonCount > 0,
      course.modules.every((module) => module.title.trim()),
      course.modules.every((module) => module.lessons.every((lesson) => lesson.title.trim())),
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [course, lessonCount]);

  function updateCourse(field, value) {
    setCourse((current) => ({ ...current, [field]: value }));
  }

  function updateModule(index, field, value) {
    setCourse((current) => ({
      ...current,
      modules: current.modules.map((module, moduleIndex) =>
        moduleIndex === index ? { ...module, [field]: value } : module
      ),
    }));
  }

  function updateLesson(moduleIndex, lessonIndex, field, value) {
    setCourse((current) => ({
      ...current,
      modules: current.modules.map((module, currentModuleIndex) =>
        currentModuleIndex === moduleIndex
          ? {
              ...module,
              lessons: module.lessons.map((lesson, currentLessonIndex) =>
                currentLessonIndex === lessonIndex ? { ...lesson, [field]: value } : lesson
              ),
            }
          : module
      ),
    }));
  }

  function addModule() {
    setCourse((current) => {
      const modules = [
        ...current.modules,
        { title: `Module ${current.modules.length + 1}: New module`, lessons: [{ ...blankLesson }] },
      ];
      setActiveModule(modules.length - 1);
      return { ...current, modules };
    });
  }

  function addLesson(moduleIndex) {
    setCourse((current) => ({
      ...current,
      modules: current.modules.map((module, index) =>
        index === moduleIndex ? { ...module, lessons: [...module.lessons, { ...blankLesson }] } : module
      ),
    }));
  }

  function removeLesson(moduleIndex, lessonIndex) {
    setCourse((current) => ({
      ...current,
      modules: current.modules.map((module, index) =>
        index === moduleIndex
          ? { ...module, lessons: module.lessons.filter((_, currentLessonIndex) => currentLessonIndex !== lessonIndex) }
          : module
      ),
    }));
  }

  function saveDraft() {
    window.localStorage.setItem(storageKey, JSON.stringify(course));
    setSavedAt(new Date().toLocaleString());
  }

  function resetDraft() {
    window.localStorage.removeItem(storageKey);
    setCourse(starterCourse);
    setActiveModule(0);
    setSavedAt("");
  }

  const selectedModule = course.modules[activeModule] || course.modules[0];

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8f4322]">Course blueprint</p>
          <div className="mt-5 grid gap-4">
            <Field label="Course title" value={course.title} onChange={(value) => updateCourse("title", value)} />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Who is it for?" value={course.audience} onChange={(value) => updateCourse("audience", value)} />
              <Field label="Main promise" value={course.promise} onChange={(value) => updateCourse("promise", value)} />
            </div>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-black/60">Course description</span>
              <textarea
                className="min-h-32 rounded-2xl border border-black/10 bg-[#f7f7f2] px-4 py-3 outline-none focus:border-[#173f35]"
                value={course.description}
                onChange={(event) => updateCourse("description", event.target.value)}
              />
            </label>
          </div>
        </div>

        <aside className="rounded-3xl bg-[#173f35] p-6 text-white shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/65">Readiness</p>
          <p className="mt-4 text-5xl font-semibold">{completion}%</p>
          <p className="mt-3 text-sm leading-6 text-white/70">
            Draft score based on title, audience, promise, modules, lessons, and lesson names.
          </p>
          <div className="mt-6 grid gap-3 text-sm">
            <StatusLine label="Modules" value={course.modules.length} />
            <StatusLine label="Lessons" value={lessonCount} />
            <StatusLine label="Status" value={course.status} />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#173f35]" onClick={saveDraft}>
              Save draft
            </button>
            <button className="rounded-xl border border-white/25 px-4 py-2 text-sm font-semibold text-white" onClick={resetDraft}>
              Reset
            </button>
          </div>
          {savedAt ? <p className="mt-4 text-xs text-white/60">Saved {savedAt}</p> : null}
        </aside>
      </section>

      <section className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-3xl border border-black/10 bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Modules</h2>
            <button className="rounded-xl bg-[#173f35] px-3 py-2 text-sm font-semibold text-white" onClick={addModule}>
              Add
            </button>
          </div>
          <div className="mt-4 grid gap-2">
            {course.modules.map((module, index) => (
              <button
                key={`${module.title}-${index}`}
                className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold ${
                  index === activeModule ? "bg-[#173f35] text-white" : "bg-[#f7f7f2] text-black/70"
                }`}
                onClick={() => setActiveModule(index)}
              >
                {module.title || `Module ${index + 1}`}
              </button>
            ))}
          </div>
        </aside>

        <div className="rounded-3xl border border-black/10 bg-white p-6">
          {selectedModule ? (
            <>
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <Field
                  label="Module name"
                  value={selectedModule.title}
                  onChange={(value) => updateModule(activeModule, "title", value)}
                />
                <button className="rounded-xl bg-[#173f35] px-4 py-3 text-sm font-semibold text-white" onClick={() => addLesson(activeModule)}>
                  Add lesson
                </button>
              </div>
              <div className="mt-5 grid gap-3">
                {selectedModule.lessons.map((lesson, lessonIndex) => (
                  <div key={`${lesson.title}-${lessonIndex}`} className="grid gap-3 rounded-2xl bg-[#f7f7f2] p-4 lg:grid-cols-[1fr_130px_110px_130px_auto] lg:items-end">
                    <Field
                      label={`Lesson ${lessonIndex + 1}`}
                      value={lesson.title}
                      onChange={(value) => updateLesson(activeModule, lessonIndex, "title", value)}
                    />
                    <SelectField
                      label="Format"
                      value={lesson.format}
                      values={["Video", "Workshop", "PDF", "Quiz", "Assignment", "Download"]}
                      onChange={(value) => updateLesson(activeModule, lessonIndex, "format", value)}
                    />
                    <Field
                      label="Length"
                      value={lesson.duration}
                      onChange={(value) => updateLesson(activeModule, lessonIndex, "duration", value)}
                    />
                    <SelectField
                      label="Access"
                      value={lesson.access}
                      values={["Free preview", "Included", "Members only", "Drip release"]}
                      onChange={(value) => updateLesson(activeModule, lessonIndex, "access", value)}
                    />
                    <button className="rounded-xl border border-black/10 bg-white px-3 py-3 text-sm font-semibold text-black/55" onClick={() => removeLesson(activeModule, lessonIndex)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8f4322]">Student preview</p>
        <div className="mt-4 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em]">{course.title || "Untitled course"}</h2>
            <p className="mt-3 text-sm font-semibold text-[#173f35]">{course.audience}</p>
            <p className="mt-4 leading-7 text-black/60">{course.description}</p>
          </div>
          <div className="grid gap-3">
            {course.modules.map((module, moduleIndex) => (
              <article key={`${module.title}-preview-${moduleIndex}`} className="rounded-2xl bg-[#f7f7f2] p-4">
                <h3 className="font-semibold">{module.title || `Module ${moduleIndex + 1}`}</h3>
                <div className="mt-3 grid gap-2">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div key={`${lesson.title}-preview-${lessonIndex}`} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white px-4 py-3 text-sm">
                      <span>{lesson.title || `Lesson ${lessonIndex + 1}`}</span>
                      <span className="text-black/45">
                        {lesson.format} {lesson.duration ? `- ${lesson.duration}` : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <label className="grid flex-1 gap-2">
      <span className="text-sm font-semibold text-black/60">{label}</span>
      <input
        className="rounded-2xl border border-black/10 bg-[#f7f7f2] px-4 py-3 outline-none focus:border-[#173f35]"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function SelectField({ label, value, values, onChange }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-black/60">{label}</span>
      <select
        className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#173f35]"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {values.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}

function StatusLine({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
      <span className="text-white/65">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
