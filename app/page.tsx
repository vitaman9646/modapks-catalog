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
}

interface Category {
  name: string;
  slug: string;
  count: number;
}

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [topApps, setTopApps] = useState<App[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        
        const [statsRes, topRes, catsRes] = await Promise.all([
          fetch(`${API_URL}/api/stats`),
          fetch(`${API_URL}/api/top/week`),
          fetch(`${API_URL}/api/categories`),
        ]);

        const statsData = await statsRes.json();
        const topData = await topRes.json();
        const catsData = await catsRes.json();

        setStats(statsData);
        setTopApps(topData.top || []);
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

      {/* Top Apps */}
      {topApps.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">?? Top This Week</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {topApps.slice(0, 10).map((app) => (
                <Link
                  key={app.package_name}
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
                  href={`/category/${cat.slug}`}
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
