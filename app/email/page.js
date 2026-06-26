import Link from "next/link";
import {
  campaigns,
  deliverabilityChecklist,
  emailMetrics,
  segments,
  welcomeSequence,
} from "../lib/email";

export default function EmailPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Link className="text-sm font-semibold text-[#173f35]" href="/dashboard/">
        Back to dashboard
      </Link>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b15e35]">Email marketing module</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">
            Turn new leads into lasting customer relationships.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-black/60">
            Plan broadcasts, organize subscribers, and automate the journey from first opt-in to paid membership.
            The delivery layer can connect to a dedicated email provider when the prototype moves into production.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white" href="/funnel/">
              Test lead capture
            </Link>
            <Link className="rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-semibold" href="/leads-admin.php">
              View subscribers
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#173f35] p-6 text-white shadow-xl shadow-[#173f35]/10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">Welcome automation</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Four emails, one clear journey.</h2>
          <div className="mt-6 grid gap-3">
            {welcomeSequence.map(([name, timing], index) => (
              <div key={name} className="flex items-center justify-between gap-4 rounded-2xl bg-white/10 p-4">
                <span>
                  <span className="block text-xs text-white/45">Email {index + 1}</span>
                  <strong className="mt-1 block">{name}</strong>
                </span>
                <span className="text-right text-sm text-white/55">{timing}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {emailMetrics.map(([label, value, note]) => (
          <article key={label} className="rounded-2xl border border-black/10 bg-white p-6">
            <p className="text-sm text-black/50">{label}</p>
            <p className="mt-3 text-3xl font-semibold">{value}</p>
            <p className="mt-2 text-sm text-[#b15e35]">{note}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_400px]">
        <div className="rounded-[2rem] border border-black/10 bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b15e35]">Campaigns</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Broadcast calendar</h2>
          <div className="mt-6 grid gap-3">
            {campaigns.map((campaign) => (
              <div key={campaign.name} className="grid gap-3 rounded-2xl bg-[#f7f7f2] p-4 md:grid-cols-[1fr_160px_130px] md:items-center">
                <span>
                  <strong className="block">{campaign.name}</strong>
                  <span className="mt-1 block text-sm text-black/45">{campaign.audience}</span>
                </span>
                <span className="text-sm text-black/55">{campaign.delivery}</span>
                <span className="rounded-full bg-white px-3 py-1 text-center text-xs font-semibold text-[#173f35]">
                  {campaign.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-black/10 bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b15e35]">Audience</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Subscriber segments</h2>
          <div className="mt-6 grid gap-3">
            {segments.map(([name, rule, count]) => (
              <div key={name} className="rounded-2xl bg-[#f7f7f2] p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{name}</h3>
                  <span className="text-sm font-semibold text-[#173f35]">{count}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-black/55">{rule}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-black/10 bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b15e35]">Automation</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Welcome sequence</h2>
          <div className="mt-6 grid gap-3">
            {welcomeSequence.map(([name, timing, purpose], index) => (
              <div key={name} className="rounded-2xl bg-[#f7f7f2] p-4">
                <p className="text-xs font-semibold text-black/35">Email {index + 1} · {timing}</p>
                <h3 className="mt-1 font-semibold">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-black/55">{purpose}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b15e35]">Deliverability</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Production checklist</h2>
          <div className="mt-6 grid gap-3">
            {deliverabilityChecklist.map(([item, description]) => (
              <div key={item} className="rounded-2xl bg-[#f7f7f2] p-4">
                <h3 className="font-semibold">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-black/55">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
