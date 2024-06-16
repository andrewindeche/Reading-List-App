import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from 'components/navbar'; 
import '@testing-library/jest-dom';

describe('NavBar', () => {
  const renderWithRouter = (ui) => {
    return render(ui, { wrapper: BrowserRouter });
  };
  
  test('renders search link', () => {
    renderWithRouter(<NavBar />);
    const searchLink = screen.getByText('Search');
    expect(searchLink.closest('a')).toHaveAttribute('href', '/');
  });

  test('renders reading list link', () => {
    renderWithRouter(<NavBar />);
    const readingListLink = screen.getByText('My Reading List');
    expect(readingListLink.closest('a')).toHaveAttribute('href', '/readinglist');
  });

  test('sets active class for active NavLink', () => {
    renderWithRouter(<NavBar />);
    const searchLink = screen.getByText('Search').closest('a');
    const readingListLink = screen.getByText('My Reading List').closest('a');

    expect(searchLink).toHaveClass('navLink');
    expect(readingListLink).not.toHaveClass('activeNavLink');
  });
});