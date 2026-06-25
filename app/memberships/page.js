import Link from "next/link";
import { accessRules, gatedAssets, memberLifecycle, membershipPlans } from "../lib/memberships";

export default function MembershipsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Link className="text-sm font-semibold text-[#173f35]" href="/dashboard/">
        Back to dashboard
      </Link>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b15e35]">Memberships module</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">
            Turn courses and content into protected plans.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-black/60">
            This module maps recurring plans, access rules, member lifecycle, and protected assets. It is ready to
            connect to Stripe plan status and Auth0 user accounts when we move beyond the static prototype.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white" href="/pricing/">
              View pricing
            </Link>
            <Link className="rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-semibold" href="/account/">
              View account
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#173f35] p-6 text-white shadow-xl shadow-[#173f35]/10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">Member system</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Access is the product engine.</h2>
          <div className="mt-6 grid gap-3">
            {["Plan", "Account", "Access", "Renewal"].map((item, index) => (
              <div key={item} className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
                <span>{item}</span>
                <span className="text-sm text-white/55">Step {index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {membershipPlans.map((plan) => (
          <article
            key={plan.name}
            className={`rounded-3xl border bg-white p-6 shadow-sm ${
              plan.status === "Recommended" ? "border-[#173f35] shadow-xl shadow-[#173f35]/10" : "border-black/10"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold">{plan.name}</h2>
              <span className="rounded-full bg-[#f7f7f2] px-3 py-1 text-xs font-semibold text-[#173f35]">
                {plan.status}
              </span>
            </div>
            <p className="mt-5 text-5xl font-semibold tracking-[-0.05em]">{plan.price}</p>
            <p className="mt-5 min-h-20 leading-7 text-black/55">{plan.description}</p>
            <div className="mt-6 grid gap-2">
              {plan.access.map((item) => (
                <p key={item} className="rounded-2xl bg-[#f7f7f2] px-4 py-3 text-sm text-black/60">
                  {item}
                </p>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_420px]">
        <div className="rounded-[2rem] border border-black/10 bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b15e35]">Access rules</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Who can see what</h2>
          <div className="mt-6 grid gap-3">
            {accessRules.map(([role, rule]) => (
              <div key={role} className="rounded-2xl bg-[#f7f7f2] p-4">
                <h3 className="font-semibold">{role}</h3>
                <p className="mt-2 text-sm leading-6 text-black/55">{rule}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-black/10 bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b15e35]">Lifecycle</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Member journey</h2>
          <div className="mt-6 grid gap-3">
            {memberLifecycle.map(([step, description], index) => (
              <div key={step} className="rounded-2xl bg-[#f7f7f2] p-4">
                <p className="text-xs font-semibold text-black/35">Step {index + 1}</p>
                <h3 className="mt-1 font-semibold">{step}</h3>
                <p className="mt-2 text-sm leading-6 text-black/55">{description}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-8 rounded-[2rem] border border-black/10 bg-white p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b15e35]">Protected assets</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">What memberships unlock</h2>
          </div>
          <Link className="rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white" href="/courses/">
            Open courses
          </Link>
        </div>
        <div className="mt-6 grid gap-3">
          {gatedAssets.map(([asset, type, plan]) => (
            <div key={asset} className="grid gap-3 rounded-2xl bg-[#f7f7f2] p-4 md:grid-cols-[1fr_160px_180px] md:items-center">
              <strong>{asset}</strong>
              <span className="text-sm text-black/50">{type}</span>
              <span className="rounded-full bg-white px-3 py-1 text-center text-xs font-semibold text-[#173f35]">{plan}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
