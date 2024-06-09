import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const numberOfBooks = 3;
const ReadingList = ({ onAddToReadingList }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleRemoveFromList = () => {
    setIsRemoved(true);
    onAddToReadingList(book);
  };

  const getBackgroundColor = () => {
    switch (true) {
    case isRemoved:
      return '#5ACCCC';
    default:
      return 'white';
    }
  };

  const getButtonText = () => {
    if (isRemoved) return 'Removed';
    return 'Add to Library';
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
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
              <button
                type="button"
                onClick={() => onAddToReadingList({ title: `Title of Book ${index + 1}`, author: `Author ${index + 1}` })}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  backgroundColor: isHovered ? 'white' : '#5ACCCC',
                  color: isHovered ? '#5ACCCC' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '5px 10px',
                  justifyContent: 'center',
                }}
              >
                {isHovered ? 'Remove' : 'Added' }
                {isHovered ? (
                  <DeleteIcon style={{ marginLeft: '6px' }} />
                ) : (
                  <CheckCircleIcon style={{ marginLeft: '6px', color: 'white' }} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
ReadingList.propTypes = {
  onAddToReadingList: PropTypes.func.isRequired,
};
export default ReadingList;
