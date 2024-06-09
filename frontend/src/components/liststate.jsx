import React, { useState } from 'react';
import Results from './pages/results';
import ReadingList from './pages/readinglist';

const ListState = () => {
  const [readingList, setReadingList] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleAddToReadingList = (book) => {
    setReadingList((prevList) => [...prevList, book]);
  };

  return (
    <div>
      <Results searchText={searchText} onAddToReadingList={handleAddToReadingList} />
      <ReadingList readingList={readingList} />
    </div>
  );
};

export default ListState;
