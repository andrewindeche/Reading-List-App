import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useReadingList } from '../components/listcontext';

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

const SearchResults = () => {
  const { query } = useParams();
  const { loading, error, data } = useQuery(GET_SEARCH_RESULT, {
    variables: { title: query },
  });
  const { addToReadingList, readingList } = useReadingList();
  const [hovered, setHovered] = useState(false);

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
  const isAdded = readingList.some((b) => b.title === book.title);

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

  const getButtonStyles = () => {
    let backgroundColor = 'white';
    let color = '#335C6E';
    if (isAdded) {
      backgroundColor = '#5ACCCC';
      color = 'white';
    } else if (hovered) {
      backgroundColor = '#CFFAFA';
    }

    return {
      display: 'flex',
      alignSelf: 'center',
      justifyContent: 'center',
      padding: '5px 10px',
      borderRadius: '15px',
      fontWeight: 'bold',
      cursor: 'pointer',
      backgroundColor,
      color,
    };
  };

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
            <button
              type="button"
              onClick={() => addToReadingList(book)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={getButtonStyles()}
            >
              {isAdded ? 'Added' : 'Add to Library'}
              {isAdded ? <CheckCircleIcon style={{ marginLeft: '10px' }} /> : <LibraryAddIcon style={{ marginLeft: '10px' }} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
