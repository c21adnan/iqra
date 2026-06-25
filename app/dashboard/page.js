import Link from "next/link";

const metrics = [
  ["Revenue", "$12,480", "+18% this month"],
  ["Members", "1,264", "84 new signups"],
  ["Course Progress", "67%", "average completion"],
  ["Email Growth", "9,430", "total subscribers"],
];

const tasks = ["Publish landing page", "Connect Stripe plan", "Write welcome email", "Upload first course module"];

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Link className="text-sm font-semibold text-[#173f35]" href="/">
        Back to home
      </Link>
      <section className="mt-10 flex flex-col justify-between gap-5 rounded-[2rem] bg-[#173f35] p-8 text-white md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">Dashboard preview</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">Your SaaS control room.</h1>
          <p className="mt-4 max-w-2xl leading-7 text-white/65">
            This is where accounts, revenue, courses, campaigns, and funnel performance will come together.
          </p>
        </div>
        <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#173f35]">Static MVP</span>
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

      <section className="mt-8 rounded-3xl border border-black/10 bg-white p-6">
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
      </section>
    </main>
  );
}
