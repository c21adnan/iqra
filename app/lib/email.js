export const emailMetrics = [
  ["Subscribers", "2,418", "+126 this month"],
  ["Open rate", "48.6%", "Across recent sends"],
  ["Click rate", "9.4%", "228 engaged readers"],
  ["Automations", "3", "2 active, 1 draft"],
];

export const campaigns = [
  {
    name: "June creator update",
    audience: "All subscribers",
    status: "Scheduled",
    delivery: "Jun 30, 10:00 AM",
  },
  {
    name: "Membership launch",
    audience: "Engaged leads",
    status: "Draft",
    delivery: "5-email campaign",
  },
  {
    name: "New course announcement",
    audience: "Growth members",
    status: "Sent",
    delivery: "48.6% opened",
  },
];

export const segments = [
  ["New leads", "Joined in the last 30 days", "126"],
  ["Engaged leads", "Opened or clicked in the last 60 days", "684"],
  ["Active members", "Has a current paid membership", "1,264"],
  ["Course learners", "Started at least one lesson", "942"],
];

export const welcomeSequence = [
  ["Welcome to IQRA", "Immediately", "Deliver the promised resource and set expectations."],
  ["Choose your first outcome", "After 1 day", "Route subscribers toward the most relevant course."],
  ["A simple creator system", "After 3 days", "Teach the platform method and build trust."],
  ["See the membership plans", "After 5 days", "Introduce the paid offer and member benefits."],
];

export const deliverabilityChecklist = [
  ["Sender identity", "Use a verified domain email address."],
  ["Consent", "Record when and where every subscriber opted in."],
  ["Unsubscribe", "Include a working opt-out link in every campaign."],
  ["List hygiene", "Suppress bounced and unsubscribed addresses."],
];
