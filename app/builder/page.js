import Link from "next/link";
import { builderBlocks, publishChecklist, sitePages, themeSettings } from "../lib/builder";

export default function BuilderPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Link className="text-sm font-semibold text-[#173f35]" href="/dashboard/">
        Back to dashboard
      </Link>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b15e35]">Website builder module</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">
            Compose pages from reusable blocks.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-black/60">
            This builder preview maps the page system IQRA needs: page inventory, section blocks, theme settings, and a
            publishing checklist that works with static Doteasy deployment today.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white" href="/funnel/">
              Preview funnel page
            </Link>
            <Link className="rounded-xl border border-black/15 bg-white px-5 py-3 text-sm font-semibold" href="/pricing/">
              Preview pricing page
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-xl shadow-[#173f35]/10">
          <div className="rounded-[1.5rem] bg-[#173f35] p-6 text-white">
            <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-5">
              <div>
                <p className="text-sm text-white/60">Current site</p>
                <h2 className="text-2xl font-semibold">IQRA marketing site</h2>
              </div>
              <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold">Static publish</span>
            </div>
            <div className="mt-6 grid gap-3">
              {themeSettings.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
                  <span>{label}</span>
                  <span className="text-sm text-white/60">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-[2rem] border border-black/10 bg-white p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b15e35]">Pages</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Site page inventory</h2>
          </div>
          <Link className="text-sm font-semibold text-[#173f35]" href="/analytics/">
            View analytics
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {sitePages.map((page) => (
            <article key={page.slug} className="rounded-2xl bg-[#f7f7f2] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">{page.title}</h3>
                  <p className="mt-1 text-sm text-black/45">{page.path}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#173f35]">{page.status}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-black/55">{page.purpose}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {page.sections.map((section) => (
                  <span key={section} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black/45">
                    {section}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_380px]">
        <div className="rounded-[2rem] border border-black/10 bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b15e35]">Reusable blocks</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Block library</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {builderBlocks.map(([name, description]) => (
              <article key={name} className="rounded-2xl bg-[#f7f7f2] p-4">
                <h3 className="font-semibold">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-black/55">{description}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-black/10 bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b15e35]">Publish flow</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Checklist</h2>
          <div className="mt-6 grid gap-3">
            {publishChecklist.map((item, index) => (
              <div key={item} className="flex items-center justify-between gap-4 rounded-2xl bg-[#f7f7f2] p-4">
                <span className="font-medium">{item}</span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black/45">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
