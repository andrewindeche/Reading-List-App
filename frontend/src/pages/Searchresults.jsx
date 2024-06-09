import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_SEARCH_RESULT = gql`
  query GetSearchResult($title: String!) {
    book(title: $title) {
      title
      author
      coverPhotoURL
      readingLevel
    }
  }
`;

const SearchResults = ({ onAddToReadingList }) => {
  const { query } = useParams();
  const { loading, error, data } = useQuery(GET_SEARCH_RESULT, {
    variables: { title: query },
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
  if (!data || !data.book) return <p>No book found.</p>;

  const { book } = data;

  return (
    <div className="resultsPageContainer">
      <p className="searchResults">
        Search Results for &quot;
        <span className="resultquery">{query}</span>
        &quot;
      </p>
      <div className="imageGrid">
        <div className="imageCard">
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
      </div>
    </div>
  );
};
SearchResults.propTypes = {
  onAddToReadingList: PropTypes.func.isRequired,
};

export default SearchResults;
