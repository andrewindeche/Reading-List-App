import React, {
  createContext, useContext, useState, useMemo,
} from 'react';
import PropTypes from 'prop-types';

const ReadingListContext = createContext();

export const useReadingList = () => useContext(ReadingListContext);

export const ReadingListProvider = ({ children }) => {
  const [readingList, setReadingList] = useState([]);

  const addToReadingList = (book) => {
    if (!readingList.some((b) => b.title === book.title)) {
      setReadingList((prevList) => [...prevList, book]);
    }
  };

  const removeFromReadingList = (title) => {
    setReadingList((prevList) => prevList.filter((book) => book.title !== title));
  };

  const contextValue = useMemo(() => ({
    readingList,
    addToReadingList,
    removeFromReadingList,
  }), [readingList]);

  return (
    <ReadingListContext.Provider value={contextValue}>
      {children}
    </ReadingListContext.Provider>
  );
};
ReadingListProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
