import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Searchresults from 'components/Searchresults';

const mockSearchResults = [
  { title: 'Book 1', author: 'Author 1' },
  { title: 'Book 2', author: 'Author 2' },
  { title: 'Book 3', author: 'Author 3' },
];

const mockAddToReadingList = jest.fn();

describe('Searchresults', () => {
  it('renders the Searchresults component with correct elements', () => {
    render(
      <Searchresults
        searchResults={mockSearchResults}
        onAddToReadingList={mockAddToReadingList}
      />
    );

    const searchResultsContainer = screen.getByRole('heading', { name: /Search Results for/i });
    expect(searchResultsContainer).toBeInTheDocument();

    const bookItems = screen.getAllByRole('img', { name: /Book/i });
    expect(bookItems).toHaveLength(mockSearchResults.length);

    // Assert that buttons to add to reading list are rendered
    const addToReadingListButtons = screen.getAllByRole('button', { name: /Add To Reading List/i });
    expect(addToReadingListButtons).toHaveLength(mockSearchResults.length);
  });

  it('calls onAddToReadingList function when add to reading list button is clicked', () => {
    render(
      <Searchresults
        searchResults={mockSearchResults}
        onAddToReadingList={mockAddToReadingList}
      />,
    );

    const firstAddToReadingListButton = screen.getAllByRole('button', { name: /Add To Reading List/i })[0];
    fireEvent.click(firstAddToReadingListButton);

    expect(mockAddToReadingList).toHaveBeenCalledWith(mockSearchResults[0]);
  });

});
