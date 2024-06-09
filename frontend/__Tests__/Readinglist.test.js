import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Readinglist from 'pages/Readinglist';

const mockAddToReadingList = jest.fn();

describe('Readinglist', () => {
  it('renders the Readinglist component with book items', () => {
    render(<Readinglist onAddToReadingList={mockAddToReadingList} />);

    const readingListContainer = screen.getByRole('img', { name: /Profile/i });
    expect(readingListContainer).toBeInTheDocument();

    const readingListResults = screen.getByText(/ReadingList Results for/i);
    expect(readingListResults).toBeInTheDocument();

    const addToReadingListButtons = screen.getAllByRole('button', { name: /Added To Reading List/i });
    expect(addToReadingListButtons).toHaveLength(3);

    userEvent.click(addToReadingListButtons[0]);
    expect(mockAddToReadingList).toHaveBeenCalledWith({ title: 'Title of Book 1', author: 'Author 1' });
  });

});
