import { getAppDetails } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default async function AppPage({ params }: { params: { package: string } }) {
  let app;
  try {
    app = await getAppDetails(params.package);
  } catch {
    notFound();
  }

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
            className="w-32 h-32 rounded-2xl"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">{app.title}</h1>
            <p className="text-gray-400 mb-4">{app.category}</p>
            <div className="flex gap-4 text-sm">
              <span>?? v{app.version}</span>
              <span>?? {app.size_mb} MB</span>
              <span>⬇️ {app.downloads.toLocaleString()} downloads</span>
            </div>
          </div>
        </div>

        {app.description && (
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">?? Description</h2>
            <p className="text-gray-300 leading-relaxed">{app.description}</p>
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
                  <img
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-auto"
                  />
                </a>
              ))}
            </div>
          </div>
        )}

        {app.versions && app.versions.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">?? All Versions ({app.versions.length})</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {app.versions.map((v: any, i: number) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="font-mono">v{v.version}</span>
                  <span className="text-gray-400">{v.size_mb} MB</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href="https://t.me/all_versions_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-8 rounded-full text-lg transition"
          >
            ?? Download via Telegram Bot
          </a>
        </div>
      </div>
    </main>
  );
}
