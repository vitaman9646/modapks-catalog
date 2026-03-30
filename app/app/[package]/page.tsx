import { notFound } from 'next/navigation';
import Link from 'next/link';

async function getAppDetails(packageName: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://138.124.93.89:8000';
  const res = await fetch(`${API_URL}/api/app/${packageName}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Not found');
  return res.json();
}

export default async function AppPage({ params }: { params: Promise<{ package: string }> }) {
  const { package: packageName } = await params;
  
  let app;
  try {
    app = await getAppDetails(packageName);
  } catch {
    notFound();
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://138.124.93.89:8000';

  return (
    <main className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-cyan-400 hover:underline mb-4 inline-block">
          ← Back
        </Link>

        <div className="flex items-start gap-6 mb-8">
          <img
            src={app.icon_url || '/default-icon.png'}
            alt={app.title}
            className="w-32 h-32 rounded-2xl shadow-lg"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">{app.title}</h1>
            <p className="text-gray-400 mb-4">{app.category}</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="bg-gray-800 px-3 py-1 rounded-full">?? v{app.version}</span>
              <span className="bg-gray-800 px-3 py-1 rounded-full">?? {app.size_mb} MB</span>
              <span className="bg-gray-800 px-3 py-1 rounded-full">⬇️ {app.downloads?.toLocaleString() || 0}</span>
            </div>
          </div>
        </div>

        {app.description && (
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">?? Description</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{app.description}</p>
          </div>
        )}

        {app.screenshots && app.screenshots.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">?? Screenshots</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {app.screenshots.map((screenshot: string, index: number) => (
                <a 
                  key={index} 
                  href={screenshot} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block rounded-lg overflow-hidden hover:opacity-80 transition"
                >
                  <img src={screenshot} alt={`Screenshot ${index + 1}`} className="w-full h-auto" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Quick Download */}
        <div className="text-center mb-8">
          <a
            href={`${API_URL}/api/download/${packageName}`}
            className="inline-block bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-bold py-4 px-10 rounded-full text-lg transition shadow-lg"
          >
            ?? Download Latest Version (v{app.version})
          </a>
        </div>

        {/* All Versions */}
        {app.versions && app.versions.length > 1 && (
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">?? All Versions ({app.versions.length})</h2>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {app.versions.map((v: any, i: number) => (
                <div key={`${v.version}-${i}`} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                    <div>
                      <span className="font-mono text-lg font-bold text-cyan-400">v{v.version}</span>
                      <div className="text-sm text-gray-400 mt-1">
                        ?? {v.size_mb} MB
                        {v.added && <span className="ml-3">?? {new Date(v.added).toLocaleDateString()}</span>}
                      </div>
                    </div>
                    <a
                      href={`${API_URL}/api/download/${packageName}/${v.version}`}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition text-center"
                    >
                      ?? Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Telegram Promo */}
        <div className="p-6 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-xl border border-cyan-500/30">
          <h3 className="text-xl font-bold mb-2">?? More MODs on Telegram!</h3>
          <p className="text-gray-300 mb-4">Join our channels for daily updates</p>
          <div className="flex flex-wrap gap-3">
            <a href="https://t.me/apk_games_mod" target="_blank" rel="noopener" className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-full text-sm font-bold transition">?? Games</a>
            <a href="https://t.me/premium_apps_unlocked" target="_blank" rel="noopener" className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-full text-sm font-bold transition">?? Premium</a>
            <a href="https://t.me/social_mods_pro" target="_blank" rel="noopener" className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-full text-sm font-bold transition">?? Social</a>
            <a href="https://t.me/all_versions_bot" target="_blank" rel="noopener" className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-full text-sm font-bold transition">?? Bot</a>
          </div>
        </div>
      </div>
    </main>
  );
}
