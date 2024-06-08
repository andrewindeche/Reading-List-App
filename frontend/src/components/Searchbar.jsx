import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { InputAdornment, TextField } from '@mui/material';
import { useLazyQuery, gql } from '@apollo/client';

const SEARCH_BOOKS = gql`
  query SearchBooks($searchText: String!) {
    books(searchText: $searchText) {
      title
      author
      coverPhotoURL
      readingLevel
    }
  }
`;

const Searchbar = ({ setSearchResults }) => {
  const [searchText, setSearchText] = useState('');
  const [searchBooks, { loading, error, data }] = useLazyQuery(SEARCH_BOOKS);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchText.length > 0) {
      searchBooks({ variables: { searchText } });
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
      setSearchResults([]);
    }
  }, [searchText, searchBooks, setSearchResults]);

  useEffect(() => {
    if (data && data.books) {
      setFilteredSuggestions(data.books);
    }
  }, [data, setSearchResults]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    setSearchResults(filteredSuggestions);
    searchBooks({ variables: { searchText } });
    setDropdownVisible(false);
    navigate(`/results/${searchText}`);
  };

  const handleItemClick = (suggestion) => {
    setSearchText(suggestion.title);
    setDropdownVisible(false);
  };

  const handleKeyDown = (e, suggestion) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleItemClick(suggestion);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <p>
        Error:
        {' '}
        {error.message}
      </p>
    );
  }

  return (
    <div className="searchBarContainer">
      <TextField
        variant="outlined"
        sx={{ '& .MuiOutlinedInput-root': { borderColor: 'green' } }}
        className="searchBar"
        placeholder="Search For Book By Title"
        value={searchText}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <button className="searchButton" type="button" onClick={handleSearch}>Search</button>
      {dropdownVisible && (
        <div className="dropdown">
          {filteredSuggestions.map((suggestion) => (
            <div
              key={suggestion.title}
              className="dropdownItem"
              role="button"
              tabIndex={0}
              onClick={() => handleItemClick(suggestion)}
              onKeyDown={(e) => handleKeyDown(e, suggestion)}
            >
              <img src={suggestion.coverPhotoURL} alt={suggestion.title} className="dropdownItemImage" />
              <p className="dropdownItemText">{suggestion.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
Searchbar.propTypes = {
  setSearchResults: PropTypes.func.isRequired,
};

export default Searchbar;
