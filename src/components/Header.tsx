"use client";

import Link from "next/link";
import { Film, Home, LayoutDashboard } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <Film className="w-7 h-7 text-accent group-hover:scale-110 transition-transform" />
            <div>
              <span className="text-lg font-bold tracking-tight">
                Haya Qalbi
              </span>
              <span className="hidden sm:inline text-muted text-sm ml-2">
                Season 8
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Episodes</span>
            </Link>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
