import React from 'react';
import { render, screen } from '@testing-library/react';
import { ReadingListProvider, useReadingList } from 'components/listcontext';

describe('ReadingListProvider', () => {
  test('adds and removes books from reading list', () => {
    const TestComponent = () => {
      const { addToReadingList, removeFromReadingList, readingList } = useReadingList();

      const book1 = { title: 'Book 1', author: 'Author 1' };
      const book2 = { title: 'Book 2', author: 'Author 2' };

      addToReadingList(book1);
      expect(readingList).toContain(book1);

      addToReadingList(book2);
      expect(readingList).toContain(book2);

      removeFromReadingList(book1.title);
      expect(readingList).not.toContain(book1);
    };

    render(
      <ReadingListProvider>
        <TestComponent />
      </ReadingListProvider>
    );
  });
});
