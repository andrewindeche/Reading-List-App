import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Results, { GET_SEARCH_RESULTS } from 'pages/results';
import { ReadingListProvider } from 'components/listcontext';
import '@testing-library/jest-dom';

const mocks = [
  {
    request: {
      query: GET_SEARCH_RESULTS,
      variables: { searchText: 'test' },
    },
    result: {
      data: {
        books: [
          { title: 'Book 1', author: 'Author 1', coverPhotoURL: 'book1.jpg' },
          { title: 'Book 2', author: 'Author 2', coverPhotoURL: 'book2.jpg' },
        ],
      },
    },
  },
];

describe('Results', () => {
  test('renders search results', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ReadingListProvider>
          <Results searchText="test" />
        </ReadingListProvider>
      </MockedProvider>
    );

    const bookTitles = await screen.findAllByText(/Book/);
    expect(bookTitles).toHaveLength(2);
  });

  test('adds book to reading list on button click', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ReadingListProvider>
          <Results searchText="test" />
        </ReadingListProvider>
      </MockedProvider>
    );

    const addButton = await screen.findByText('Add to Library');
    fireEvent.click(addButton);
    const addedButton = await screen.findByText('Added');
    expect(addedButton).toBeInTheDocument();
  });

  test('applies hover effect on button mouse enter and removes on mouse leave', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ReadingListProvider>
          <Results searchText="test" />
        </ReadingListProvider>
      </MockedProvider>
    );

    const addButton = await screen.findByText('Add to Library');
    fireEvent.mouseEnter(addButton);
    expect(addButton).toHaveStyle({ backgroundColor: '#CFFAFA' });

    fireEvent.mouseLeave(addButton);
    expect(addButton).toHaveStyle({ backgroundColor: 'white' });
  });
});
