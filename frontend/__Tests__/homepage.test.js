import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from 'pages/homepage';
import '@testing-library/jest-dom';

describe('HomePage', () => {
  test('renders search results component with initial search text', () => {
    const searchText = 'Initial Search Text';
    render(<HomePage onAddToReadingList={() => {}} />);

    const searchResultsComponent = screen.getByText(searchText);
    expect(searchResultsComponent).toBeInTheDocument();
  });
});
