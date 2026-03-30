'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface App {
  package_name: string;
  title: string;
  version: string;
  icon_url?: string;
  category: string;
  size_mb: number;
  downloads: number;
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await fetch(`${API_URL}/api/categories/${encodeURIComponent(slug)}`);
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setApps(data);
        } else {
          setError('Invalid response format');
        }
      } catch (error: any) {
        console.error('Failed to fetch category apps:', error);
        setError(error.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </main>
    );
  }

  const decodedSlug = decodeURIComponent(slug);

  return (
    <main className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-cyan-400 hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-5xl font-bold mb-4">{decodedSlug}</h1>
        <p className="text-gray-400 text-lg mb-8">
          {apps.length} apps in this category
        </p>

        {error && (
          <div className="bg-red-900/30 border border-red-500 rounded-xl p-4 mb-6">
            <p className="text-red-300">Error: {error}</p>
          </div>
        )}

        <div className="mb-8 p-6 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-xl border border-cyan-500/30">
          <h3 className="text-xl font-bold mb-2">?? More MODs on Telegram!</h3>
          <p className="text-gray-300 mb-4">Join our channels for exclusive content and daily updates</p>
          <div className="flex flex-wrap gap-3">
            <a href="https://t.me/apk_games_mod" target="_blank" rel="noopener" className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-full text-sm font-bold transition">
              ?? Games MOD
            </a>
            <a href="https://t.me/premium_apps_unlocked" target="_blank" rel="noopener" className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-full text-sm font-bold transition">
              ?? Premium Apps
            </a>
            <a href="https://t.me/media_mod_apps" target="_blank" rel="noopener" className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-full text-sm font-bold transition">
              ?? Media & Creative
            </a>
            <a href="https://t.me/social_mods_pro" target="_blank" rel="noopener" className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-full text-sm font-bold transition">
              ?? Social MODs
            </a>
            <a href="https://t.me/all_versions_bot" target="_blank" rel="noopener" className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-full text-sm font-bold transition">
              ?? Versions Bot
            </a>
          </div>
        </div>

        {apps.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {apps.map((app, index) => (
              <Link
                key={`${app.package_name}-${index}`}
                href={`/app/${app.package_name}`}
                className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition group"
              >
                <img
                  src={app.icon_url || '/default-icon.png'}
                  alt={app.title}
                  className="w-16 h-16 rounded-xl mx-auto mb-2"
                />
                <h3 className="text-sm font-semibold text-center truncate group-hover:text-cyan-400 transition">{app.title}</h3>
                <p className="text-xs text-gray-400 text-center">v{app.version}</p>
                <p className="text-xs text-gray-500 text-center mt-1">{app.size_mb} MB</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-12">
            <p className="text-xl mb-4">No apps loaded from this category yet</p>
            <p className="text-sm">Check our Telegram channels for more MODs!</p>
          </div>
        )}
      </div>
    </main>
  );
}
