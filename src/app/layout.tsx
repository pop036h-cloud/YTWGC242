import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://haya-qalbi-s8.vercel.app"
  ),
  // إضافة كود التحقق هنا
  verification: {
    google: "gC_Iv7xA-Er5KCShoGYVy70abbTgyl13cLLD-c451i0", 
  },
  title: {
    default:
      "Haya Qalbi Season 8 - Episode Guide & Analysis | حياة قلبي الجزء 8",
    template: "%s | Haya Qalbi S8",
  },
  description:
    "Complete Haya Qalbi Season 8 episode guide with analysis, summaries, character breakdowns, and hidden details. Watch all episodes with SEO-optimized content in Arabic & English.",
  keywords: [
    "Haya Qalbi",
    "حياة قلبي",
    "Season 8",
    "episode guide",
    "drama analysis",
    "Turkish drama",
    "Arabic drama",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
    siteName: "Haya Qalbi Season 8",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}