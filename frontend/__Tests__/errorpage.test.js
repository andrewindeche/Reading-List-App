import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorPage from 'pages/errorpage';

describe('ErrorPage', () => {
  test('renders error message and image', () => {
    render(<ErrorPage />);

    const errorMessage = screen.getByText(/404/i);
    expect(errorMessage).toBeInTheDocument();

    const image = screen.getByAltText('Error');
    expect(image).toBeInTheDocument();
  });

  test('renders link to home page', () => {
    render(<ErrorPage />);

    const link = screen.getByText(/go back to home/i);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
