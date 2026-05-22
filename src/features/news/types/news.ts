// src/features/news/types/news.ts

export interface ApiDate {
  date: string;
  timezone_type: number;
  timezone: string;
}

export interface NewsItem {
  id: number;
  externalId: string;
  title: string;
  content: string;
  datePublished: ApiDate; // Verschachteltes Datums-Objekt aus Symfony
  url: string;
  sentiment: 'neutral' | 'good' | 'bad'; // Typisierung anhand Ihrer API-Werte
  type: string;
}
