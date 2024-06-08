import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery, gql } from '@apollo/client';

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

  useEffect(() => {
    if (data && data.books) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 8) % data.books.length);
      }, 10000);

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
        are in the Library ㋡
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
            <button type="button" onClick={() => onAddToReadingList(book)}>
              Add To Reading List
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
