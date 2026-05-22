// src/features/news/components/NewsDashboard.tsx
import { useState, useEffect } from 'react';
import { fetchLatestNews } from '../services/newsService';
import { NewsItem } from '../types/news';
import { NewsTable } from '../../../components/NewsTable';

export function NewsDashboard() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLatestNews()
      .then((response) => {
        setNews(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Fehler beim Laden.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-slate-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">ARD-News-Tracker</h1>
        <p className="text-sm text-slate-500 mt-1">
          Einfache Übersicht der importierten ARD-Nachrichten.
        </p>
      </header>

      {error && (
        <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="w-full bg-white rounded-xl p-12 text-center border border-slate-100 shadow-sm">
          <div className="text-slate-400 font-medium animate-pulse">
            Lade aktuelle Nachrichten vom Server...
          </div>
        </div>
      ) : (
        <NewsTable newsItems={news} />
      )}
    </div>
  );
}
