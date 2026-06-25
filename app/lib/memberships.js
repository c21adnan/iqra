export const membershipPlans = [
  {
    name: "Starter Member",
    price: "$29",
    status: "Draft access",
    description: "Entry access for one course library, basic lessons, and launch resources.",
    access: ["Course library", "Starter downloads", "Member dashboard"],
  },
  {
    name: "Growth Member",
    price: "$79",
    status: "Recommended",
    description: "Recurring access for courses, workshops, funnel templates, and member updates.",
    access: ["All courses", "Monthly workshop", "Funnel templates", "Email sequence vault"],
  },
  {
    name: "Scale Member",
    price: "$149",
    status: "Premium",
    description: "Higher-touch membership for teams, reporting, implementation support, and priority resources.",
    access: ["Everything in Growth", "Team workspace", "Priority support", "Migration planning"],
  },
];

export const accessRules = [
  ["Public visitors", "Can view home, builder, funnel, pricing, and course previews."],
  ["Free leads", "Can join the email list and receive launch sequence content."],
  ["Paid members", "Can access protected lessons, member account, and course resources."],
  ["Admins", "Can review leads, analytics, plans, and publishing status."],
];

export const memberLifecycle = [
  ["Join list", "Visitor submits the funnel form and becomes a lead."],
  ["Choose plan", "Lead selects a Stripe-ready membership plan."],
  ["Create account", "Member signs in through Auth0 when live auth is configured."],
  ["Unlock content", "Plan controls courses, downloads, workshops, and dashboard access."],
  ["Renew or upgrade", "Stripe status will update access and member analytics."],
];

export const gatedAssets = [
  ["Creator Business Foundation", "Course", "Growth Member"],
  ["Membership Growth Engine", "Course", "Growth Member"],
  ["Sales Funnel Starter", "Course", "Starter Member"],
  ["Launch Email Templates", "Download", "Growth Member"],
  ["Team Migration Checklist", "Resource", "Scale Member"],
];
