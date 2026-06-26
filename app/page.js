import Link from "next/link";

const modules = [
  ["Website Builder", "Publish landing pages, sales pages, and content hubs."],
  ["Course Hosting", "Structure lessons, modules, downloads, and student progress."],
  ["User Accounts", "Give every learner and customer a secure workspace."],
  ["Payments", "Sell one-time offers, subscriptions, bundles, and memberships."],
  ["Email Marketing", "Send broadcasts, onboarding emails, and launch sequences."],
  ["Sales Funnels", "Connect opt-ins, offers, order bumps, and follow-up pages."],
  ["Memberships", "Protect premium communities, libraries, and recurring content."],
  ["Analytics", "Track revenue, subscribers, course progress, and funnel conversion."],
];

const stats = [
  ["8", "core product modules"],
  ["1", "connected creator workspace"],
  ["24/7", "self-serve customer access"],
];

export default function Home() {
  return (
    <main>
      <Header />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#b15e35]">
            IQRA platform foundation
          </p>
          <h1 className="text-5xl font-semibold leading-[1.03] tracking-[-0.05em] sm:text-7xl">
            Build, teach, sell, and grow from one place.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-black/60">
            IQRA is the first version of your all-in-one SaaS platform: website builder, online courses, memberships,
            payments, email, funnels, and analytics in one calm operating system.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link className="rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#173f35]/15" href="/register/">
              Create your workspace
            </Link>
            <Link className="rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-semibold" href="/courses/">
              Explore courses
            </Link>
            <Link className="rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-semibold" href="/builder/">
              Open builder
            </Link>
            <Link className="rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-semibold" href="/memberships/">
              View memberships
            </Link>
            <Link className="rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-semibold" href="/email/">
              Open email
            </Link>
            <Link className="rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-semibold" href="/funnel/">
              Test funnel
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-2xl shadow-[#173f35]/10">
          <div className="rounded-[1.5rem] bg-[#173f35] p-6 text-white">
            <div className="flex items-center justify-between border-b border-white/15 pb-5">
              <div>
                <p className="text-sm text-white/60">Workspace</p>
                <h2 className="text-2xl font-semibold">Creator Command Center</h2>
              </div>
              <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold">Live prototype</span>
            </div>
            <div className="mt-6 grid gap-3">
              {["New course launch", "Membership onboarding", "Stripe checkout", "Email sequence"].map((item, index) => (
                <div key={item} className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
                  <span>{item}</span>
                  <span className="text-sm text-white/55">{index === 0 ? "Active" : "Ready"}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {stats.map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-black/10 p-4">
                <p className="text-2xl font-semibold">{value}</p>
                <p className="mt-1 text-xs leading-5 text-black/50">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="modules" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b15e35]">Platform modules</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">The pieces we will build next</h2>
          </div>
          <Link className="text-sm font-semibold text-[#173f35]" href="/pricing/">
            See starter pricing
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map(([name, description], index) => (
            <article key={name} className="group rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-semibold text-black/35">0{index + 1}</span>
                <span className="size-2 rounded-full bg-[#dc9b68] transition group-hover:scale-150" />
              </div>
              <h3 className="font-semibold tracking-tight">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-black/55">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-black/10 bg-[#f7f7f2]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link className="flex items-center gap-3" href="/">
          <span className="grid size-10 place-items-center rounded-xl bg-[#173f35] text-sm font-bold text-white">I</span>
          <div>
            <p className="font-semibold tracking-tight">IQRA</p>
            <p className="text-xs text-black/50">Creator operating system</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-black/60 md:flex">
          <Link href="/builder/">Builder</Link>
          <Link href="/courses/">Courses</Link>
          <Link href="/memberships/">Memberships</Link>
          <Link href="/email/">Email</Link>
          <Link href="/funnel/">Funnel</Link>
          <Link href="/analytics/">Analytics</Link>
          <Link href="/pricing/">Pricing</Link>
          <Link href="/dashboard/">Dashboard</Link>
          <Link href="/account/">Account</Link>
        </nav>
        <Link
          className="rounded-full border border-[#173f35]/20 bg-white px-4 py-2 text-xs font-semibold text-[#173f35]"
          href="/login/"
        >
          Sign in
        </Link>
      </div>
    </header>
  );
}
