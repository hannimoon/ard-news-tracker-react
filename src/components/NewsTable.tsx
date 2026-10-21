import { NewsItem } from '../features/news/types/news';

interface NewsTableProps {
  newsItems: NewsItem[];
}

export function NewsTable({ newsItems }: NewsTableProps) {
  return (
    <div
      role="table"
      aria-label="Nachrichten"
      className="w-full bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden text-slate-600"
    >
      <div className="hidden md:grid grid-cols-[120px_1fr_120px] bg-slate-500 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-100 py-2.5 px-4">
        <div>Datum</div>
        <div>Titel</div>
        <div>Stimmung</div>
      </div>

      <ul className="divide-y divide-slate-100 text-xs md:text-sm list-none p-0 m-0">
        {newsItems.map((item) => {
          const formattedDate = item.datePublished.date.substring(0, 16);

          return (
            <li
              key={item.id}
              className="hover:bg-slate-50/70 transition-colors py-2 px-3 md:py-3 md:px-4 grid grid-cols-1 md:grid-cols-[120px_1fr_120px] items-start gap-1 md:gap-4"
            >
              {/* 1. DATUM & BADGE (Auf Mobile in einer kompakten Zeile nebeneinander) */}
              <div className="flex md:block justify-between items-center w-full md:w-auto">
                {/* Datum */}
                <span className="text-[11px] md:text-xs text-slate-500 font-medium whitespace-nowrap">
                  {formattedDate}
                </span>

                {/* Sentiment-Badge (Wird nur auf Mobile an dieser Stelle gerendert) */}
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium md:hidden shrink-0 ${
                    item.sentiment === 'good'
                      ? 'bg-green-50 text-green-700'
                      : item.sentiment === 'bad'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {item.sentiment}
                </span>
              </div>

              {/* 2. TITEL & TEASER INHALT */}
              <div className="font-medium text-slate-900 min-w-0 pr-2">
                <div className="font-semibold text-xs md:text-sm leading-tight text-slate-900 line-clamp-1">
                  {item.title}
                </div>
                <div className="text-[11px] md:text-xs text-slate-500 mt-0.5 line-clamp-1 break-words">
                  {item.content}
                </div>
              </div>

              {/* 3. BADGE DESKTOP (Auf Mobile unsichtbar, da bereits oben integriert) */}
              <div className="hidden md:flex items-center h-full justify-center w-full">
                <span
                  className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                    item.sentiment === 'good'
                      ? 'bg-green-50 text-green-700'
                      : item.sentiment === 'bad'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {item.sentiment}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
