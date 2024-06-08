import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Searchbar from 'components/Searchbar';

// Mock data for testing
const dummySuggestions = [
  { title: 'Book 1', image: 'https://via.placeholder.com/50', id: 1 },
  { title: 'Book 2', image: 'https://via.placeholder.com/50', id: 2 },
  { title: 'Book 3', image: 'https://via.placeholder.com/50', id: 3 },
];

describe('Searchbar', () => {
  it('renders the Searchbar component with correct elements', () => {
    render(<Searchbar />);

    const searchInput = screen.getByPlaceholderText(/Search For Book By Title/i);
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByRole('button', { name: /Search/i });
    expect(searchButton).toBeInTheDocument();
  });

  it('filters suggestions when typing in the search input', () => {
    render(<Searchbar />);

    const searchInput = screen.getByPlaceholderText(/Search For Book By Title/i);
    fireEvent.change(searchInput, { target: { value: 'Book' } });

    expect(screen.getByText(/Book 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Book 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Book 3/i)).toBeInTheDocument();
  });

  it('displays suggestions dropdown when there are filtered suggestions', () => {
    render(<Searchbar />);

    const searchInput = screen.getByPlaceholderText(/Search For Book By Title/i);
    fireEvent.change(searchInput, { target: { value: 'Book' } });

    const dropdown = screen.getByRole('listbox');
    expect(dropdown).toBeInTheDocument();
  });

  it('updates search text when suggestion is clicked', () => {
    render(<Searchbar />);

    const searchInput = screen.getByPlaceholderText(/Search For Book By Title/i);
    fireEvent.change(searchInput, { target: { value: 'Book' } });

    const suggestion = screen.getByText(/Book 1/i);
    userEvent.click(suggestion);

    expect(searchInput).toHaveValue('Book 1');
  });
});
