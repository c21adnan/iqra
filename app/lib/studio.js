export const studioModules = [
  {
    title: "Module 1 · Define the offer",
    status: "Published",
    lessons: [
      ["Welcome and course roadmap", "Video", "08:42", "Ready"],
      ["Choose the learner outcome", "Video", "12:18", "Ready"],
      ["Offer worksheet", "PDF", "4 pages", "Ready"],
    ],
  },
  {
    title: "Module 2 · Build the curriculum",
    status: "Draft",
    lessons: [
      ["Map the transformation", "Video", "18:05", "Processing"],
      ["Organize modules and lessons", "Video", "14:30", "Upload needed"],
      ["Curriculum template", "Download", "DOCX", "Ready"],
    ],
  },
  {
    title: "Module 3 · Launch",
    status: "Outline",
    lessons: [
      ["Prepare the sales page", "Video", "10:00", "Planned"],
      ["Connect checkout and access", "Workshop", "25:00", "Planned"],
    ],
  },
];

export const videoFlow = [
  ["1. Create lesson", "IQRA saves the title, module, access rule, and draft status."],
  ["2. Request upload", "The backend creates a short-lived, one-time upload URL."],
  ["3. Upload directly", "The creator's browser sends the file to the video provider, never through Doteasy."],
  ["4. Process video", "The provider encodes adaptive 360p–1080p streams and generates thumbnails."],
  ["5. Publish", "A webhook returns the playback ID; IQRA attaches it to the lesson and enables viewing."],
];

export const courseFeatures = [
  ["Curriculum editor", "Modules, lessons, ordering, drafts, prerequisites, and drip release dates."],
  ["Video delivery", "Adaptive streaming, signed playback, captions, thumbnails, and playback analytics."],
  ["Learning tools", "Downloads, quizzes, assignments, completion tracking, notes, and certificates."],
  ["Commerce", "One-time access, subscriptions, bundles, coupons, trials, and plan-based permissions."],
  ["Student support", "Announcements, comments, email reminders, instructor profiles, and searchable help."],
  ["Operations", "Enrollment reports, refunds, content versioning, moderation, exports, and audit history."],
];

export const implementationPhases = [
  ["Now", "Course Studio and external-video architecture", "Mapped"],
  ["Phase 2", "MySQL course, module, lesson, and media records", "Next"],
  ["Phase 3", "Provider account, direct uploads, processing webhooks, and signed playback", "Provider needed"],
  ["Phase 4", "Progress tracking, quizzes, drip schedules, and certificates", "Planned"],
  ["Phase 5", "Instructor workspaces, course analytics, and mobile optimization", "Planned"],
];
