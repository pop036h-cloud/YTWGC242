import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import EpisodeGrid from "@/components/EpisodeGrid";
import SchemaMarkup from "@/components/SchemaMarkup";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { getAllEpisodes } from "@/lib/episodes";
import {
  generateWebsiteSchema,
  generateTVSeriesSchema,
} from "@/lib/seo";

export const revalidate = 3600;

export default async function HomePage() {
  const episodes = await getAllEpisodes();
  const featured = episodes[0];

  const schemas = [
    generateWebsiteSchema(),
    generateTVSeriesSchema(episodes.length),
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <AnalyticsTracker path="/" />
      <Header />
      <main className="flex-1">
        {featured && (
          <HeroSection
            featuredEpisode={featured}
            totalEpisodes={episodes.length}
          />
        )}

        <section id="episodes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">All Episodes</h2>
            <p className="text-muted">
              Browse all {episodes.length} episodes with full analysis and
              YouTube embeds
            </p>
          </div>
          <EpisodeGrid episodes={episodes} />
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">
              About Haya Qalbi Season 8
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Welcome to the ultimate guide for <strong className="text-foreground">Haya Qalbi Season 8</strong> (حياة
                قلبي الجزء الثامن). Our platform provides comprehensive,
                original episode analysis designed to enhance your viewing
                experience and help you discover every hidden detail.
              </p>
              <p>
                Each episode page includes an embedded YouTube player (we never
                host or download videos), a detailed 800+ word summary,
                character analysis, scene breakdowns, fan theories, emotional
                highlights, and SEO-optimized FAQ sections in both English and
                Arabic.
              </p>
              <p>
                Whether you&apos;re searching for episode summaries, character
                breakdowns, or the latest theories, this is your home for
                everything Haya Qalbi Season 8.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
