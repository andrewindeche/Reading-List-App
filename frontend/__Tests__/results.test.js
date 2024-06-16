import React from 'react';
import { render, fireEvent, screen, waitFor  } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import Results, { GET_SEARCH_RESULTS } from 'pages/results';
import { ReadingListProvider } from 'components/listcontext';
import '@testing-library/jest-dom';

export const GET_BOOKS = gql`
  query GetBooks($searchText: String!) {
    books(searchText: $searchText) {
      id
      title
      author
    }
  }
`;

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

    await waitFor(() => {
      const bookTitles = screen.getAllByText(/Book/);
      expect(bookTitles).toHaveLength(2);
    });
  });

  test('adds book to reading list on button click', async () => {
    const mocks = [];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ReadingListProvider>
          <Results searchText="test" />
        </ReadingListProvider>
      </MockedProvider>
    );

    const addButton = await screen.findByText('Add to Library');
    fireEvent.click(addButton);
    
    await waitFor(() => {
      const addedButton = screen.getByText('Added');
      expect(addedButton).toBeInTheDocument();
    });
  });

  test('applies hover effect on button mouse enter and removes on mouse leave', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ReadingListProvider>
          <Results searchText="test" />
        </ReadingListProvider>
      </MockedProvider>
    );
  
    const buttons = await screen.findAllByText('Add to reading list');
    buttons.forEach(async (button) => {
      fireEvent.mouseEnter(button);
      await waitFor(() => expect(button).toHaveClass('hover'));
      fireEvent.mouseLeave(button);
      await waitFor(() => expect(button).not.toHaveClass('hover'));
    });
  });  
});
