export const sitePages = [
  {
    slug: "home",
    title: "Home",
    path: "/",
    status: "Published",
    purpose: "Explain the all-in-one platform and route visitors to courses, funnel, pricing, and dashboard.",
    sections: ["Hero", "Command center", "Platform modules"],
  },
  {
    slug: "funnel",
    title: "Lead Funnel",
    path: "/funnel/",
    status: "Published",
    purpose: "Capture email leads and introduce the welcome sequence before pricing.",
    sections: ["Funnel steps", "Lead capture form", "Email sequence"],
  },
  {
    slug: "pricing",
    title: "Pricing",
    path: "/pricing/",
    status: "Published",
    purpose: "Show Stripe-ready plans and route visitors to checkout pages.",
    sections: ["Plan cards", "Feature summaries", "Checkout buttons"],
  },
  {
    slug: "member-dashboard",
    title: "Member Dashboard",
    path: "/dashboard/",
    status: "Protected preview",
    purpose: "Show the operating dashboard members and creators will use after sign-in.",
    sections: ["Metrics", "Courses", "Launch checklist", "Module shortcuts"],
  },
];

export const builderBlocks = [
  ["Hero", "Headline, subheadline, and primary calls to action."],
  ["Feature grid", "Reusable module cards for products, services, or course benefits."],
  ["Lead form", "Email capture connected to the cPanel PHP handler."],
  ["Pricing cards", "Plan comparison blocks connected to checkout routes."],
  ["Course preview", "Lesson list, progress, and member-only learning path."],
  ["Analytics panel", "Snapshot cards and conversion path reporting."],
];

export const themeSettings = [
  ["Primary color", "#173f35"],
  ["Accent color", "#dc9b68"],
  ["Background", "#f7f7f2"],
  ["Font", "Arial / Helvetica"],
];

export const publishChecklist = [
  "Confirm page purpose",
  "Choose reusable blocks",
  "Connect funnel or checkout action",
  "Preview desktop and mobile layout",
  "Publish static page to Doteasy",
];
