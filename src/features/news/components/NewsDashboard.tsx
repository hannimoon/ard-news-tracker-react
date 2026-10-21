// src/features/news/components/NewsDashboard.tsx
import { useEffect, useState, type ChangeEvent } from 'react';
import { fetchLatestNews } from '../services/newsService';
import { NewsItem } from '../types/news';
import { NewsTable } from '../../../components/NewsTable';

const PAGE_SIZE = 5;

const sentimentOptions = [
  { value: 'all', label: 'Alle Stimmungen' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'good', label: 'Positiv' },
  { value: 'bad', label: 'Negativ' },
] as const;

type SentimentFilter = (typeof sentimentOptions)[number]['value'];

export function NewsDashboard() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sentimentFilter, setSentimentFilter] = useState<SentimentFilter>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = sentimentOptions.find(
      (option) => option.value === event.currentTarget.value
    );

    if (!selectedFilter) {
      return;
    }

    setSentimentFilter(selectedFilter.value);
    setCurrentPage(1);
  };

  const filteredNews =
    sentimentFilter === 'all' ? news : news.filter((item) => item.sentiment === sentimentFilter);

  const totalPages = Math.max(1, Math.ceil(filteredNews.length / PAGE_SIZE));
  const paginatedNews = filteredNews.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const goToPreviousPage = () => setCurrentPage((page) => Math.max(1, page - 1));
  const goToNextPage = () => setCurrentPage((page) => Math.min(totalPages, page + 1));

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-slate-100 min-h-screen">
      <header className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-500 tracking-tight">
          ARD-News-Tracker
        </h1>
        <p className="text-xs md:text-sm text-slate-500">
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
        <>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-slate-600" htmlFor="sentiment-filter">
                Filter nach Stimmung
              </label>
              <select
                id="sentiment-filter"
                value={sentimentFilter}
                onChange={handleFilterChange}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none"
              >
                {sentimentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <NewsTable newsItems={paginatedNews} />

          <div className="flex flex-col items-center gap-3 mt-6 sm:flex-row sm:justify-center">
            <div className="flex items-center text-slate-600 gap-3">
              <button
                type="button"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Zurück
              </button>
              <span>
                Seite {currentPage} von {totalPages}
              </span>
              <button
                type="button"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Weiter
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
