import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_SEARCH_RESULTS } from 'pages/homepage';
import HomePage from 'pages/homepage';
import '@testing-library/jest-dom';

const mocks = [
  {
    request: {
      query: GET_SEARCH_RESULTS,
      variables: { searchText: 'initial text' },
    },
    result: {
      data: {
        searchResults: [
          { title: 'Result 1', author: 'Author 1' },
          { title: 'Result 2', author: 'Author 2' },
        ],
      },
    },
  },
];

describe('HomePage', () => {
  test('renders search results component with initial search text', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <HomePage initialSearchText="initial text" />
      </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await screen.findByText('Result 1');
    expect(screen.getByText('Result 1')).toBeInTheDocument();
    expect(screen.getByText('Result 2')).toBeInTheDocument();
  });
});
