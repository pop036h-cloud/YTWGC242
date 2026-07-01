import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Episode } from "@/lib/types";

interface EpisodeNavigationProps {
  prev: Episode | null;
  next: Episode | null;
}

export default function EpisodeNavigation({
  prev,
  next,
}: EpisodeNavigationProps) {
  return (
    <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-8 border-t border-border">
      {prev ? (
        <Link
          href={`/episode/${prev.slug}`}
          className="group flex items-center gap-3 bg-card border border-border rounded-lg p-4 hover:bg-card-hover transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-accent shrink-0" />
          <div>
            <p className="text-xs text-muted">Previous Episode</p>
            <p className="font-semibold group-hover:text-accent transition-colors">
              EP {prev.id}: {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/episode/${next.slug}`}
          className="group flex items-center justify-end gap-3 bg-card border border-border rounded-lg p-4 hover:bg-card-hover transition-colors sm:text-right"
        >
          <div>
            <p className="text-xs text-muted">Next Episode</p>
            <p className="font-semibold group-hover:text-accent transition-colors">
              EP {next.id}: {next.title}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-accent shrink-0" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
