import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar'; 
import '@testing-library/jest-dom';

describe('Navbar Component', () => {
  test('renders Navbar with logo image', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    
    const logoImage = screen.getByAltText(/Ello Logo/i);
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', 'https://ml.globenewswire.com/Resource/Download/671a4959-db29-4139-a53e-5ca7e3294702?size=2');
  });

  test('renders Search link', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const searchLink = screen.getByText(/Search/i);
    expect(searchLink).toBeInTheDocument();
    expect(searchLink.closest('a')).toHaveAttribute('href', '/');
  });

  test('renders My Reading List link', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const readingListLink = screen.getByText(/My Reading List/i);
    expect(readingListLink).toBeInTheDocument();
    expect(readingListLink.closest('a')).toHaveAttribute('href', '/readinglist');
  });
});
