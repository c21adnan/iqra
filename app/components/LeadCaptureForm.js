export default function LeadCaptureForm() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <form action="/lead-capture.php" className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm" method="post">
        <input name="source" type="hidden" value="iqra-funnel-consent-v1" />
        <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
          <label>
            Leave this field empty
            <input autoComplete="off" name="website" tabIndex={-1} type="text" />
          </label>
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8f4322]">Lead capture</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Join the launch list.</h2>
        <p className="mt-3 leading-7 text-black/55">
          This form posts to a small cPanel PHP handler. Leads are saved to a CSV file outside the public website folder,
          so it works on Doteasy without a Node server.
        </p>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold">
            Name
            <input
              className="rounded-2xl border border-black/10 bg-[#f7f7f2] px-4 py-3 font-normal outline-none focus:border-[#173f35]"
              name="name"
              placeholder="Your name"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Email
            <input
              className="rounded-2xl border border-black/10 bg-[#f7f7f2] px-4 py-3 font-normal outline-none focus:border-[#173f35]"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Main goal
            <select
              className="rounded-2xl border border-black/10 bg-[#f7f7f2] px-4 py-3 font-normal outline-none focus:border-[#173f35]"
              name="goal"
            >
              <option>Launch my first course</option>
              <option>Sell a membership</option>
              <option>Build a sales funnel</option>
              <option>Move my business into one platform</option>
            </select>
          </label>
          <label className="flex items-start gap-3 rounded-2xl border border-black/10 bg-[#f7f7f2] p-4 text-sm leading-6 text-black/70">
            <input className="mt-1 size-4 shrink-0 accent-[#173f35]" name="consent" required type="checkbox" value="yes" />
            <span>
              I agree to receive IQRA launch and educational emails. I can unsubscribe at any time.
            </span>
          </label>
        </div>

        <button className="mt-6 w-full rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white" type="submit">
          Capture lead
        </button>
      </form>

      <aside className="rounded-[2rem] bg-[#173f35] p-6 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/75">Where leads go</p>
        <div className="mt-5 grid gap-3">
          {[
            ["Storage", "Saved as CSV outside the public web folder."],
            ["Next", "Connect the same form to Brevo, Mailchimp, HubSpot, or ConvertKit."],
            ["Offer path", "The thank-you screen points warm leads toward pricing and checkout."],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white/10 p-4">
              <p className="font-semibold">{label}</p>
              <p className="mt-2 text-sm leading-6 text-white/80">{value}</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
