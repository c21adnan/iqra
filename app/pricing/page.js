import Link from "next/link";
import { plans } from "../lib/plans";

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link className="text-sm font-semibold text-[#173f35]" href="/">
        Back to home
      </Link>
      <section className="mt-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b15e35]">Stripe-ready pricing</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-semibold tracking-[-0.05em]">
          Choose a plan and prepare checkout.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-black/60">
          These plans now route to checkout pages. Stripe Payment Links can be added as public GitHub variables when
          you are ready to accept payments.
        </p>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.slug}
            className={`rounded-3xl border bg-white p-6 shadow-sm ${
              plan.featured ? "border-[#173f35] shadow-xl shadow-[#173f35]/10" : "border-black/10"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold">{plan.name}</h2>
              {plan.featured ? (
                <span className="rounded-full bg-[#f7f7f2] px-3 py-1 text-xs font-semibold text-[#173f35]">Popular</span>
              ) : null}
            </div>
            <p className="mt-5 text-5xl font-semibold tracking-[-0.05em]">{plan.price}</p>
            <p className="mt-1 text-sm text-black/40">{plan.interval}</p>
            <p className="mt-6 min-h-20 leading-7 text-black/55">{plan.description}</p>
            <div className="mt-6 grid gap-2">
              {plan.features.slice(0, 3).map((feature) => (
                <p key={feature} className="rounded-2xl bg-[#f7f7f2] px-4 py-3 text-sm text-black/60">
                  {feature}
                </p>
              ))}
            </div>
            <Link
              className="mt-6 block w-full rounded-xl bg-[#173f35] px-5 py-3 text-center text-sm font-semibold text-white"
              href={`/checkout/${plan.slug}/`}
            >
              Checkout {plan.name}
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
