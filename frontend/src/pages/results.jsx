import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, gql } from '@apollo/client';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useReadingList } from '../components/listcontext';

const GET_SEARCH_RESULTS = gql`
  query GetSearchResults($searchText: String!) {
    books(searchText: $searchText) {
      title
      author
      coverPhotoURL
      readingLevel
    }
  }
`;

const Results = ({ searchText }) => {
  const { loading, error, data } = useQuery(GET_SEARCH_RESULTS, {
    variables: { searchText },
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToReadingList, readingList } = useReadingList();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToList = (book) => {
    addToReadingList(book);
  };

  const getBackgroundColor = (book) => {
    switch (true) {
    case isHovered:
      return '#CFFAFA';
    case readingList.some((b) => b.title === book.title):
      return '#5ACCCC';
    default:
      return 'white';
    }
  };

  useEffect(() => {
    if (data && data.books) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 8) % data.books.length);
      }, 8000);

      return () => clearInterval(intervalId);
    }
    return undefined;
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <p>
        Error:
        {' '}
        {error.message}
      </p>
    );
  }

  return (
    <div className="searchResultsContainer">
      <p className="searchResults">
        <span className="resultquery">
          ☺
          {data.books.length > 8 ? '100' : data.books.length}
          {' '}
          {' '}
          Books
          {' '}
        </span>
        are Available ㋡
      </p>
      <div className="imageRow">
        {data.books.slice(currentIndex, currentIndex + 8).map((book) => {
          const isAdded = readingList.some((b) => b.title === book.title);
          return (
            <div key={book.title} className={`imageContainer ${book === currentIndex ? 'randomFade' : ''}`}>
              <img src={book.coverPhotoURL} alt={book.title} />
              <p className="bookTitle">
                {book.title}
              </p>
              <p className="bookAuthor">
                By:
                {book.author}
              </p>
              <button
                type="button"
                id="resultsbutton"
                onClick={() => handleAddToList(book)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  display: 'flex',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  padding: '5px 10px',
                  borderRadius: '15px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  backgroundColor: getBackgroundColor(book),
                  color: isAdded ? 'white' : '#335C6E',
                }}
              >
                {readingList.some((b) => b.title === book.title) ? 'Added' : 'Add to Library'}
                {readingList.some((b) => b.title === book.title) ? <CheckCircleIcon style={{ marginLeft: '10px' }} /> : <LibraryAddIcon style={{ marginLeft: '10px' }} />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
Results.propTypes = {
  searchText: PropTypes.string.isRequired,
};
export default Results;
