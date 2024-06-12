import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchSuggestions from 'components/suggestions';
import '@testing-library/jest-dom';

const suggestion = {
  title: 'Test Book',
  coverPhotoURL: 'test.jpg',
};

describe('SearchSuggestions', () => {
  test('renders suggestion correctly', () => {
    const { getByAltText, getByText } = render(
      <SearchSuggestions suggestion={suggestion} onClick={() => {}} onKeyDown={() => {}} />
    );

    expect(getByAltText('Test Book')).toBeInTheDocument();
    expect(getByText('Test Book')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <SearchSuggestions suggestion={suggestion} onClick={handleClick} onKeyDown={() => {}} />
    );

    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalledWith(suggestion);
  });

  test('calls onKeyDown handler when key pressed', () => {
    const handleKeyDown = jest.fn();
    const { getByRole } = render(
      <SearchSuggestions suggestion={suggestion} onClick={() => {}} onKeyDown={handleKeyDown} />
    );

    fireEvent.keyDown(getByRole('button'), { key: 'Enter', code: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledWith(expect.objectContaining({ key: 'Enter' }), suggestion);
  });
});
