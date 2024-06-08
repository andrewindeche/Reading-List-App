import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './style.css';
import HomePage from './pages/Homepage';
import Navbar from './components/Navbar';
import Readinglist from './pages/ReadingList';

const App = () => {
  const [readingList, setReadingList] = useState([]);

  const handleAddToReadingList = (book) => {
    if (!readingList.some((item) => item.title === book.title)) {
      setReadingList([...readingList, book]);
    }
  };
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage onAddToReadingList={handleAddToReadingList} />} />
        <Route path="/readinglist" element={<Readinglist />} />
      </Routes>
    </>
  );
};
export default App;
