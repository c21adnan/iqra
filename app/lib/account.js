export const demoMember = {
  name: "Demo Learner",
  email: "learner@iqra.demo",
  plan: "Growth",
  status: "Active",
  role: "Student",
};

export const accessRules = [
  ["Course library", "Included"],
  ["Membership area", "Included"],
  ["Email automations", "Preview"],
  ["Stripe billing", "Next integration"],
];

export const authSteps = [
  "Connect Clerk or Auth0",
  "Protect dashboard and lessons",
  "Store members and progress in a database",
  "Connect paid plans to Stripe",
];
