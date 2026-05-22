import { apiClient } from '../../../config/api';
import { PaginatedResponse } from '../../../types/api';
import { NewsItem } from '../types/news';

export const fetchLatestNews = async (): Promise<PaginatedResponse<NewsItem>> => {
  return apiClient<PaginatedResponse<NewsItem>>('/news');
};
