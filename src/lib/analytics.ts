import type { AnalyticsData, AnalyticsEntry } from "./types";
import { readAnalytics, writeAnalytics } from "./storage";

function detectDevice(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (/mobile|android|iphone|ipad|ipod/.test(ua)) return "Mobile";
  if (/tablet|ipad/.test(ua)) return "Tablet";
  return "Desktop";
}

function getReferrerDomain(referrer: string): string {
  if (!referrer || referrer === "direct") return "Direct";
  try {
    return new URL(referrer).hostname.replace("www.", "");
  } catch {
    return referrer;
  }
}

function getTodayKey(): string {
  return new Date().toISOString().split("T")[0];
}

function updateSummary(data: AnalyticsData, entry: AnalyticsEntry) {
  data.summary.totalViews += 1;

  data.summary.uniquePaths[entry.path] =
    (data.summary.uniquePaths[entry.path] || 0) + 1;

  const refDomain = getReferrerDomain(entry.referrer);
  data.summary.referrers[refDomain] =
    (data.summary.referrers[refDomain] || 0) + 1;

  const country = entry.country || "Unknown";
  data.summary.countries[country] =
    (data.summary.countries[country] || 0) + 1;

  data.summary.devices[entry.device] =
    (data.summary.devices[entry.device] || 0) + 1;

  const today = getTodayKey();
  data.summary.dailyViews[today] =
    (data.summary.dailyViews[today] || 0) + 1;
}

export async function trackPageView(
  path: string,
  referrer: string,
  country: string,
  userAgent: string
): Promise<void> {
  const data = await readAnalytics();

  const entry: AnalyticsEntry = {
    timestamp: new Date().toISOString(),
    path,
    referrer,
    country,
    device: detectDevice(userAgent),
    userAgent,
  };

  data.entries.push(entry);

  // Keep last 10000 entries
  if (data.entries.length > 10000) {
    data.entries = data.entries.slice(-10000);
  }

  updateSummary(data, entry);
  await writeAnalytics(data);
}

export async function getAnalyticsSummary() {
  return readAnalytics();
}
