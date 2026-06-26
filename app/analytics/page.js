import Link from "next/link";
import LiveLeadMetric from "../components/LiveLeadMetric";
import { analyticsOverview, dataConnections, funnelStages, weeklyActivity } from "../lib/analytics";

const maxActivity = Math.max(...weeklyActivity.map(([, value]) => value));

export default function AnalyticsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Link className="text-sm font-semibold text-[#173f35]" href="/dashboard/">
        Back to dashboard
      </Link>

      <section className="mt-10 rounded-[2rem] bg-[#173f35] p-8 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">Analytics module</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-[-0.05em]">
          See the path from visitor to member.
        </h1>
        <p className="mt-5 max-w-2xl leading-7 text-white/65">
          This dashboard gives IQRA a reporting layer for leads, pricing interest, checkout starts, and course progress.
          Lead totals now come from the live cPanel capture file; the remaining preview metrics are ready to connect to
          Stripe, Auth0, and course records.
        </p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {analyticsOverview.map((metric) => (
          <article key={metric.label} className="rounded-3xl border border-black/10 bg-white p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-black/50">{metric.label}</p>
              <span className="rounded-full bg-[#f7f7f2] px-3 py-1 text-xs font-semibold text-[#173f35]">
                {metric.change}
              </span>
            </div>
            {metric.label === "Captured leads" ? (
              <LiveLeadMetric fallback={metric.value} note={metric.note} />
            ) : (
              <>
                <p className="mt-4 text-4xl font-semibold tracking-[-0.04em]">{metric.value}</p>
                <p className="mt-2 text-sm text-black/45">{metric.note}</p>
              </>
            )}
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_420px]">
        <div className="rounded-[2rem] border border-black/10 bg-white p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b15e35]">Conversion path</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Funnel performance</h2>
            </div>
            <Link className="text-sm font-semibold text-[#173f35]" href="/funnel/">
              Open funnel
            </Link>
          </div>
          <div className="mt-6 grid gap-3">
            {funnelStages.map(([stage, count, rate], index) => (
              <div key={stage} className="rounded-2xl bg-[#f7f7f2] p-4">
                <div className="flex items-center justify-between gap-4">
                  <span>
                    <strong className="block">{stage}</strong>
                    <span className="mt-1 block text-sm text-black/45">Step {index + 1}</span>
                  </span>
                  <span className="text-right">
                    <strong className="block text-xl">{count.toLocaleString()}</strong>
                    <span className="text-sm text-[#b15e35]">{rate}</span>
                  </span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/10">
                  <div className="h-full rounded-full bg-[#173f35]" style={{ width: rate }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b15e35]">Weekly activity</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Engagement rhythm</h2>
          <div className="mt-6 flex h-72 items-end gap-3">
            {weeklyActivity.map(([day, value]) => (
              <div key={day} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex h-56 w-full items-end rounded-full bg-[#f7f7f2] p-1">
                  <div
                    className="w-full rounded-full bg-[#dc9b68]"
                    style={{ height: `${Math.max(14, (value / maxActivity) * 100)}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-black/45">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-black/10 bg-white p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b15e35]">Data connections</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">What feeds the analytics layer</h2>
          </div>
          <Link className="rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white" href="/leads-admin.php">
            Open leads admin
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {dataConnections.map(([name, status, description]) => (
            <article key={name} className="rounded-2xl bg-[#f7f7f2] p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold">{name}</h3>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#173f35]">{status}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-black/55">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
