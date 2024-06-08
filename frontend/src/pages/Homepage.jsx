import React from 'react';
import Searchbar from '../components/Searchbar';
import Searchresults from '../components/Searchresults';

const HomePage = ({ searchResults, onAddToReadingList }) => (
  <>
    <Searchbar />
    <Searchresults searchResults={searchResults} onAddToReadingList={onAddToReadingList} />
  </>

);
export default HomePage;
