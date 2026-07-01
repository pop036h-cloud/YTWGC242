import { NextResponse } from "next/server";
import { getAllEpisodes, addEpisode } from "@/lib/episodes";

export async function GET() {
  const episodes = await getAllEpisodes();
  return NextResponse.json({ episodes });
}

export async function POST(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  if (!cookie.includes(`admin_auth=${process.env.ADMIN_PASSWORD || "admin123"}`)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { youtubeUrl } = body;

  if (!youtubeUrl) {
    return NextResponse.json(
      { error: "YouTube URL is required" },
      { status: 400 }
    );
  }

  const episode = await addEpisode(youtubeUrl);
  if (!episode) {
    return NextResponse.json(
      { error: "Invalid YouTube URL" },
      { status: 400 }
    );
  }

  return NextResponse.json({ episode }, { status: 201 });
}
