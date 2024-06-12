import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import Searchbar from 'components/searchbar';
import { SEARCH_BOOK } from 'components/searchbar';
import '@testing-library/jest-dom';

const setSearchResultsMock = jest.fn();

const mocks = [
  {
    request: {
      query: SEARCH_BOOK,
      variables: {
        title: 'example',
      },
    },
    result: {
      data: {
        books: [
          {
            title: 'Example Book',
            author: 'Author Name',
            coverPhotoURL: 'http://example.com/cover.jpg',
            readingLevel: 'Intermediate',
          },
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

  test('triggers search on button click', async () => {
    const setSearchResultsMock = jest.fn();
    render(
      <MemoryRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Searchbar setSearchResults={setSearchResultsMock} />
      </MockedProvider>
    </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'example' } });

    const button = screen.getByText('Search'); 
    fireEvent.click(button);

    await waitFor(() => {
      expect(setSearchResultsMock).toHaveBeenCalled();
    });

    expect(setSearchResultsMock).toHaveBeenCalledWith([
      {
        title: 'Example Book',
        author: 'Author Name',
        coverPhotoURL: 'http://example.com/cover.jpg',
        readingLevel: 'Intermediate',
      },
    ]);
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
