import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from 'pages/Homepage';

const mockSearchResults = [
  { title: 'Book 1', author: 'Author 1' },
  { title: 'Book 2', author: 'Author 2' },
];

const mockAddToReadingList = jest.fn();

describe('HomePage', () => {
  it('renders Searchbar and Searchresults components', () => {
    render(
      <HomePage
        searchResults={mockSearchResults}
        onAddToReadingList={mockAddToReadingList}
      />
    );

    const searchbarElement = screen.getByRole('textbox', { name: /Search For Book By Title/i });
    expect(searchbarElement).toBeInTheDocument();

    const searchResultsElement = screen.getByText(/Search Results for/i);
    expect(searchResultsElement).toBeInTheDocument();
  });

});
