// Принудительно используем /api (внутренний proxy)
const API_URL = '/api';

export interface App {
  id: number;
  package_name: string;
  title: string;
  version: string;
  category: string;
  icon: string | null;
  added: number;
  size: number;
  downloads: number;
}

export interface SearchResult {
  apps: App[];
  total: number;
  page: number;
  per_page: number;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
}

export interface AppDetail extends App {
  description?: string;
  screenshots?: string[];
  versions?: {
    version: string;
    added: number;
    size: number;
    downloads: number;
  }[];
}

export async function searchApps(query: string = '', page: number = 1, limit: number = 20): Promise<SearchResult> {
  const params = new URLSearchParams({
    q: query,
    page: page.toString(),
    limit: limit.toString(),
  });
  
  const response = await fetch(`${API_URL}/search?${params}`);
  if (!response.ok) throw new Error('Search failed');
  return response.json();
}

export async function getAppDetails(packageName: string): Promise<AppDetail> {
  const response = await fetch(`${API_URL}/app/${packageName}`);
  if (!response.ok) throw new Error('Failed to fetch app details');
  return response.json();
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
}

export async function getCategoryApps(slug: string, page: number = 1, perPage: number = 50): Promise<SearchResult> {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });
  
  const response = await fetch(`${API_URL}/categories/${slug}?${params}`);
  if (!response.ok) throw new Error('Failed to fetch category apps');
  return response.json();
}

export async function getTopApps(limit: number = 10): Promise<App[]> {
  const response = await fetch(`${API_URL}/top?limit=${limit}`);
  if (!response.ok) throw new Error('Failed to fetch top apps');
  return response.json();
}

export async function getRecentlyAdded(limit: number = 50): Promise<App[]> {
  const response = await fetch(`${API_URL}/recently-added?limit=${limit}`);
  if (!response.ok) throw new Error('Failed to fetch recently added apps');
  return response.json();
}

export async function getStats() {
  const response = await fetch(`${API_URL}/stats`);
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
}

export function getDownloadUrl(packageName: string, version: string): string {
  return `${API_URL}/download?package=${packageName}&version=${version}`;
}
