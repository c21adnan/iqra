export const courses = [
  {
    slug: "creator-business-foundation",
    title: "Creator Business Foundation",
    category: "Business",
    level: "Beginner",
    duration: "3 modules",
    students: 248,
    progress: 72,
    summary: "Turn your knowledge into a clear offer, learning path, and launch plan.",
    outcome: "A ready-to-sell course offer with curriculum, pricing, and launch checklist.",
    lessons: [
      {
        slug: "shape-your-offer",
        title: "Shape Your Offer",
        minutes: 12,
        type: "Video",
        summary: "Define the audience, promise, and transformation behind the course.",
      },
      {
        slug: "map-the-curriculum",
        title: "Map the Curriculum",
        minutes: 18,
        type: "Workshop",
        summary: "Break the transformation into modules, lessons, and milestones.",
      },
      {
        slug: "launch-checklist",
        title: "Launch Checklist",
        minutes: 10,
        type: "Checklist",
        summary: "Prepare the landing page, checkout, welcome email, and first student flow.",
      },
    ],
  },
  {
    slug: "membership-growth-engine",
    title: "Membership Growth Engine",
    category: "Memberships",
    level: "Intermediate",
    duration: "4 modules",
    students: 186,
    progress: 54,
    summary: "Design a recurring membership with onboarding, retention, and content rhythm.",
    outcome: "A membership plan with tiers, protected content, and retention touchpoints.",
    lessons: [
      {
        slug: "membership-promise",
        title: "Membership Promise",
        minutes: 14,
        type: "Video",
        summary: "Make the recurring value obvious enough for members to stay.",
      },
      {
        slug: "content-calendar",
        title: "Content Calendar",
        minutes: 16,
        type: "Template",
        summary: "Plan monthly drops, live sessions, and community prompts.",
      },
      {
        slug: "retention-signals",
        title: "Retention Signals",
        minutes: 11,
        type: "Analytics",
        summary: "Track engagement signals before members cancel.",
      },
    ],
  },
  {
    slug: "sales-funnel-starter",
    title: "Sales Funnel Starter",
    category: "Funnels",
    level: "Beginner",
    duration: "3 modules",
    students: 321,
    progress: 38,
    summary: "Build a simple funnel that captures leads and sells a starter product.",
    outcome: "A complete lead magnet, nurture sequence, and checkout path.",
    lessons: [
      {
        slug: "lead-magnet",
        title: "Lead Magnet",
        minutes: 9,
        type: "Guide",
        summary: "Create the small win that earns trust and captures the email.",
      },
      {
        slug: "nurture-sequence",
        title: "Nurture Sequence",
        minutes: 13,
        type: "Email",
        summary: "Write the first three emails that educate and invite action.",
      },
      {
        slug: "checkout-flow",
        title: "Checkout Flow",
        minutes: 15,
        type: "Build",
        summary: "Connect the offer page, checkout, confirmation, and delivery page.",
      },
    ],
  },
];

export function getCourse(slug) {
  return courses.find((course) => course.slug === slug);
}

export function getLesson(courseSlug, lessonSlug) {
  const course = getCourse(courseSlug);
  return course?.lessons.find((lesson) => lesson.slug === lessonSlug);
}

export function getNextLesson(course, lessonSlug) {
  const index = course.lessons.findIndex((lesson) => lesson.slug === lessonSlug);
  return index >= 0 ? course.lessons[index + 1] : undefined;
}
