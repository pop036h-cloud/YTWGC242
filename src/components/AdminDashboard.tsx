"use client";

import { useState, useEffect, useCallback } from "react";
import {
  BarChart3,
  Eye,
  Globe,
  Monitor,
  Smartphone,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  RefreshCw,
  LogOut,
  Film,
} from "lucide-react";
import type { AnalyticsData, Episode } from "@/lib/types";

interface AdminDashboardProps {
  initialEpisodes: Episode[];
  initialAnalytics: AnalyticsData;
}

export default function AdminDashboard({
  initialEpisodes,
  initialAnalytics,
}: AdminDashboardProps) {
  const [episodes, setEpisodes] = useState(initialEpisodes);
  const [analytics, setAnalytics] = useState(initialAnalytics);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Episode>>({});
  const [newUrl, setNewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"episodes" | "analytics">(
    "episodes"
  );

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      const [epRes, anRes] = await Promise.all([
        fetch("/api/episodes"),
        fetch("/api/analytics"),
      ]);
      const epData = await epRes.json();
      const anData = await anRes.json();
      setEpisodes(epData.episodes || []);
      setAnalytics(anData);
    } catch {
      showMessage("Failed to refresh data");
    }
    setLoading(false);
  }, []);

  const handleAddEpisode = async () => {
    if (!newUrl.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/episodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ youtubeUrl: newUrl }),
      });
      const data = await res.json();
      if (data.episode) {
        setEpisodes((prev) => [...prev, data.episode]);
        setNewUrl("");
        showMessage("Episode added successfully!");
      } else {
        showMessage(data.error || "Failed to add episode");
      }
    } catch {
      showMessage("Failed to add episode");
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this episode?")) return;
    setLoading(true);
    try {
      await fetch(`/api/episodes/${id}`, { method: "DELETE" });
      setEpisodes((prev) => prev.filter((ep) => ep.id !== id));
      showMessage("Episode deleted");
    } catch {
      showMessage("Failed to delete");
    }
    setLoading(false);
  };

  const startEdit = (episode: Episode) => {
    setEditingId(episode.id);
    setEditForm({
      title: episode.title,
      titleAr: episode.titleAr,
      description: episode.description,
      seoTitle: episode.seoTitle,
      seoDescription: episode.seoDescription,
    });
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/episodes/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (data.episode) {
        setEpisodes((prev) =>
          prev.map((ep) => (ep.id === editingId ? data.episode : ep))
        );
        setEditingId(null);
        showMessage("Episode updated!");
      }
    } catch {
      showMessage("Failed to update");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload();
  };

  const topPaths = Object.entries(analytics.summary.uniquePaths)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const topReferrers = Object.entries(analytics.summary.referrers)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const topCountries = Object.entries(analytics.summary.countries)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const deviceStats = Object.entries(analytics.summary.devices);

  return (
    <div className="space-y-6">
      {message && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg text-sm">
          {message}
        </div>
      )}

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("episodes")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "episodes"
                ? "bg-accent text-white"
                : "bg-card border border-border hover:bg-card-hover"
            }`}
          >
            <Film className="w-4 h-4 inline mr-2" />
            Episodes
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "analytics"
                ? "bg-accent text-white"
                : "bg-card border border-border hover:bg-card-hover"
            }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" />
            Analytics
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={refreshData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm hover:bg-card-hover transition-colors"
          >
            <RefreshCw
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm hover:bg-card-hover transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={Eye}
              label="Total Views"
              value={analytics.summary.totalViews}
            />
            <StatCard
              icon={Film}
              label="Episodes"
              value={episodes.length}
            />
            <StatCard
              icon={Globe}
              label="Countries"
              value={Object.keys(analytics.summary.countries).length}
            />
            <StatCard
              icon={Monitor}
              label="Page Paths"
              value={Object.keys(analytics.summary.uniquePaths).length}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsList title="Top Pages" items={topPaths} />
            <AnalyticsList title="Traffic Sources" items={topReferrers} />
            <AnalyticsList title="Countries" items={topCountries} />
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-accent" />
                Devices
              </h3>
              <div className="space-y-3">
                {deviceStats.map(([device, count]) => (
                  <div key={device}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{device}</span>
                      <span className="text-muted">{count}</span>
                    </div>
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full"
                        style={{
                          width: `${(count / analytics.summary.totalViews) * 100 || 0}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs text-muted">
            Local analytics tracked on this platform. For detailed Vercel
            Analytics (visitors, Web Vitals), check your Vercel dashboard.
          </p>
        </div>
      )}

      {activeTab === "episodes" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4 text-accent" />
              Add New Episode
            </h3>
            <div className="flex gap-3">
              <input
                type="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent"
              />
              <button
                onClick={handleAddEpisode}
                disabled={loading || !newUrl.trim()}
                className="bg-accent hover:bg-accent-hover disabled:opacity-50 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Add Episode
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {episodes.map((episode) => (
              <div
                key={episode.id}
                className="bg-card border border-border rounded-lg p-5"
              >
                {editingId === episode.id ? (
                  <div className="space-y-3">
                    <input
                      value={editForm.title || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title: e.target.value })
                      }
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm"
                      placeholder="Title"
                    />
                    <input
                      value={editForm.titleAr || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, titleAr: e.target.value })
                      }
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm"
                      placeholder="Arabic Title"
                      dir="rtl"
                    />
                    <textarea
                      value={editForm.description || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                      }
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm h-20"
                      placeholder="Description"
                    />
                    <input
                      value={editForm.seoTitle || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, seoTitle: e.target.value })
                      }
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm"
                      placeholder="SEO Title"
                    />
                    <textarea
                      value={editForm.seoDescription || ""}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          seoDescription: e.target.value,
                        })
                      }
                      className="w-full bg-background border border-border rounded-lg px-4 py-2 text-sm h-20"
                      placeholder="SEO Description"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        className="flex items-center gap-1 bg-accent text-white px-4 py-2 rounded-lg text-sm"
                      >
                        <Save className="w-4 h-4" /> Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex items-center gap-1 bg-card border border-border px-4 py-2 rounded-lg text-sm"
                      >
                        <X className="w-4 h-4" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 rounded">
                          EP {episode.id}
                        </span>
                        <h3 className="font-semibold">{episode.title}</h3>
                      </div>
                      <p className="text-sm text-muted mb-2">
                        {episode.description}
                      </p>
                      <p className="text-xs text-muted">
                        Video ID: {episode.videoId} | Slug: {episode.slug}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => startEdit(episode)}
                        className="p-2 bg-background border border-border rounded-lg hover:bg-card-hover transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(episode.id)}
                        className="p-2 bg-background border border-border rounded-lg hover:bg-red-500/10 hover:border-red-500/30 transition-colors text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="text-2xl font-bold">{value.toLocaleString()}</p>
          <p className="text-xs text-muted">{label}</p>
        </div>
      </div>
    </div>
  );
}

function AnalyticsList({
  title,
  items,
}: {
  title: string;
  items: [string, number][];
}) {
  const max = items[0]?.[1] || 1;
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted">No data yet</p>
        ) : (
          items.map(([name, count]) => (
            <div key={name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="truncate mr-2">{name}</span>
                <span className="text-muted shrink-0">{count}</span>
              </div>
              <div className="h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all"
                  style={{ width: `${(count / max) * 100}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
