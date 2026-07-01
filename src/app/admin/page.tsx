import { cookies } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminDashboard from "@/components/AdminDashboard";
import AdminLogin from "@/components/AdminLogin";
import { getAllEpisodes } from "@/lib/episodes";
import { getAnalyticsSummary } from "@/lib/analytics";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthenticated =
    cookieStore.get("admin_auth")?.value ===
    (process.env.ADMIN_PASSWORD || "admin123");

  const [episodes, analytics] = await Promise.all([
    getAllEpisodes(),
    getAnalyticsSummary(),
  ]);

  return (
    <>
      <Header />
      <main className="flex-1 pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          {isAuthenticated ? (
            <AdminDashboard
              initialEpisodes={episodes}
              initialAnalytics={analytics}
            />
          ) : (
            <AdminLogin />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
