export const analyticsOverview = [
  {
    label: "Funnel visitors",
    value: "1,840",
    change: "+22%",
    note: "landing page sessions",
  },
  {
    label: "Captured leads",
    value: "312",
    change: "+41%",
    note: "opt-ins from the launch form",
  },
  {
    label: "Checkout starts",
    value: "86",
    change: "+14%",
    note: "pricing to checkout clicks",
  },
  {
    label: "Course progress",
    value: "64%",
    change: "+9%",
    note: "average active learner progress",
  },
];

export const funnelStages = [
  ["Visited funnel", 1840, "100%"],
  ["Captured lead", 312, "17%"],
  ["Viewed pricing", 204, "11%"],
  ["Started checkout", 86, "5%"],
  ["Joined membership", 28, "2%"],
];

export const dataConnections = [
  ["Lead CSV", "Ready", "Read opt-ins from the cPanel CSV created by the funnel form."],
  ["Stripe", "Pending", "Connect checkout events after Stripe Payment Links are added."],
  ["Auth0", "Pending", "Use signed-in users to measure members, retention, and account activity."],
  ["Courses", "Preview", "Static course progress is modeled and ready for database-backed tracking."],
];

export const weeklyActivity = [
  ["Mon", 42],
  ["Tue", 55],
  ["Wed", 61],
  ["Thu", 74],
  ["Fri", 68],
  ["Sat", 49],
  ["Sun", 38],
];
