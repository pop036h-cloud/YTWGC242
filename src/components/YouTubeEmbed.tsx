"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { getEmbedUrl, getWatchUrl } from "@/lib/youtube";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

export default function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="space-y-4">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-card border border-border">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <iframe
          src={`${getEmbedUrl(videoId)}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-xs text-muted">
          Video embedded from YouTube. Source:{" "}
          <span className="text-red-400">YouTube</span>
        </p>
        <a
          href={getWatchUrl(videoId)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Watch on YouTube
        </a>
      </div>
    </div>
  );
}
