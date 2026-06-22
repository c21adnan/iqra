const modules = [
  ["Website Builder", "Create pages and publish your brand."],
  ["Courses", "Build lessons and track student progress."],
  ["Customers", "Manage accounts, access, and activity."],
  ["Payments", "Sell products and recurring memberships."],
  ["Email", "Send broadcasts and automated sequences."],
  ["Funnels", "Turn visitors into leads and customers."],
  ["Memberships", "Create protected communities and content."],
  ["Analytics", "Understand revenue, reach, and engagement."],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f2] text-[#17221d]">
      <header className="border-b border-black/10 bg-[#f7f7f2]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[#173f35] text-sm font-bold text-white">B</span>
            <div><p className="font-semibold tracking-tight">BREU</p><p className="text-xs text-black/50">Creator operating system</p></div>
          </div>
          <span className="rounded-full border border-[#173f35]/20 bg-white px-4 py-2 text-xs font-semibold text-[#173f35]">Doteasy Node test</span>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#b15e35]">Platform foundation</p>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-7xl">Run your digital business from one place.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-black/60">Build your site, sell knowledge, grow a membership, and understand what is working without stitching together a dozen tools.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button className="rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#173f35]/15">Create your workspace</button>
            <button className="rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-semibold">View platform modules</button>
          </div>
        </div>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map(([name, description], index) => (
            <article key={name} className="group rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-8 flex items-center justify-between"><span className="text-xs font-semibold text-black/35">0{index + 1}</span><span className="size-2 rounded-full bg-[#dc9b68] transition group-hover:scale-150" /></div>
              <h2 className="font-semibold tracking-tight">{name}</h2><p className="mt-2 text-sm leading-6 text-black/55">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
