import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { InputAdornment, TextField } from '@mui/material';
import { useLazyQuery, gql } from '@apollo/client';
import SearchSuggestions from './suggestions';

const SEARCH_BOOK = gql`
  query SearchBook($title: String!) {
    books(searchText: $title) {
      title
      author
      coverPhotoURL
      readingLevel
    }
  }
`;

const Searchbar = ({ setSearchResults }) => {
  const [searchText, setSearchText] = useState('');
  const [searchBook, { data }] = useLazyQuery(SEARCH_BOOK);
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
      setFilteredSuggestions(data.books);
    } else {
      setFilteredSuggestions([]);
    }
  }, [data]);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };

  const handleSearch = () => {
    if (searchText.trim().length > 0) {
      navigate(`/searchresults/${searchText}`);
    }
    setDropdownVisible(false);
  };

  const handleItemClick = (suggestion) => {
    setSearchText(suggestion.title);
    setDropdownVisible(false);
    navigate(`/searchresults/${suggestion.title}`);
  };

  const handleKeyDown = (e, suggestion) => {
    if (e.key === 'Enter') {
      setSearchText(suggestion.title);
      setDropdownVisible(false);
      navigate(`/searchresults/${suggestion.title}`);
    }
  };

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
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
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
          {filteredSuggestions
            .filter((suggestion) => {
              const lowerCaseTitle = suggestion.title.toLowerCase();
              const lowerCaseSearchText = searchText.toLowerCase();
              return lowerCaseTitle.startsWith(lowerCaseSearchText);
            })
            .map((suggestion) => (
              <SearchSuggestions
                key={suggestion.title}
                suggestion={suggestion}
                onClick={handleItemClick}
                onKeyDown={(e) => handleKeyDown(e, suggestion)}
              />
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
