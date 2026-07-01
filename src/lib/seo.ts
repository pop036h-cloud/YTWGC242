import type { Episode } from "./types";
import { getEmbedUrl, getThumbnailUrl } from "./youtube";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://haya-qalbi-s8.vercel.app";
const SITE_NAME = "Haya Qalbi Season 8 | حياة قلبي الجزء الثامن";

export function getSiteUrl(): string {
  return SITE_URL;
}

export function getSiteName(): string {
  return SITE_NAME;
}

export function getEpisodeUrl(episode: Episode): string {
  return `${SITE_URL}/episode/${episode.slug}`;
}

export function generateVideoSchema(episode: Episode) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: episode.seoTitle,
    description: episode.seoDescription,
    embedUrl: getEmbedUrl(episode.videoId),
    thumbnailUrl: getThumbnailUrl(episode.videoId),
    uploadDate: episode.publishedAt,
    contentUrl: episode.youtubeUrl,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

export function generateBreadcrumbSchema(episode: Episode) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: episode.title,
        item: getEpisodeUrl(episode),
      },
    ],
  };
}

export function generateFAQSchema(episode: Episode) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: episode.seoContent.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Complete episode guide, analysis, and summaries for Haya Qalbi Season 8 (حياة قلبي الجزء الثامن)",
    inLanguage: ["en", "ar"],
  };
}

export function generateTVSeriesSchema(episodeCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: "Haya Qalbi Season 8",
    alternateName: "حياة قلبي الجزء الثامن",
    description:
      "Turkish-Arabic drama series analysis and episode guides for Season 8",
    numberOfEpisodes: episodeCount,
    inLanguage: ["en", "ar"],
    url: SITE_URL,
  };
}
