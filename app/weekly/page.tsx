'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface App {
  package_name: string;
  title: string;
  version: string;
  icon_url?: string;
  category: string;
  size_mb: number;
  downloads: number;
  added?: string;
}

export default function WeeklyPage() {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.modapks.org';
        const res = await fetch(`${API_URL}/api/top/new?limit=50`);
        const data = await res.json();
        setApps(data.new || []);
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-cyan-400 hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-5xl font-bold mb-4">?? Weekly Recap</h1>
        <p className="text-gray-400 text-lg mb-8">
          Latest {apps.length} apps added this week
        </p>

        <div className="space-y-4">
          {apps.map((app, index) => (
            <Link
              key={app.package_name}
              href={`/app/${app.package_name}`}
              className="block bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition"
            >
              <div className="flex items-center gap-6">
                <div className="text-4xl font-bold text-gray-600 w-12 text-center">
                  {index + 1}
                </div>
                <img
                  src={app.icon_url || '/default-icon.png'}
                  alt={app.title}
                  className="w-20 h-20 rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-1">{app.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{app.category}</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>v{app.version}</span>
                    <span>•</span>
                    <span>{app.size_mb} MB</span>
                    <span>•</span>
                    <span>{app.downloads.toLocaleString()} downloads</span>
                  </div>
                </div>
                <div className="bg-green-500 text-xs font-bold px-3 py-1 rounded-full">
                  NEW
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
