import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import SearchResults from 'pages/searchresults';
import { MemoryRouter } from 'react-router-dom';
import { GET_SEARCH_RESULT } from 'pages/searchresults';
import '@testing-library/jest-dom';

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
          <Route path="/searchresults/:query">
            <SearchResults />
          </Route>
        </MockedProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {});
  });

  test('renders book details when data is fetched successfully', async () => {
    render(
      <MemoryRouter initialEntries={['/searchresults/test']}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Route path="/searchresults/:query">
            <SearchResults />
          </Route>
        </MockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Book')).toBeInTheDocument();
      expect(screen.getByText('By: Test Author')).toBeInTheDocument();
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
          <Route path="/searchresults/:query">
            <SearchResults />
          </Route>
        </MockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: An error occurred')).toBeInTheDocument();
    });
  });
});
