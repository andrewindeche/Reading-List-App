import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers like toBeInTheDocument
import HomePage from './HomePage';

describe('HomePage component', () => {
  const mockAddToReadingList = jest.fn();

  test('renders the HomePage component', () => {
    render(<HomePage onAddToReadingList={mockAddToReadingList} />);
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });

  test('triggers search when clicking the search button', () => {
    render(<HomePage onAddToReadingList={mockAddToReadingList} />);
    fireEvent.click(screen.getByText(/search/i));
  });

  test('triggers search when pressing Enter in the search field', () => {
    render(<HomePage onAddToReadingList={mockAddToReadingList} />);
    fireEvent.keyDown(screen.getByPlaceholderText(/search/i), { key: 'Enter', code: 'Enter' });
  });

  test('displays search results when provided', () => {
    const mockSearchResults = [{ title: 'Mock Book', author: 'Mock Author', coverPhotoURL: 'mock-url' }];
    render(<HomePage onAddToReadingList={mockAddToReadingList} />);

    expect(screen.getByText(/mock book/i)).toBeInTheDocument();
    expect(screen.getByText(/mock author/i)).toBeInTheDocument();
    expect(screen.getByAltText(/mock book/i)).toBeInTheDocument();
  });
});
