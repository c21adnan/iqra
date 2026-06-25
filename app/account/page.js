import Link from "next/link";
import { accessRules, authSteps, demoMember } from "../lib/account";
import { courses } from "../lib/courses";

export default function AccountPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Link className="text-sm font-semibold text-[#173f35]" href="/dashboard/">
        Back to dashboard
      </Link>

      <section className="mt-10 grid gap-8 lg:grid-cols-[420px_1fr]">
        <aside className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b15e35]">Member profile</p>
          <div className="mt-6 grid size-20 place-items-center rounded-3xl bg-[#173f35] text-3xl font-semibold text-white">
            {demoMember.name.charAt(0)}
          </div>
          <h1 className="mt-5 text-3xl font-semibold">{demoMember.name}</h1>
          <p className="mt-1 text-black/50">{demoMember.email}</p>
          <div className="mt-6 grid gap-3">
            <Info label="Plan" value={demoMember.plan} />
            <Info label="Status" value={demoMember.status} />
            <Info label="Role" value={demoMember.role} />
          </div>
          <Link
            className="mt-6 block rounded-xl bg-[#173f35] px-5 py-3 text-center text-sm font-semibold text-white"
            href="/courses/"
          >
            Open course library
          </Link>
        </aside>

        <div className="grid gap-4">
          <section className="rounded-[2rem] bg-[#173f35] p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">Protected area preview</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">Your member area is ready for real auth.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/65">
              This page represents what users will see after signing in. Today it is static; next we connect an
              authentication provider and protect these routes properly.
            </p>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <h3 className="text-2xl font-semibold">Access rules</h3>
              <div className="mt-5 grid gap-3">
                {accessRules.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl bg-[#f7f7f2] p-4">
                    <span className="font-medium">{label}</span>
                    <span className="text-sm font-semibold text-[#173f35]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6">
              <h3 className="text-2xl font-semibold">Auth roadmap</h3>
              <div className="mt-5 grid gap-3">
                {authSteps.map((step, index) => (
                  <div key={step} className="rounded-2xl bg-[#f7f7f2] p-4">
                    <p className="text-xs font-semibold text-black/35">Step {index + 1}</p>
                    <p className="mt-1 font-medium">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-black/10 bg-white p-6">
            <h3 className="text-2xl font-semibold">Unlocked courses</h3>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {courses.map((course) => (
                <Link key={course.slug} className="rounded-2xl bg-[#f7f7f2] p-4" href={`/courses/${course.slug}/`}>
                  <p className="text-sm font-semibold text-[#b15e35]">{course.category}</p>
                  <p className="mt-3 font-semibold">{course.title}</p>
                  <p className="mt-2 text-sm text-black/50">{course.progress}% complete</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-[#f7f7f2] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/35">{label}</p>
      <p className="mt-2 font-semibold">{value}</p>
    </div>
  );
}
