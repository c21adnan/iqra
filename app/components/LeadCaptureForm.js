"use client";

import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  goal: "Launch my first course",
};

export default function LeadCaptureForm() {
  const [form, setForm] = useState(initialForm);
  const [leads, setLeads] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem("iqra-leads");
    if (saved) {
      setLeads(JSON.parse(saved));
    }
  }, []);

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const lead = {
      ...form,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const nextLeads = [lead, ...leads].slice(0, 5);

    setLeads(nextLeads);
    window.localStorage.setItem("iqra-leads", JSON.stringify(nextLeads));
    setForm(initialForm);
    setStatus("Lead captured in this browser. Next we can connect this to Brevo, Mailchimp, HubSpot, or a cPanel PHP handler.");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <form className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b15e35]">Lead capture</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Join the launch list.</h2>
        <p className="mt-3 leading-7 text-black/55">
          This prototype captures the lead locally first, so the funnel is usable on static Doteasy hosting. The same
          form can later post to an email platform or a small cPanel PHP endpoint.
        </p>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold">
            Name
            <input
              className="rounded-2xl border border-black/10 bg-[#f7f7f2] px-4 py-3 font-normal outline-none focus:border-[#173f35]"
              name="name"
              onChange={updateField}
              placeholder="Your name"
              required
              value={form.name}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Email
            <input
              className="rounded-2xl border border-black/10 bg-[#f7f7f2] px-4 py-3 font-normal outline-none focus:border-[#173f35]"
              name="email"
              onChange={updateField}
              placeholder="you@example.com"
              required
              type="email"
              value={form.email}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Main goal
            <select
              className="rounded-2xl border border-black/10 bg-[#f7f7f2] px-4 py-3 font-normal outline-none focus:border-[#173f35]"
              name="goal"
              onChange={updateField}
              value={form.goal}
            >
              <option>Launch my first course</option>
              <option>Sell a membership</option>
              <option>Build a sales funnel</option>
              <option>Move my business into one platform</option>
            </select>
          </label>
        </div>

        <button className="mt-6 w-full rounded-xl bg-[#173f35] px-5 py-3 text-sm font-semibold text-white" type="submit">
          Capture lead
        </button>
        {status ? <p className="mt-4 rounded-2xl bg-[#f7f7f2] p-4 text-sm leading-6 text-[#173f35]">{status}</p> : null}
      </form>

      <aside className="rounded-[2rem] bg-[#173f35] p-6 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/55">Recent prototype leads</p>
        <div className="mt-5 grid gap-3">
          {leads.length ? (
            leads.map((lead) => (
              <div key={lead.id} className="rounded-2xl bg-white/10 p-4">
                <p className="font-semibold">{lead.name}</p>
                <p className="mt-1 text-sm text-white/60">{lead.email}</p>
                <p className="mt-3 rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">{lead.goal}</p>
              </div>
            ))
          ) : (
            <p className="rounded-2xl bg-white/10 p-4 text-sm leading-6 text-white/65">
              No leads captured in this browser yet. Add one to test the funnel flow.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
