import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

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

const SearchResults = ({ onAddToReadingList }) => {
  const { query } = useParams();
  const { loading, error, data } = useQuery(GET_SEARCH_RESULTS, {
    variables: { searchText: query },
  });
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
    <div className="resultsPageContainer">
      <p className="searchResults">
        Search Results for &quot;
        <span className="resultquery">{query}</span>
        &quot;
      </p>
      <div className="imageGrid">
        {data.books.map((book, index) => (
          <div key={`${book.title}-${index}`} className="imageCard">
            <img src={book.coverPhotoURL} alt={book.title} />
            <div className="bookInfo">
              <p className="bookTitle">{book.title}</p>
              <p className="bookAuthor">
                By:
                {' '}
                {book.author}
              </p>
              <button type="button" onClick={() => onAddToReadingList(book)}>
                Add To Reading List
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
SearchResults.propTypes = {
  onAddToReadingList: PropTypes.func.isRequired,
};

export default SearchResults;
