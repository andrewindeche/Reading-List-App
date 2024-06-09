import React from 'react';

const numberOfBooks = 3;
const ReadingList = ({ onAddToReadingList }) => (
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
            <img
              src="https://static.vecteezy.com/system/resources/previews/021/844/396/non_2x/error-404-page-not-found-funny-little-man-chibi-sits-thoughtfully-next-to-a-broken-wire-illustration-for-design-design-vector.jpg"
              alt="Error"
              className="Error"
            />
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
export default ReadingList;
