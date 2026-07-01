import { NextResponse } from "next/server";
import { updateEpisode, deleteEpisode, getEpisodeById } from "@/lib/episodes";

interface RouteParams {
  params: Promise<{ id: string }>;
}

function isAuthorized(request: Request): boolean {
  const cookie = request.headers.get("cookie") || "";
  return cookie.includes(
    `admin_auth=${process.env.ADMIN_PASSWORD || "admin123"}`
  );
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const episode = await getEpisodeById(parseInt(id));
  if (!episode) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ episode });
}

export async function PUT(request: Request, { params }: RouteParams) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const episode = await updateEpisode(parseInt(id), body);

  if (!episode) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ episode });
}

export async function DELETE(request: Request, { params }: RouteParams) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const success = await deleteEpisode(parseInt(id));

  if (!success) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
