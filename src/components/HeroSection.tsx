import Link from "next/link";
import Image from "next/image";
import { Play, ChevronRight } from "lucide-react";
import type { Episode } from "@/lib/types";

interface HeroSectionProps {
  featuredEpisode: Episode;
  totalEpisodes: number;
}

export default function HeroSection({
  featuredEpisode,
  totalEpisodes,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[70vh] flex items-end">
      <div className="absolute inset-0">
        <Image
          src={featuredEpisode.thumbnail}
          alt="Haya Qalbi Season 8"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32 w-full">
        <div className="max-w-2xl fade-in">
          <span className="inline-block bg-accent text-white text-xs font-bold px-3 py-1 rounded mb-4">
            SEASON 8
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Haya Qalbi
            <span className="block text-2xl sm:text-3xl font-bold text-muted mt-2">
              حياة قلبي الجزء الثامن
            </span>
          </h1>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Complete episode guides with in-depth analysis, character
            breakdowns, hidden details, and SEO-optimized summaries for all{" "}
            {totalEpisodes} episodes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/episode/${featuredEpisode.slug}`}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105"
            >
              <Play className="w-5 h-5 fill-white" />
              Watch Episode 1
            </Link>
            <a
              href="#episodes"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-lg transition-all"
            >
              Browse All Episodes
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
