"use client";

import { useEffect } from "react";

export default function AnalyticsTracker({ path }: { path: string }) {
  useEffect(() => {
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path,
        referrer: document.referrer || "direct",
      }),
    }).catch(() => {});
  }, [path]);

  return null;
}
