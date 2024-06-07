import React from 'react';
import image1 from '../assets/image1.webp';

const numberOfBooks = 3;
const Searchresults = ({ onAddToReadingList }) => (
  <div className="searchResultsContainer">
    <p className="searchResults">
      12 Search Results for
      {' '}
      <span className="resultquery">Book1</span>
    </p>
    <div className="imageRow">
      {[...Array(numberOfBooks)].map((_, index) => (
        <div key={index} className="imageContainer">
          <img src={image1} alt={`Book ${index + 1}`} />
          <p>
            Title of Book
            {' '}
            {index + 1}
          </p>
          <p>
            By Author
            {' '}
            {index + 1}
          </p>
          <button type="button" onClick={() => onAddToReadingList({ title: `Title of Book ${index + 1}`, author: `Author ${index + 1}` })}>
            Add To Reading List
          </button>
        </div>
      ))}
    </div>
  </div>
);
export default Searchresults;
