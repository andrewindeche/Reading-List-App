import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';

const dummySuggestions = [
  { title: 'Book 1', image: 'https://via.placeholder.com/50', id: 1 },
  { title: 'Book 2', image: 'https://via.placeholder.com/50', id: 2 },
  { title: 'Book 3', image: 'https://via.placeholder.com/50', id: 3 },
];

const Searchbar = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    if (searchText.length > 0) {
      setFilteredSuggestions(
        // eslint-disable-next-line max-len
        dummySuggestions.filter((suggestion) => suggestion.title.toLowerCase().includes(searchText.toLowerCase())),
      );
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  }, [searchText]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleItemClick = (suggestion) => {
    setSearchText(suggestion.title);
    setDropdownVisible(false);
  };
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
      <button className="searchButton" type="button">Search</button>
      {dropdownVisible && (
        <div className="dropdown">
          {filteredSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="dropdownItem"
              onClick={() => handleItemClick(suggestion)}
            >
              <img src={suggestion.image} alt={suggestion.title} className="dropdownItemImage" />
              <p className="dropdownItemText">{suggestion.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
