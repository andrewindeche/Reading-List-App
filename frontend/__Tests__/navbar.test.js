import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from 'components/navbar'; 
import '@testing-library/jest-dom';

describe('NavBar', () => {
  test('renders search link', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const searchLink = screen.getByText('Search');
    expect(searchLink).toBeInTheDocument();
    expect(searchLink).toHaveAttribute('href', '/');
  });

  test('renders reading list link', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const readingListLink = screen.getByText('My Reading List');
    expect(readingListLink).toBeInTheDocument();
    expect(readingListLink).toHaveAttribute('href', '/readinglist');
  });

  test('sets active class for active NavLink', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <NavBar />
      </MemoryRouter>
    );

    const activeNavLink = screen.getByText('Search');
    expect(activeNavLink).toHaveClass('activeNavLink');
  });
});