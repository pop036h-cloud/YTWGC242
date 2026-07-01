"use client";

import type { Episode } from "@/lib/types";
import EpisodeCard from "./EpisodeCard";

interface EpisodeGridProps {
  episodes: Episode[];
}

export default function EpisodeGrid({ episodes }: EpisodeGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {episodes.map((episode, index) => (
        <EpisodeCard key={episode.id} episode={episode} index={index} />
      ))}
    </div>
  );
}
