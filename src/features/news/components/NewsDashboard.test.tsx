import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
    expect(screen.getAllByText('neutral').length).toBeGreaterThan(0);

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

  it('filters the news list by sentiment', async () => {
    render(<NewsDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Test-Nachricht Kirche und Politik/i)).toBeInTheDocument();
    });

    const filterSelect = screen.getByRole('combobox', { name: /Filter nach Stimmung/i });
    fireEvent.change(filterSelect, { target: { value: 'good' } });

    expect(screen.queryByText(/Test-Nachricht Kirche und Politik/i)).not.toBeInTheDocument();
  });

  it('renders pagination controls and lets the user move between pages', async () => {
    server.use(
      http.get('*/news', () => {
        return HttpResponse.json({
          data: Array.from({ length: 11 }, (_, index) => ({
            id: index + 1,
            externalId: `fake-uuid-${index + 1}`,
            title: `Nachricht ${index + 1}`,
            content: `Inhalt ${index + 1}`,
            datePublished: {
              date: '2026-05-14 18:10:57.000000',
              timezone_type: 3,
              timezone: 'UTC',
            },
            url: '',
            sentiment: index % 2 === 0 ? 'good' : 'neutral',
            type: 'story',
          })),
          meta: { total: 11, page: 1, limit: 10, pages: 2 },
        });
      })
    );

    render(<NewsDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Seite 1 von 3/i)).toBeInTheDocument();
    });

    const nextButton = screen.getByRole('button', { name: /Weiter/i });
    expect(nextButton).toBeEnabled();

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/Seite 2 von 3/i)).toBeInTheDocument();
      expect(screen.getByText('Nachricht 6')).toBeInTheDocument();
    });

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/Seite 3 von 3/i)).toBeInTheDocument();
      expect(screen.getByText('Nachricht 11')).toBeInTheDocument();
    });

    const previousButton = screen.getByRole('button', { name: /Zurück/i });
    expect(previousButton).toBeEnabled();
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

    await waitFor(() => {
      expect(screen.queryByText(/Lade/i)).not.toBeInTheDocument();
    });

    // Check if the news title from the first test does not exist
    const newsTitle = screen.queryByText(/Test-Nachricht/i);
    expect(newsTitle).not.toBeInTheDocument();

    // Check if table headers are still rendered
    expect(screen.getByText('Datum')).toBeInTheDocument();
    expect(screen.getByText('Titel')).toBeInTheDocument();
    expect(screen.getByText('Stimmung')).toBeInTheDocument();
  });
});
