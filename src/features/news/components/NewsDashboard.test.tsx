import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NewsDashboard } from './NewsDashboard';
import { server } from '../../../test/server';
import { http, HttpResponse } from 'msw';

describe('NewsDashboard API Integration Test', () => {
  it('shows loading state initially and renders news after API response', async () => {
    render(<NewsDashboard />);

    // 1. Check if loading element exists
    const loadingElement = screen.getByText(/Lade aktuelle Nachrichten/i);
    expect(loadingElement).toBeInTheDocument();

    // 2. Wait for the news title to appear in the document
    await waitFor(() => {
      const newsTitle = screen.getByText(/Test-Nachricht Kirche und Politik/i);
      expect(newsTitle).toBeInTheDocument();
    });

    // 3. Check if other news details are rendered
    expect(screen.getByText('2026-05-14 18:10')).toBeInTheDocument();
    expect(screen.getByText('neutral')).toBeInTheDocument();

    // 4. Check if loading element is gone
    expect(screen.queryByText(/Lade aktuelle Nachrichten/i)).not.toBeInTheDocument();
  });

  it('shows an error message when the API request fails', async () => {
    // Mock an error response from the server for the /news endpoint
    server.use(
      http.get('*/news', () => {
        return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' });
      })
    );

    render(<NewsDashboard />);

    // Wait for the error message to appear in the document
    const errorMessage = await screen.findByText(/API-Fehler/i);
    expect(errorMessage).toBeInTheDocument();

    // Ensure that the "Lade..." state is no longer visible
    expect(screen.queryByText(/Lade/i)).not.toBeInTheDocument();
  });

  it('renders an empty table when no news items are available', async () => {
    // Mock an empty response from the server for the /news endpoint
    server.use(
      http.get('*/news', () => {
        return HttpResponse.json({
          data: [],
          meta: { total: 0, page: 1, limit: 10, pages: 1 },
        });
      })
    );

    render(<NewsDashboard />);

    // Mock an empty response from the server for the /news endpoint
    server.use(
      http.get('*/news', () => {
        return HttpResponse.json({
          data: [],
          meta: { total: 0, page: 1, limit: 10, pages: 1 },
        });
      })
    );

    await waitFor(() => {
      expect(screen.queryByText(/Lade/i)).not.toBeInTheDocument();
    });

    // Check if the news title from the first test does not exist
    const newsTitle = screen.queryByText(/Test-Nachricht/i);
    expect(newsTitle).not.toBeInTheDocument();

    // Check if table headers are still rendered
    expect(screen.getByText(/Datum/i)).toBeInTheDocument();
    expect(screen.getByText(/Titel/i)).toBeInTheDocument();
    expect(screen.getByText(/Stimmung/i)).toBeInTheDocument();
  });
});
