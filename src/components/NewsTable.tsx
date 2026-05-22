import { NewsItem } from '../features/news/types/news';

interface NewsTableProps {
  newsItems: NewsItem[];
}

export function NewsTable({ newsItems }: NewsTableProps) {
  return (
    <div className="w-full overflow-hidden bg-white rounded-xl shadow-sm border border-slate-100">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="py-3 px-4 w-32">Datum</th>
              <th className="py-3 px-4">Titel</th>
              <th className="py-3 px-4 w-32">Stimmung</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
            {newsItems.map((item) => {
              // Datum lesbar machen (schneidet "2026-05-14 18:10:57" zurecht)
              const formattedDate = item.datePublished.date.substring(0, 16);

              return (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">{formattedDate}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-900">
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">{item.content}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        item.sentiment === 'good'
                          ? 'bg-green-50 text-green-700'
                          : item.sentiment === 'bad'
                            ? 'bg-red-50 text-red-700'
                            : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.sentiment}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
