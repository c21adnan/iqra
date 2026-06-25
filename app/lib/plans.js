export const plans = [
  {
    slug: "starter",
    name: "Starter",
    price: "$29",
    interval: "per month",
    description: "Website, email capture, and basic course hosting for a first digital product.",
    paymentLink: process.env.NEXT_PUBLIC_STRIPE_STARTER_LINK || "",
    features: ["Website and landing pages", "Email capture forms", "One course library", "Member dashboard preview"],
  },
  {
    slug: "growth",
    name: "Growth",
    price: "$79",
    interval: "per month",
    description: "Funnels, memberships, automations, and analytics for growing creators.",
    paymentLink: process.env.NEXT_PUBLIC_STRIPE_GROWTH_LINK || "",
    featured: true,
    features: ["Unlimited courses", "Membership access", "Sales funnel pages", "Email automation preview", "Analytics dashboard"],
  },
  {
    slug: "scale",
    name: "Scale",
    price: "$149",
    interval: "per month",
    description: "Team access, advanced reporting, and priority support for a larger creator business.",
    paymentLink: process.env.NEXT_PUBLIC_STRIPE_SCALE_LINK || "",
    features: ["Everything in Growth", "Team workspace", "Advanced reporting", "Priority support", "Migration planning"],
  },
];

export function getPlan(slug) {
  return plans.find((plan) => plan.slug === slug);
}
