import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('App Component', () => {
  beforeEach(() => {
    // Clear the fetch mock before each test
    mockFetch.mockClear();
  });

  it('renders weather data when fetched successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ description: 'Rainy' }),
    });

    render(<App />);

    fireEvent.change(screen.getByLabelText(/City/i), {
      target: { value: 'London' },
    });
    fireEvent.change(screen.getByLabelText(/Country/i), {
      target: { value: 'UK' },
    });

    fireEvent.submit(screen.getByText('Get Weather'));

    const rainyHeading = await screen.findByText(/rainy/i);
    expect(rainyHeading).toBeVisible();
  });

  it('renders error message when there is an error fetching data', async () => {
    // Mock an error response
    mockFetch.mockRejectedValueOnce(new Error('Error fetching weather data'));

    render(<App />);
    fireEvent.change(screen.getByLabelText(/City/i), {
      target: { value: 'London' },
    });
    fireEvent.change(screen.getByLabelText(/Country/i), {
      target: { value: 'UK' },
    });
    fireEvent.submit(screen.getByText('Get Weather'));

    const errorMessage = await screen.findByText(
      /Error fetching weather data/i
    );

    expect(errorMessage).toBeVisible();
  });
});
