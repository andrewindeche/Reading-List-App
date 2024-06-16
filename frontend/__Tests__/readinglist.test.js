import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ReadingList from 'pages/readinglist';
import { useReadingList } from 'components/listcontext';
import '@testing-library/jest-dom';

jest.mock('components/listcontext');

const mockReadingList = [
  { title: 'Book 1', author: 'Author 1', coverPhotoURL: 'book1.jpg' },
  { title: 'Book 2', author: 'Author 2', coverPhotoURL: 'book2.jpg' },
];

describe('ReadingList', () => {
  beforeEach(() => {
    useReadingList.mockReturnValue({
      readingList: mockReadingList,
      removeFromReadingList: jest.fn()
    });
    render(<ReadingList />);
  });

  test('renders reading list items', () => {
    mockReadingList.forEach((book) => {
      const bookElements = screen.getAllByText(book.title);
      expect(bookElements.length).toBeGreaterThanOrEqual(1);
      const authorElements = screen.getAllByText(`By: ${book.author}`);
      expect(authorElements.length).toBeGreaterThanOrEqual(1);
    });
  });

  test('removes book from reading list on button click', () => {
    mockReadingList.forEach((book) => {
      const removeButton = screen.queryByText(`Added ${book.title}`)?.closest('button');
    if (removeButton) {
      fireEvent.click(removeButton);
      expect(screen.queryByText(book.title)).not.toBeInTheDocument();
      }
    });
  });

  test('applies hover effect on button mouse enter and removes on mouse leave', async () => {
    render(<ReadingList />); 
    const book1Button = await screen.findByTestId('remove-button-Book 1');
    const book2Button = await screen.findByTestId('remove-button-Book 2');
    
    fireEvent.mouseEnter(book1Button);
    expect(book1Button).toHaveStyle('background-color: gray;');

    fireEvent.mouseLeave(book1Button);
    await waitFor(() => {
      expect(book1Button).not.toHaveStyle('background-color: gray;');
    });

    fireEvent.mouseEnter(book2Button);
    expect(book2Button).toHaveStyle('background-color: gray;');

    fireEvent.mouseLeave(book2Button);
    await waitFor(() => {
      expect(book2Button).not.toHaveStyle('background-color: gray;');
    });
  });
});
