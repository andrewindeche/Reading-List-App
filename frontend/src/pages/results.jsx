import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, gql } from '@apollo/client';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

const Results = ({ searchText, onAddToReadingList }) => {
  const { loading, error, data } = useQuery(GET_SEARCH_RESULTS, {
    variables: { searchText },
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToList = () => {
    setIsAdded(true);
    onAddToReadingList(book);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getBackgroundColor = () => {
    switch (true) {
    case isAdded:
      return '#5ACCCC';
    case isHovered:
      return '#CFFAFA';
    default:
      return 'white';
    }
  };

  const getButtonText = () => {
    if (isAdded) return 'Added';
    return 'Add to Library';
  };

  const getButtonIcon = () => {
    if (isAdded) return <CheckCircleIcon style={{ marginLeft: '10px' }} />;
    return <LibraryAddIcon style={{ marginLeft: '10px' }} />;
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
        {data.books.slice(currentIndex, currentIndex + 8).map((book, index) => (
          <div key={`${book.title}-${index}`} className={`imageContainer ${index === currentIndex ? 'randomFade' : ''}`}>
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
              onClick={handleAddToList}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                display: 'flex',
                alignSelf: 'center',
                justifyContent: 'center',
                padding: '5px 10px',
                borderRadius: '15px',
                fontWeight: 'bold',
                cursor: 'pointer',
                backgroundColor: getBackgroundColor(),
                color: isAdded ? 'white' : '#335C6E',
              }}
            >
              {getButtonText()}
              {getButtonIcon()}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
Results.propTypes = {
  searchText: PropTypes.string.isRequired,
  onAddToReadingList: PropTypes.func.isRequired,
};
export default Results;
