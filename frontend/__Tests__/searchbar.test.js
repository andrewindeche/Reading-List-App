import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import Searchbar from 'components/searchbar';
import { SEARCH_BOOK } from 'components/searchbar';

const setSearchResultsMock = jest.fn();

const mocks = [
  {
    request: {
      query: SEARCH_BOOK,
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

describe('Searchbar', () => {
  test('renders search input field', () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Searchbar setSearchResults={setSearchResultsMock} />
        </MockedProvider>
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search For Book By Title');
    expect(searchInput).toBeInTheDocument();
  });

  test('updates search text on input change', () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Searchbar setSearchResults={setSearchResultsMock} />
        </MockedProvider>
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search For Book By Title');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');
  });

  test('triggers search on button click', () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Searchbar setSearchResults={setSearchResultsMock} />
        </MockedProvider>
      </MemoryRouter>
    );

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
    expect(setSearchResultsMock).toHaveBeenCalled();
  });

  test('navigates to search results on enter key press', () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Searchbar setSearchResults={setSearchResultsMock} />
        </MockedProvider>
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search For Book By Title');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', keyCode: 13 });
    expect(setSearchResultsMock).toHaveBeenCalled();
  });
});
