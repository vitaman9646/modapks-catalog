'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Stats {
  total_apps: number;
  total_categories: number;
}

interface App {
  package_name: string;
  title: string;
  version: string;
  icon_url?: string;
  category: string;
  size_mb: number;
  added?: string;
}

interface Category {
  name: string;
  slug: string;
  count: number;
}

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [topApps, setTopApps] = useState<App[]>([]);
  const [recentApps, setRecentApps] = useState<App[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        
        const [statsRes, topRes, recentRes, catsRes] = await Promise.all([
          fetch(`${API_URL}/api/stats`),
          fetch(`${API_URL}/top?limit=10`),
          fetch(`${API_URL}/recently-added?limit=20`),
          fetch(`${API_URL}/api/categories`),
        ]);

        const statsData = await statsRes.json();
        const topData = await topRes.json();
        const recentData = await recentRes.json();
        const catsData = await catsRes.json();

        setStats(statsData);
        setTopApps(topData.top || []);
        setRecentApps(recentData.new || []);
        setCategories(catsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-4">
            Find Your <span className="text-cyan-400">MOD</span> App
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            {stats ? `${stats.total_apps.toLocaleString()} apps • ${stats.total_categories} categories` : 'Loading...'}
          </p>
          
          <Link 
            href="/search"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-8 rounded-full text-lg transition"
          >
            ?? Search Apps
          </Link>
        </div>
      </section>

      {/* Recently Added */}
      {recentApps.length > 0 && (
        <section className="py-12 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">?? Recently Added</h2>
              <Link href="/weekly" className="text-cyan-400 hover:text-cyan-300 transition">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {recentApps.slice(0, 10).map((app, index) => (
                <Link
                  key={`recent-${app.package_name}-${index}`}
                  href={`/app/${app.package_name}`}
                  className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition group"
                >
                  <img
                    src={app.icon_url || '/default-icon.png'}
                    alt={app.title}
                    className="w-16 h-16 rounded-xl mx-auto mb-2"
                  />
                  <div className="bg-green-500 text-xs font-bold px-2 py-1 rounded-full text-center mb-2">
                    NEW
                  </div>
                  <h3 className="text-sm font-semibold text-center truncate group-hover:text-cyan-400 transition">
                    {app.title}
                  </h3>
                  <p className="text-xs text-gray-400 text-center">v{app.version}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Top Apps */}
      {topApps.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">?? Top This Week</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {topApps.slice(0, 10).map((app, index) => (
                <Link
                  key={`top-${app.package_name}-${index}`}
                  href={`/app/${app.package_name}`}
                  className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition"
                >
                  <img
                    src={app.icon_url || '/default-icon.png'}
                    alt={app.title}
                    className="w-16 h-16 rounded-xl mx-auto mb-2"
                  />
                  <h3 className="text-sm font-semibold text-center truncate">{app.title}</h3>
                  <p className="text-xs text-gray-400 text-center">v{app.version}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">?? Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.slice(0, 12).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${encodeURIComponent(cat.slug)}`}
                  className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition text-center"
                >
                  <h3 className="font-bold text-lg mb-2">{cat.name}</h3>
                  <p className="text-gray-400 text-sm">{cat.count.toLocaleString()} apps</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
