import type { MetadataRoute } from "next";
import { getAllEpisodes } from "@/lib/episodes";
import { getSiteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const episodes = await getAllEpisodes();

  const episodeEntries: MetadataRoute.Sitemap = episodes.map((episode) => ({
    url: `${siteUrl}/episode/${episode.slug}`,
    lastModified: new Date(episode.publishedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...episodeEntries,
  ];
}
