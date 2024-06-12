import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorPage from 'pages/errorpage';
import '@testing-library/jest-dom';

describe('ErrorPage', () => {
  test('renders link to home page', () => {
    render(<ErrorPage />);

    const link = screen.getByText(/go back to home/i);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
