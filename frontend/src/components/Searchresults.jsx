import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, gql } from '@apollo/client';

const GET_SEARCH_RESULTS = gql`
  query GetSearchResults($searchText: String!) {
    searchResults(searchText: $searchText) {
      title
      author
      coverPhotoURL
    }
  }
`;

const Searchresults = ({ searchText, onAddToReadingList }) => {
  const { loading, error, data } = useQuery(GET_SEARCH_RESULTS, {
    variables: { searchText },
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
    <div className="searchResultsContainer">
      <p className="searchResults">
        {data.searchResults.length}
        {' '}
        Search Results for
        {' '}
        <span className="resultquery">Book1</span>
      </p>
      <div className="imageRow">
        {data.searchResults.map((book) => (
          <div key={book.title} className="imageContainer">
            <img src={book.coverPhotoURL} alt={book.title} />
            <p>
              Title of Book
              {book.title}
            </p>
            <p>
              By Author
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
Searchresults.propTypes = {
  searchText: PropTypes.string.isRequired,
  onAddToReadingList: PropTypes.func.isRequired,
};
export default Searchresults;
