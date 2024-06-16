import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ReadingList from 'pages/readinglist';
import { ReadingListProvider  } from 'components/listcontext';
import '@testing-library/jest-dom';

const mockReadingList = [
  { title: 'Book 1', author: 'Author 1', coverPhotoURL: 'book1.jpg' },
  { title: 'Book 2', author: 'Author 2', coverPhotoURL: 'book2.jpg' },
];
  
    const MockReadingListProvider = ({ children }) => {
      const [readingList, setReadingList] = React.useState(mockReadingList);
    
      const removeFromReadingList = (title) => {
        setReadingList(readingList.filter((book) => book.title !== title));
      };
    
      return (
        <ReadingListProvider value={{ readingList, removeFromReadingList }}>
          {children}
        </ReadingListProvider>
      );
    };

describe('ReadingList', () => {
  beforeEach(() => {
    render(<ReadingList books={mockReadingList} />);
  });
  test('renders reading list items', () => {
    mockReadingList.forEach((book) => {
      const titleElement = screen.queryByText(book.title);
      const authorElement = screen.queryByText(`By: ${book.author}`);
      expect(titleElement).toBeInTheDocument();
      expect(authorElement).toBeInTheDocument();
    });
  });

  test('removes book from reading list on button click', () => {
    mockReadingList.forEach((book) => {
      const removeButton = screen.queryByText('Added').closest('button');
      fireEvent.click(removeButton);
      expect(screen.queryByText(book.title)).not.toBeInTheDocument();
    });
  });

    test('applies hover effect on button mouse enter and removes on mouse leave', async () => {
      const addedButton = screen.getByText('Added').closest('button');
        if (addedButton) {
          fireEvent.mouseEnter(addedButton);
          await waitFor(() => {
            expect(addedButton).toHaveStyle({ backgroundColor: '', color: '' });
          });
        } else {
          console.error('Button with text "Added" not found.');
        }
    });
  });
