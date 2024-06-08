import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './style.css';
import HomePage from './pages/Homepage';
import Navbar from './components/Navbar';
import Readinglist from './pages/ReadingList';
import Searchbar from './components/Searchbar';
import SearchResults from './pages/Searchresults';
import ErrorPage from './pages/Errorpage';

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
      <Navbar />
      <Searchbar setSearchResults={setSearchResults} />
      <Routes>
        <Route path="/results/:query" element={<SearchResults onAddToReadingList={handleAddToReadingList} />} />
        <Route path="/" element={<HomePage onAddToReadingList={handleAddToReadingList} />} />
        <Route path="/readinglist" element={<Readinglist />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};
export default App;
