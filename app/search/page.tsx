'use client';

import { useState, useEffect } from 'react';
import { searchApps, type App } from '@/lib/api';
import Link from 'next/link';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<App[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchApps(query);
        setResults(data.results);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <main className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">?? Search Apps</h1>
        
        <input
          type="text"
          placeholder="Search for apps..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-gray-800 text-white px-6 py-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        {loading && <p className="text-gray-400 mt-4">Searching...</p>}

        <div className="mt-8 space-y-4">
          {results.map((app) => (
            <Link
              key={app.package_name}
              href={`/app/${app.package_name}`}
              className="block bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={app.icon_url || '/default-icon.png'}
                  alt={app.title}
                  className="w-16 h-16 rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{app.title}</h3>
                  <p className="text-gray-400 text-sm">{app.category}</p>
                  <div className="flex gap-3 mt-1 text-xs text-gray-500">
                    <span>v{app.version}</span>
                    <span>•</span>
                    <span>{app.size_mb} MB</span>
                    <span>•</span>
                    <span>{app.downloads.toLocaleString()} downloads</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {query.length >= 2 && results.length === 0 && !loading && (
          <p className="text-gray-400 text-center mt-8">No results found</p>
        )}
      </div>
    </main>
  );
}
