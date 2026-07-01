import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import SEOContentSection from "@/components/SEOContent";
import EpisodeNavigation from "@/components/EpisodeNavigation";
import SchemaMarkup from "@/components/SchemaMarkup";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import {
  getEpisodeBySlug,
  getAllEpisodes,
  getAdjacentEpisodes,
} from "@/lib/episodes";
import {
  generateVideoSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  getEpisodeUrl,
} from "@/lib/seo";
import { getThumbnailUrl } from "@/lib/youtube";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const episodes = await getAllEpisodes();
  return episodes.map((ep) => ({ id: ep.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const episode = await getEpisodeBySlug(id);
  if (!episode) return { title: "Episode Not Found" };

  const url = getEpisodeUrl(episode);

  return {
    title: episode.seoTitle,
    description: episode.seoDescription,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        ar: url,
      },
    },
    openGraph: {
      title: episode.seoTitle,
      description: episode.seoDescription,
      url,
      type: "video.episode",
      images: [
        {
          url: getThumbnailUrl(episode.videoId),
          width: 1280,
          height: 720,
          alt: episode.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: episode.seoTitle,
      description: episode.seoDescription,
      images: [getThumbnailUrl(episode.videoId)],
    },
  };
}

export default async function EpisodePage({ params }: PageProps) {
  const { id } = await params;
  const episode = await getEpisodeBySlug(id);
  if (!episode) notFound();

  const { prev, next } = await getAdjacentEpisodes(episode.id);

  const schemas = [
    generateVideoSchema(episode),
    generateBreadcrumbSchema(episode),
    generateFAQSchema(episode),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <AnalyticsTracker path={`/episode/${episode.slug}`} />
      <Header />
      <main className="flex-1 pt-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="mb-8 fade-in">
            <span className="inline-block bg-accent text-white text-xs font-bold px-3 py-1 rounded mb-3">
              EPISODE {episode.id}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
              {episode.title}
            </h1>
            <p className="text-lg text-muted font-arabic mb-4">
              {episode.titleAr}
            </p>
            <p className="text-muted leading-relaxed">
              {episode.description}
            </p>
          </header>

          <section className="mb-12 fade-in">
            <YouTubeEmbed videoId={episode.videoId} title={episode.title} />
          </section>

          <SEOContentSection episode={episode} />

          <EpisodeNavigation prev={prev} next={next} />
        </article>
      </main>
      <Footer />
    </>
  );
}
