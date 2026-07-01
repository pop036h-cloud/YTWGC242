"use client";

import { useState } from "react";
import { Lock, LogIn } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        window.location.reload();
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-card border border-border rounded-xl p-8 space-y-6"
      >
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-accent" />
          </div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-muted text-sm mt-2">
            Enter your admin password to access the dashboard
          </p>
        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent"
          required
        />

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          <LogIn className="w-4 h-4" />
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
