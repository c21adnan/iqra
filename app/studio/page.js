import Link from "next/link";
import { courseFeatures, implementationPhases, studioModules, videoFlow } from "../lib/studio";

export default function StudioPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Link className="text-sm font-semibold text-[#173f35]" href="/dashboard/">
        Back to dashboard
      </Link>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8f4322]">Course Studio</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">
            Organize lectures without turning cPanel into a video server.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-black/65">
            Creators arrange courses into modules and lessons inside IQRA. Video files upload directly to a streaming
            provider; IQRA stores only lesson details and a small playback identifier.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white" href="/creator/">
              Create a course
            </Link>
            <Link className="rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white" href="/courses/">
              Preview student catalog
            </Link>
            <Link
              className="rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-semibold text-[#173f35]"
              href="/database-admin.php"
            >
              Database setup
            </Link>
            <a
              className="rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-semibold text-[#173f35]"
              href="#implementation"
            >
              View implementation
            </a>
          </div>
        </div>

        <aside className="rounded-[2rem] bg-[#173f35] p-6 text-white shadow-xl shadow-[#173f35]/10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">Server protection</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">The video never touches Doteasy.</h2>
          <div className="mt-6 grid gap-3">
            {[
              ["Doteasy stores", "Pages, PHP endpoints, and small metadata records"],
              ["Video provider stores", "Originals, encoded streams, captions, and thumbnails"],
              ["Student receives", "Adaptive video from a global delivery network"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white/10 p-4">
                <strong>{label}</strong>
                <p className="mt-2 text-sm leading-6 text-white/80">{value}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="rounded-[2rem] border border-black/10 bg-white p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8f4322]">Curriculum editor</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Creator Business Foundation</h2>
            </div>
            <span className="rounded-full bg-[#f7f7f2] px-4 py-2 text-xs font-semibold text-[#173f35]">
              3 modules · 8 lessons
            </span>
          </div>
          <div className="mt-6 grid gap-4">
            {studioModules.map((module) => (
              <article key={module.title} className="rounded-3xl bg-[#f7f7f2] p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold">{module.title}</h3>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#173f35]">
                    {module.status}
                  </span>
                </div>
                <div className="mt-4 grid gap-2">
                  {module.lessons.map(([title, type, length, status], index) => (
                    <div
                      key={title}
                      className="grid gap-2 rounded-2xl border border-black/5 bg-white p-4 md:grid-cols-[36px_1fr_100px_90px_120px] md:items-center"
                    >
                      <span className="grid size-8 place-items-center rounded-lg bg-[#173f35] text-xs font-semibold text-white">
                        {index + 1}
                      </span>
                      <strong>{title}</strong>
                      <span className="text-sm text-black/60">{type}</span>
                      <span className="text-sm text-black/60">{length}</span>
                      <span className="text-sm font-semibold text-[#8f4322]">{status}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-black/10 bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8f4322]">Lecture settings</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">What each lesson stores</h2>
          <div className="mt-6 grid gap-3">
            {[
              "Title and description",
              "Module and display order",
              "Content type and duration",
              "Provider playback ID",
              "Thumbnail and captions",
              "Downloads and resources",
              "Free preview or plan access",
              "Draft, scheduled, or published",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-[#f7f7f2] px-4 py-3 text-sm font-medium text-black/70">
                {item}
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-8 rounded-[2rem] border border-black/10 bg-white p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8f4322]">Direct upload architecture</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">How a creator adds a video</h2>
        <div className="mt-6 grid gap-3 lg:grid-cols-5">
          {videoFlow.map(([title, description]) => (
            <article key={title} className="rounded-2xl bg-[#f7f7f2] p-4">
              <h3 className="font-semibold text-[#173f35]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-black/65">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-black/10 bg-white p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8f4322]">LMS capabilities</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">What mature course platforms typically include</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courseFeatures.map(([title, description]) => (
            <article key={title} className="rounded-2xl bg-[#f7f7f2] p-5">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-black/65">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="implementation" className="mt-8 rounded-[2rem] border border-black/10 bg-white p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8f4322]">Delivery plan</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Implementation phases</h2>
        <div className="mt-6 grid gap-3">
          {implementationPhases.map(([phase, work, status]) => (
            <div key={phase} className="grid gap-3 rounded-2xl bg-[#f7f7f2] p-4 md:grid-cols-[120px_1fr_150px] md:items-center">
              <strong className="text-[#173f35]">{phase}</strong>
              <span className="text-sm text-black/70">{work}</span>
              <span className="rounded-full bg-white px-3 py-1 text-center text-xs font-semibold text-[#173f35]">
                {status}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link className="inline-block rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white" href="/database-admin.php">
            Open protected database setup
          </Link>
        </div>
      </section>
    </main>
  );
}
