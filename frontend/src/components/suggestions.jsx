import React from 'react';
import PropTypes from 'prop-types';

const SearchSuggestions = ({ suggestion, onClick, onKeyDown }) => (
  <div
    className="dropdownItem"
    role="button"
    tabIndex={0}
    onClick={() => onClick(suggestion)}
    onKeyDown={(e) => onKeyDown(e, suggestion)}
  >
    <img src={suggestion.coverPhotoURL} alt={suggestion.title} className="dropdownItemImage" />
    <p className="dropdownItemText">{suggestion.title}</p>
  </div>
);

SearchSuggestions.propTypes = {
  suggestion: PropTypes.shape({
    coverPhotoURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};

export default SearchSuggestions;
