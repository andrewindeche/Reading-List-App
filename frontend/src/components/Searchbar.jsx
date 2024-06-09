import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { InputAdornment, TextField } from '@mui/material';
import { useLazyQuery, gql } from '@apollo/client';

const SEARCH_BOOK = gql`
  query SearchBook($title: String!) {
    book(title: $title) {
      title
      author
      coverPhotoURL
      readingLevel
    }
  }
`;

const Searchbar = ({ setSearchResults }) => {
  const [searchText, setSearchText] = useState('');
  const [searchBook, { loading, error, data }] = useLazyQuery(SEARCH_BOOK);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchText.length > 0) {
      searchBook({ variables: { title: searchText } });
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
      setSearchResults([]);
    }
  }, [searchText, searchBook, setSearchResults]);

  useEffect(() => {
    if (data && data.books) {
      setSearchResults([data.book]);
      const lowerCaseSearchText = searchText.toLowerCase();

      const prioritizedSuggestions = data.books
        .filter((book) => book.title.toLowerCase().startsWith(lowerCaseSearchText))
        .sort((a, b) => a.title.localeCompare(b.title));

      const otherSuggestions = data.books
        .filter((book) => !book.title.toLowerCase().startsWith(lowerCaseSearchText))
        .filter((book) => book.title.toLowerCase().includes(lowerCaseSearchText))
        .sort((a, b) => a.title.localeCompare(b.title));

      setFilteredSuggestions([...prioritizedSuggestions, ...otherSuggestions]);
    } else {
      setSearchResults([]);
    }
  }, [data, setSearchResults, searchText]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    if (searchText.trim().length > 0) {
      searchBook({ variables: { title: searchText } });
      navigate(`/searchresults/${searchText}`);
    } else {
      setSearchResults([]);
      const exactMatch = filteredSuggestions.find(
        (suggestion) => suggestion.title.toLowerCase() === searchText.toLowerCase(),
      );
      if (exactMatch) {
        setSearchResults([exactMatch]);
      } else {
        setSearchResults(filteredSuggestions);
      }
      navigate(`/searchresults/${searchText}`);
    }
    setDropdownVisible(false);
  };

  const handleItemClick = (suggestion) => {
    setSearchText(suggestion.title);
    setDropdownVisible(false);
    handleSearch();
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
        ref={inputRef}
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
