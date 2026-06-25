import Link from "next/link";
import { AuthGate, AuthMemberBadge } from "../components/AuthActions";
import { courses } from "../lib/courses";

const metrics = [
  ["Revenue", "$12,480", "+18% this month"],
  ["Members", "1,264", "84 new signups"],
  ["Course Progress", "64%", "across active learners"],
  ["Captured Leads", "312", "from funnel opt-ins"],
];

const tasks = ["Publish builder pages", "Connect Stripe plan", "Test lead funnel", "Review analytics"];

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link className="text-sm font-semibold text-[#173f35]" href="/">
          Back to home
        </Link>
        <AuthMemberBadge />
      </div>
      <AuthGate>
      <section className="mt-10 flex flex-col justify-between gap-5 rounded-[2rem] bg-[#173f35] p-8 text-white md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">Protected dashboard preview</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">Learning, revenue, and growth in one view.</h1>
          <p className="mt-4 max-w-2xl leading-7 text-white/65">
            This dashboard now connects to the course catalog and account center, showing what a signed-in member will see.
          </p>
        </div>
        <Link
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#173f35]"
          href="/funnel/"
        >
          Open funnel
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

      <section className="mt-8 rounded-3xl border border-black/10 bg-white p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b15e35]">Website builder</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Pages and reusable blocks are mapped.</h2>
            <p className="mt-2 max-w-2xl text-black/55">
              Manage site pages, block types, theme settings, and the static publish checklist.
            </p>
          </div>
          <Link className="rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white" href="/builder/">
            Open builder
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-black/10 bg-white p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b15e35]">Funnel module</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Lead capture is now part of the workspace.</h2>
            <p className="mt-2 max-w-2xl text-black/55">
              Test the opt-in form, preview the welcome emails, and route interested visitors toward pricing.
            </p>
          </div>
          <Link className="rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white" href="/funnel/">
            View funnel
          </Link>
          <Link className="rounded-xl border border-black/15 px-5 py-3 text-sm font-semibold text-[#173f35]" href="/leads-admin.php">
            Leads admin
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-black/10 bg-white p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b15e35]">Analytics layer</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Funnel and course reporting is mapped.</h2>
            <p className="mt-2 max-w-2xl text-black/55">
              Review visitor, lead, checkout, and learning metrics in one operating dashboard.
            </p>
          </div>
          <Link className="rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white" href="/analytics/">
            View analytics
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-black/10 bg-white p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b15e35]">Auth layer</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Ready to connect real login.</h2>
            <p className="mt-2 max-w-2xl text-black/55">
              The current experience is a static member flow. Clerk or Auth0 can replace the demo account and protect
              this dashboard, lessons, and account page.
            </p>
          </div>
          <Link className="rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white" href="/login/">
            View login flow
          </Link>
        </div>
      </section>
      </AuthGate>
    </main>
  );
}
