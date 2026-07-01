import { NextResponse } from "next/server";
import { getAnalyticsSummary, trackPageView } from "@/lib/analytics";

export async function GET() {
  const data = await getAnalyticsSummary();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { path, referrer } = body;

  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    "Unknown";
  const userAgent = request.headers.get("user-agent") || "";

  await trackPageView(path || "/", referrer || "direct", country, userAgent);

  return NextResponse.json({ success: true });
}
