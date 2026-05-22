const API_URL = import.meta.env.VITE_API_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

export const apiClient = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const url = `${API_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-API-KEY': API_KEY,
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('API-Key ungültig oder nicht autorisiert.');
    }
    if (response.status === 429) {
      throw new Error('Zu viele Anfragen (Rate Limit). Bitte kurz warten.');
    }
    throw new Error(`API-Fehler: ${response.status}`);
  }

  return response.json() as Promise<T>;
};
