import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { PaginatedResponse } from '../types/api';
import { NewsItem } from '../features/news/types/news';

const mockNewsResponse: PaginatedResponse<NewsItem> = {
  data: [
    {
      id: 185,
      externalId: 'fake-uuid-1',
      title: 'Test-Nachricht Kirche und Politik',
      content: 'Ein simulierter Inhalt für den automatischen Komponententest.',
      datePublished: {
        date: '2026-05-14 18:10:57.000000',
        timezone_type: 3,
        timezone: 'UTC',
      },
      url: '',
      sentiment: 'neutral',
      type: 'story',
    },
  ],
  meta: {
    total: 1,
    page: 1,
    limit: 10,
    pages: 1,
  },
};

export const server = setupServer(
  http.get('*/news', () => {
    return HttpResponse.json(mockNewsResponse);
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
