import Link from "next/link";
import { getPlan, plans } from "../../lib/plans";

export function generateStaticParams() {
  return plans.map((plan) => ({ plan: plan.slug }));
}

export default async function CheckoutPage({ params }) {
  const { plan: planSlug } = await params;
  const plan = getPlan(planSlug);

  if (!plan) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <Link className="text-sm font-semibold text-[#173f35]" href="/pricing/">
          Back to pricing
        </Link>
        <h1 className="mt-10 text-4xl font-semibold">Plan not found</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link className="text-sm font-semibold text-[#173f35]" href="/pricing/">
        Back to pricing
      </Link>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="rounded-[2rem] bg-[#173f35] p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">Stripe-ready checkout</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">Review your {plan.name} plan.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
            This checkout step is ready for Stripe Payment Links. Once the plan link is added in GitHub, the button
            will send customers to Stripe's hosted payment page.
          </p>
          <div className="mt-8 rounded-3xl bg-white/10 p-5">
            <p className="text-sm text-white/55">Selected plan</p>
            <p className="mt-2 text-4xl font-semibold">{plan.price}</p>
            <p className="mt-1 text-white/55">{plan.interval}</p>
          </div>
        </div>

        <aside className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b15e35]">Order summary</p>
              <h2 className="mt-3 text-3xl font-semibold">{plan.name}</h2>
            </div>
            {plan.featured ? (
              <span className="rounded-full bg-[#f7f7f2] px-3 py-1 text-xs font-semibold text-[#173f35]">Popular</span>
            ) : null}
          </div>

          <p className="mt-5 leading-7 text-black/55">{plan.description}</p>

          <div className="mt-6 grid gap-3">
            {plan.features.map((feature) => (
              <div key={feature} className="rounded-2xl bg-[#f7f7f2] p-4 text-sm font-medium">
                {feature}
              </div>
            ))}
          </div>

          {plan.paymentLink ? (
            <a
              className="mt-6 block rounded-xl bg-[#173f35] px-5 py-3 text-center text-sm font-semibold text-white"
              href={plan.paymentLink}
              rel="noreferrer"
              target="_blank"
            >
              Continue to Stripe
            </a>
          ) : (
            <div className="mt-6 rounded-2xl border border-[#b15e35]/20 bg-[#fff8f3] p-4">
              <p className="font-semibold text-[#7a3f22]">Stripe Payment Link not connected yet.</p>
              <p className="mt-2 text-sm leading-6 text-[#7a3f22]/80">
                Add the public GitHub variable for this plan, then redeploy. No secret Stripe keys are needed on Doteasy.
              </p>
            </div>
          )}

          <Link className="mt-5 block text-center text-sm font-semibold text-[#173f35]" href="/account/">
            View member account
          </Link>
        </aside>
      </section>
    </main>
  );
}
