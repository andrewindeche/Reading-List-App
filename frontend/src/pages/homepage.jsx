import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Results from './results';

const HomePage = ({ onAddToReadingList }) => {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <Results setSearchResults={setSearchResults} searchText={searchResults.length > 0 ? searchResults[0].title : ''} onAddToReadingList={onAddToReadingList} />
  );
};

HomePage.propTypes = {
  onAddToReadingList: PropTypes.func.isRequired,
};
export default HomePage;
