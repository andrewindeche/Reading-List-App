import React from 'react';

const numberOfBooks = 3;
const Readinglist = ({ onAddToReadingList }) => (
  <div className="Readinglist">
    <img
      src="https://www.shutterstock.com/image-vector/young-cute-monkey-baby-sweet-600nw-2270033121.jpg"
      alt="Profile"
      className="profileImage"
    />
    <div className="readingListContainer">
      <p className="readingListResults">
        12 ReadingList Results for
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
              Added To Reading List
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default Readinglist;
