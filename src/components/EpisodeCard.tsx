"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Clock } from "lucide-react";
import type { Episode } from "@/lib/types";

interface EpisodeCardProps {
  episode: Episode;
  index: number;
}

export default function EpisodeCard({ episode, index }: EpisodeCardProps) {
  return (
    <Link
      href={`/episode/${episode.slug}`}
      className="group relative block fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-video rounded-lg overflow-hidden bg-card card-glow transition-all duration-300 group-hover:scale-[1.03]">
        <Image
          src={episode.thumbnail}
          alt={`${episode.title} thumbnail`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-accent/90 flex items-center justify-center backdrop-blur-sm">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>
        </div>

        <div className="absolute top-3 left-3">
          <span className="bg-accent text-white text-xs font-bold px-2.5 py-1 rounded">
            EP {episode.id}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-bold text-sm sm:text-base line-clamp-2 group-hover:text-accent transition-colors">
            {episode.title}
          </h3>
          <p className="text-xs text-muted mt-1 line-clamp-2 hidden sm:block">
            {episode.description}
          </p>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2 text-xs text-muted">
        <Clock className="w-3 h-3" />
        <span>Episode {episode.id}</span>
        <span className="text-border">|</span>
        <span className="font-arabic">{episode.titleAr}</span>
      </div>
    </Link>
  );
}
