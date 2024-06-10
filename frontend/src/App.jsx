import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './style.css';
import HomePage from './pages/homepage';
import NavBar from './components/navbar';
import ReadingList from './pages/readinglist';
import SearchBar from './components/searchbar';
import SearchResults from './pages/searchresults';

const ErrorPage = React.lazy(() => import('./pages/errorpage'));

const App = () => {
  const [readingList, setReadingList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleAddToReadingList = (book) => {
    if (!readingList.some((item) => item.title === book.title)) {
      setReadingList([...readingList, book]);
    }
  };
  return (
    <>
      <NavBar />
      <SearchBar searchResults={searchResults} setSearchResults={setSearchResults} />
      <Routes>
        <Route path="/searchresults/:query" element={<SearchResults onAddToReadingList={handleAddToReadingList} />} />
        <Route path="/" element={<HomePage onAddToReadingList={handleAddToReadingList} />} />
        <Route path="/readinglist" element={<ReadingList />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
