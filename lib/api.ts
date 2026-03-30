const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface App {
  package_name: string;
  title: string;
  category: string;
  icon_url?: string;
  version: string;
  size_mb: number;
  downloads: number;
  added?: string;
}

export interface AppDetail extends App {
  description?: string;
  screenshots?: string[];
  versions?: AppVersion[];
}

export interface AppVersion {
  version: string;
  size_mb: number;
  added?: string;
}

export interface SearchResult {
  results: App[];
  total: number;
  page: number;
  per_page: number;
  has_next: boolean;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
}

export interface Stats {
  total_apps: number;
  total_downloads: number;
  total_categories: number;
}

export async function searchApps(query: string, page = 1): Promise<SearchResult> {
  const res = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}&page=${page}`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}

export async function getAppDetails(packageName: string): Promise<AppDetail> {
  const res = await fetch(`${API_URL}/api/app/${packageName}`);
  if (!res.ok) throw new Error('App not found');
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/api/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function getCategoryApps(slug: string, page = 1): Promise<App[]> {
  const res = await fetch(`${API_URL}/api/categories/${slug}?page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch apps');
  return res.json();
}

export async function getTopApps(period: 'week' | 'downloads' | 'new' = 'week'): Promise<App[]> {
  const res = await fetch(`${API_URL}/api/top/${period}`);
  if (!res.ok) throw new Error('Failed to fetch top apps');
  const data = await res.json();
  return data.top || data.new || [];
}

export async function getStats(): Promise<Stats> {
  const res = await fetch(`${API_URL}/api/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function getAutocomplete(query: string): Promise<{title: string; package_name: string}[]> {
  const res = await fetch(`${API_URL}/api/search/autocomplete?q=${encodeURIComponent(query)}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.suggestions || [];
}
