export interface FAQItem {
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
}

export interface SEOContent {
  summary: string;
  summaryAr: string;
  keyEvents: string[];
  keyEventsAr: string[];
  characterAnalysis: string;
  characterAnalysisAr: string;
  sceneExplanation: string;
  sceneExplanationAr: string;
  hiddenDetails: string;
  hiddenDetailsAr: string;
  emotionalHighlights: string;
  emotionalHighlightsAr: string;
  faq: FAQItem[];
}

export interface Episode {
  id: number;
  videoId: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  thumbnail: string;
  youtubeUrl: string;
  publishedAt: string;
  seoTitle: string;
  seoTitleAr: string;
  seoDescription: string;
  seoDescriptionAr: string;
  seoContent: SEOContent;
  slug: string;
}

export interface AnalyticsEntry {
  timestamp: string;
  path: string;
  referrer: string;
  country: string;
  device: string;
  userAgent: string;
}

export interface AnalyticsSummary {
  totalViews: number;
  uniquePaths: Record<string, number>;
  referrers: Record<string, number>;
  countries: Record<string, number>;
  devices: Record<string, number>;
  dailyViews: Record<string, number>;
}

export interface EpisodesData {
  episodes: Episode[];
  lastUpdated: string;
}

export interface AnalyticsData {
  entries: AnalyticsEntry[];
  summary: AnalyticsSummary;
}
