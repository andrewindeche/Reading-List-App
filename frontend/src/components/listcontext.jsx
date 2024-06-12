import React, {
  createContext, useContext, useState, useMemo,useCallback
} from 'react';
import PropTypes from 'prop-types';

const ReadingListContext = createContext();

export const useReadingList = () => useContext(ReadingListContext);

export const ReadingListProvider = ({ children }) => {
  const [readingList, setReadingList] = useState([]);

  const addToReadingList = useCallback((book) => {
    setReadingList((prevList) => {
      if (prevList.some((b) => b.title === book.title)) return prevList;
      return [...prevList, book];
    });
  }, []);

  const removeFromReadingList = useCallback((title) => {
    setReadingList((prevList) => prevList.filter((book) => book.title !== title));
  }, []);;

  const contextValue = useMemo(() => ({
    readingList,
    addToReadingList,
    removeFromReadingList,
  }), [readingList, addToReadingList, removeFromReadingList]);

  return (
    <ReadingListContext.Provider value={contextValue}>
      {children}
    </ReadingListContext.Provider>
  );
};
ReadingListProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
