import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SearchResults, { GET_SEARCH_RESULT } from 'pages/searchresults';
import '@testing-library/jest-dom';

jest.mock('pages/readinglist', () => ({
  __esModule: true,
  default: () => ({
    addToReadingList: jest.fn(),
    readingList: [],
  }),
}));

const mocks = [
  {
    request: {
      query: GET_SEARCH_RESULT,
      variables: { title: 'test' },
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

describe('SearchResults', () => {
  test('renders loading state while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['/searchresults/test']}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <SearchResults />
        </MockedProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Book 1')).toBeInTheDocument();
      expect(screen.getByText('Author 1')).toBeInTheDocument();
      expect(screen.getByText('Book 2')).toBeInTheDocument();
      expect(screen.getByText('Author 2')).toBeInTheDocument();
    });
  });

  test('renders error message when there is an error fetching data', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_SEARCH_RESULT,
          variables: { title: 'test' },
        },
        error: new Error('An error occurred'),
      },
    ];

    render(
      <MemoryRouter initialEntries={['/searchresults/test']}>
        <MockedProvider mocks={errorMocks} addTypename={false}>
          <SearchResults />
        </MockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: An error occurred')).toBeInTheDocument();
    });
  });
});
