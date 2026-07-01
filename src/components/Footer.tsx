import Link from "next/link";
import { Heart, Video } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3">
              Haya Qalbi Season 8
            </h3>
            <p className="text-muted text-sm leading-relaxed">
              حياة قلبي الجزء الثامن — Your complete episode guide with
              analysis, summaries, and SEO-optimized content. Transformative
              commentary and drama breakdowns.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  All Episodes
                </Link>
              </li>
              <li>
                <Link
                  href="/episode/episode-1"
                  className="hover:text-accent transition-colors"
                >
                  Episode 1
                </Link>
              </li>
              <li>
                <Link
                  href="/episode/episode-2"
                  className="hover:text-accent transition-colors"
                >
                  Episode 2
                </Link>
              </li>
              <li>
                <Link
                  href="/episode/episode-3"
                  className="hover:text-accent transition-colors"
                >
                  Episode 3
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted">
              Source & Credits
            </h4>
            <p className="text-sm text-muted leading-relaxed flex items-start gap-2">
              <Video className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
              All videos are embedded from YouTube. We do not host or download
              video content. Original analysis and summaries only.
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>
            &copy; {new Date().getFullYear()} Haya Qalbi S8 Platform. All
            rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-accent" /> for drama fans
          </p>
        </div>
      </div>
    </footer>
  );
}
