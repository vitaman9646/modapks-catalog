import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MOD APKs Catalog - Premium Android Apps Unlocked",
  description: "Download MOD APKs, premium apps unlocked, games, tools and more for Android",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-cyan-400">MOD</span>APKs
            </Link>
            <div className="flex gap-6 text-sm">
              <Link href="/search" className="hover:text-cyan-400 transition">Search</Link>
              <Link href="/weekly" className="hover:text-cyan-400 transition">Weekly</Link>
              <Link href="/submit" className="hover:text-cyan-400 transition">Submit MOD</Link>
            </div>
          </nav>
        </header>
        {children}
        <footer className="bg-gray-900 border-t border-gray-800 mt-20 py-8">
          <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
            <p>© 2026 MOD APKs Catalog. All rights reserved.</p>
            <div className="mt-4 flex justify-center gap-6 text-sm">
              <Link href="/submit" className="hover:text-cyan-400 transition">Submit App</Link>
              <Link href="/weekly" className="hover:text-cyan-400 transition">Weekly Recap</Link>
              <a href="https://t.me/all_versions_bot" target="_blank" rel="noopener" className="hover:text-cyan-400 transition">
                Telegram Bot
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
