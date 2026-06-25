import Link from "next/link";

const plans = [
  ["Starter", "$29", "Website, email capture, basic course hosting"],
  ["Growth", "$79", "Funnels, memberships, automations, analytics"],
  ["Scale", "$149", "Team access, advanced reporting, priority support"],
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link className="text-sm font-semibold text-[#173f35]" href="/">
        Back to home
      </Link>
      <section className="mt-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b15e35]">Pricing draft</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-semibold tracking-[-0.05em]">
          Simple plans for creators building real digital businesses.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-black/60">
          These are placeholder packages so we can shape the business model before connecting Stripe.
        </p>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {plans.map(([name, price, description]) => (
          <article key={name} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="mt-5 text-5xl font-semibold tracking-[-0.05em]">{price}</p>
            <p className="mt-1 text-sm text-black/40">per month</p>
            <p className="mt-6 min-h-16 leading-7 text-black/55">{description}</p>
            <button className="mt-6 w-full rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white">
              Choose {name}
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}
