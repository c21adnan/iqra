import Link from "next/link";
import LeadCaptureForm from "../components/LeadCaptureForm";
import { funnelSteps, welcomeSequence } from "../lib/funnel";

export default function FunnelPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Link className="text-sm font-semibold text-[#173f35]" href="/">
        Back to home
      </Link>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8f4322]">Sales funnel and email</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">
            Capture leads before they become customers.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-black/60">
            This is the next SaaS module: an opt-in page, a lead list, a welcome sequence, and a path from interest to
            Stripe checkout.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white" href="#lead-form">
              Test lead capture
            </Link>
            <Link className="rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-semibold" href="/pricing/">
              View offer
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-xl shadow-[#173f35]/10">
          <div className="grid gap-3">
            {funnelSteps.map((step, index) => (
              <article key={step.name} className="rounded-2xl bg-[#f7f7f2] p-4">
                <p className="text-xs font-semibold text-black/60">Step {index + 1}</p>
                <h2 className="mt-1 font-semibold">{step.name}</h2>
                <p className="mt-2 text-sm leading-6 text-black/55">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="lead-form" className="mt-10">
        <LeadCaptureForm />
      </section>

      <section className="mt-10 rounded-[2rem] border border-black/10 bg-white p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8f4322]">Email sequence preview</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">The first automation is mapped.</h2>
          </div>
          <Link className="text-sm font-semibold text-[#173f35]" href="/dashboard/">
            Open dashboard
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {welcomeSequence.map((email) => (
            <article key={email.subject} className="rounded-2xl bg-[#f7f7f2] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8f4322]">{email.timing}</p>
              <h3 className="mt-3 text-xl font-semibold">{email.subject}</h3>
              <p className="mt-3 text-sm leading-6 text-black/55">{email.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
