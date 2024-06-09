import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ReadingList from 'pages/readingList';
import { ReadingListProvider } from 'components/listcontext';

describe('ReadingList', () => {
  test('renders reading list items', () => {
    const mockReadingList = [
      { title: 'Book 1', author: 'Author 1', coverPhotoURL: 'book1.jpg' },
      { title: 'Book 2', author: 'Author 2', coverPhotoURL: 'book2.jpg' },
    ];

    render(
      <ReadingListProvider>
        <ReadingList />
      </ReadingListProvider>
    );

    mockReadingList.forEach((book) => {
      const titleElement = screen.getByText(book.title);
      const authorElement = screen.getByText(`By: ${book.author}`);
      expect(titleElement).toBeInTheDocument();
      expect(authorElement).toBeInTheDocument();
    });
  });

  test('removes book from reading list on button click', () => {
    const mockReadingList = [
      { title: 'Book 1', author: 'Author 1', coverPhotoURL: 'book1.jpg' },
      { title: 'Book 2', author: 'Author 2', coverPhotoURL: 'book2.jpg' },
    ];

    render(
      <ReadingListProvider>
        <ReadingList />
      </ReadingListProvider>
    );

    mockReadingList.forEach((book) => {
      const removeButton = screen.getByText('Added').closest('button');
      fireEvent.click(removeButton);
      expect(screen.queryByText(book.title)).not.toBeInTheDocument();
    });
  });

  test('applies hover effect on button mouse enter and removes on mouse leave', () => {
    const mockReadingList = [
      { title: 'Book 1', author: 'Author 1', coverPhotoURL: 'book1.jpg' },
      { title: 'Book 2', author: 'Author 2', coverPhotoURL: 'book2.jpg' },
    ];

    render(
      <ReadingListProvider>
        <ReadingList />
      </ReadingListProvider>
    );

    mockReadingList.forEach((book, index) => {
      const removeButton = screen.getByText('Added').closest('button');
      fireEvent.mouseEnter(removeButton);
      expect(removeButton).toHaveStyle({ backgroundColor: 'white', color: '#5ACCCC' });

      fireEvent.mouseLeave(removeButton);
      expect(removeButton).toHaveStyle({ backgroundColor: '#5ACCCC', color: 'white' });
    });
  });
});
