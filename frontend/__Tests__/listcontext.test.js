import React from 'react';
import { render, screen } from '@testing-library/react';
import { ReadingListProvider, useReadingList } from 'components/listcontext';
import '@testing-library/jest-dom';

const TestComponent = ({ book }) => {
  const { readingList, addToReadingList, removeFromReadingList } = useReadingList();

  React.useEffect(() => {
    addToReadingList(book);
    return () => removeFromReadingList(book.title);
  }, [book, addToReadingList, removeFromReadingList]);

  return (
    <ul>
      {readingList.map((b) => (
        <li key={b.title}>
          {b.title} by {b.author}
        </li>
      ))}
    </ul>
  );
};

describe('ReadingListProvider', () => {
  test('adds and removes books from reading list', () => {
    const book1 = { title: 'Book 1', author: 'Author 1' };
    const book2 = { title: 'Book 2', author: 'Author 2' };

    render(
      <ReadingListProvider>
        <TestComponent book={book1} />
        <TestComponent book={book2} />
      </ReadingListProvider>
    );

    const book1Elements = [...screen.queryAllByText('Book 1 by Author 1')];
    const book2Elements = [...screen.queryAllByText('Book 2 by Author 2')];

    expect(book1Elements.some((el) => el instanceof HTMLElement)).toBe(true);
    expect(book2Elements.some((el) => el instanceof HTMLElement)).toBe(true);
  });
});
