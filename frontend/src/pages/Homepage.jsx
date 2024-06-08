import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Searchbar from '../components/Searchbar';
import Searchresults from '../components/Searchresults';

const HomePage = ({ onAddToReadingList }) => {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <>
      <Searchbar setSearchResults={setSearchResults} />
      <Searchresults searchText={searchResults.length > 0 ? searchResults[0].title : ''} onAddToReadingList={onAddToReadingList} />
    </>
  );
};

HomePage.propTypes = {
  onAddToReadingList: PropTypes.func.isRequired,
};
export default HomePage;
