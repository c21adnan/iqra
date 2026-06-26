"use client";

import { useEffect, useState } from "react";

export default function LiveLeadMetric({ fallback = "312", note = "from funnel opt-ins" }) {
  const [data, setData] = useState(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/analytics-data.php", {
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Analytics endpoint unavailable");
        }
        return response.json();
      })
      .then((payload) => {
        if (Number.isInteger(payload.captured_leads) && payload.captured_leads >= 0) {
          setData(payload);
          return;
        }
        throw new Error("Invalid analytics response");
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setUnavailable(true);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <p className="mt-3 text-3xl font-semibold">{data ? data.captured_leads.toLocaleString() : fallback}</p>
      <p className="mt-2 text-sm text-[#b15e35]">
        {data
          ? `${data.leads_last_7_days.toLocaleString()} added in the last 7 days · Live`
          : unavailable
            ? `${note} · Preview`
            : "Connecting to live lead data..."}
      </p>
    </>
  );
}
