'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { searchApps, App } from '@/lib/api';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<App[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        setTotal(0);
        return;
      }

      setLoading(true);
      try {
        const data = await searchApps(query, 1, 50);
        setResults(data.apps);
        setTotal(data.total);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(performSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">?? Search MOD APKs</h1>

        <input
          type="text"
          placeholder="Search apps..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none mb-6"
          autoFocus
        />

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        )}

        {!loading && query && (
          <div className="mb-4 text-gray-400">
            Found {total} result{total !== 1 ? 's' : ''}
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-4">
            {results.map((app) => (
              <Link
                key={app.id}
                href={`/app/${app.package_name}`}
                className="block bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition"
              >
                <div className="flex gap-4">
                  {app.icon ? (
                    <img
                      src={app.icon}
                      alt={app.title}
                      className="w-16 h-16 rounded-xl"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl font-bold">
                      {app.title.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{app.title}</h3>
                    <p className="text-gray-400 text-sm">{app.category}</p>
                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                      <span>v{app.version}</span>
                      <span>{(app.size / 1024 / 1024).toFixed(1)} MB</span>
                      <span>{(app.downloads / 1000000).toFixed(1)}M downloads</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && query && results.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-xl">No results found for "{query}"</p>
            <p className="mt-2">Try a different search term</p>
          </div>
        )}

        {!query && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-xl">Start typing to search</p>
          </div>
        )}
      </div>
    </div>
  );
}
