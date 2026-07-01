import { promises as fs } from "fs";
import path from "path";
import type { AnalyticsData, EpisodesData } from "./types";

const DATA_DIR = path.join(process.cwd(), "src", "data");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readEpisodes(): Promise<EpisodesData> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, "episodes.json");
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return { episodes: [], lastUpdated: new Date().toISOString() };
  }
}

export async function writeEpisodes(data: EpisodesData): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, "episodes.json");
  data.lastUpdated = new Date().toISOString();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function readAnalytics(): Promise<AnalyticsData> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, "analytics.json");
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return {
      entries: [],
      summary: {
        totalViews: 0,
        uniquePaths: {},
        referrers: {},
        countries: {},
        devices: {},
        dailyViews: {},
      },
    };
  }
}

export async function writeAnalytics(data: AnalyticsData): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, "analytics.json");
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}
