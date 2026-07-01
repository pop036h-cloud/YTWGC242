# Haya Qalbi Season 8 - Deployment Guide

Production-ready SEO platform for **حياة قلبي الجزء الثامن**.

## Quick Start (Local)

```bash
cd haya-qalbi-s8
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Default admin password: `admin123` (change in `.env.local`)

---

## Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Haya Qalbi S8 SEO platform"
git remote add origin https://github.com/YOUR_USERNAME/haya-qalbi-s8.git
git push -u origin main
```

### 2. Import in Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Framework Preset: **Next.js** (auto-detected)
4. Add Environment Variables:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-project.vercel.app` |
| `ADMIN_PASSWORD` | Your secure admin password |

5. Click **Deploy**

### 3. Enable Vercel Analytics

1. Open your project in Vercel Dashboard
2. Go to **Analytics** tab
3. Click **Enable**
4. Analytics will automatically track visitors, page views, countries, and devices

The `@vercel/analytics` package is already integrated in `src/app/layout.tsx`.

---

## Project Structure

```
haya-qalbi-s8/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home (Netflix-style grid)
│   │   ├── episode/[id]/page.tsx # Episode pages (SSG)
│   │   ├── admin/page.tsx        # Admin dashboard
│   │   ├── api/                  # REST API routes
│   │   ├── sitemap.ts            # Auto-generated sitemap
│   │   └── robots.ts             # SEO robots.txt
│   ├── components/               # UI components
│   ├── data/
│   │   ├── episodes.json         # Episode storage
│   │   └── analytics.json        # Analytics storage
│   └── lib/                      # Utilities & business logic
├── .env.example
└── DEPLOYMENT.md
```

---

## Episodes (Pre-loaded)

| Episode | Video ID | URL |
|---------|----------|-----|
| 1 | `xNtgN8du1CU` | `/episode/episode-1` |
| 2 | `5V5y0NHZvx4` | `/episode/episode-2` |
| 3 | `PdiMXjEt43o` | `/episode/episode-3` |

---

## Admin Dashboard

Access at `/admin`

Features:
- View all episodes
- Edit titles & SEO metadata
- Add new YouTube links (auto-generates pages)
- Delete episodes
- View analytics (page views, referrers, countries, devices)

---

## SEO Features

- Unique meta title & description per episode
- OpenGraph & Twitter Card tags
- Canonical URLs
- Auto-generated `sitemap.xml`
- `robots.txt` with admin/API exclusion
- VideoObject JSON-LD schema per episode
- FAQPage schema for rich snippets
- BreadcrumbList schema
- TVSeries & WebSite schema on homepage
- Bilingual content (English + Arabic toggle)
- Internal linking between episodes
- ISR revalidation (1 hour)

---

## YouTube Compliance

- Videos embedded via official YouTube iframe only
- No video downloading or hosting
- YouTube credited as source on every page
- "Watch on YouTube" button on all episode pages
- Timestamps stripped from URLs
- oEmbed API used for metadata only

---

## Custom Domain

1. Vercel Dashboard → Settings → Domains
2. Add your domain (e.g., `hayaqalbi.com`)
3. Update `NEXT_PUBLIC_SITE_URL` to your domain
4. Redeploy

---

## Google Search Console

1. Verify domain ownership
2. Submit sitemap: `https://your-domain.com/sitemap.xml`
3. Request indexing for homepage and episode pages

---

## Performance

- Static generation for episode pages (SSG)
- ISR with 1-hour revalidation
- Lazy-loaded YouTube iframes
- Optimized YouTube thumbnails via `next/image`
- Minimal client-side JavaScript

---

## Troubleshooting

**Admin login not working:** Check `ADMIN_PASSWORD` env variable matches.

**Images not loading:** Verify `img.youtube.com` is in `next.config.ts` remote patterns.

**Analytics empty:** Visit pages to generate data. Vercel Analytics requires dashboard enablement.

**Build fails on Vercel:** Ensure all env variables are set in Vercel project settings.
