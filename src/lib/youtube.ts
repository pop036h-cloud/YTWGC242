const YOUTUBE_VIDEO_REGEX =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

export function extractVideoId(url: string): string | null {
  const match = url.match(YOUTUBE_VIDEO_REGEX);
  return match ? match[1] : null;
}

export function cleanYouTubeUrl(url: string): string {
  const videoId = extractVideoId(url);
  if (!videoId) return url;
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function getEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

export function getThumbnailUrl(
  videoId: string,
  quality: "default" | "medium" | "high" | "maxres" = "maxres"
): string {
  const qualityMap = {
    default: "default",
    medium: "mqdefault",
    high: "hqdefault",
    maxres: "maxresdefault",
  };
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

export function getWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export interface YouTubeOEmbed {
  title: string;
  author_name: string;
  thumbnail_url: string;
}

export async function fetchYouTubeMetadata(
  videoId: string
): Promise<YouTubeOEmbed | null> {
  try {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
