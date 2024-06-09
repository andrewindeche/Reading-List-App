import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useReadingList } from '../components/listcontext';

const ReadingList = () => {
  const { readingList, removeFromReadingList } = useReadingList();

  return (
    <div className="Readinglist">
      <img
        src="https://www.shutterstock.com/image-vector/young-cute-monkey-baby-sweet-600nw-2270033121.jpg"
        alt="Profile"
        className="profileImage"
      />
      <div className="readingListContainer">
        <p className="readingListResults">
          {readingList.length}
          {' '}
          Results for
          {' '}
          <span className="resultquery">Book1</span>
        </p>
        <div className="imageRow">
          {readingList.map((book) => (
            <div key={book.title} className="imageContainer">
              <img
                src={book.coverPhotoURL}
                alt={book.title}
              />
              <p>
                Title of Book
                {' '}
                {book.title}
              </p>
              <p>
                By Author
                {' '}
                {book.author}
              </p>
              <button
                type="button"
                id="readinglistbutton"
                onClick={() => removeFromReadingList(book)}
                style={{
                  backgroundColor: '#5ACCCC',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '5px 10px',
                  justifyContent: 'center',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Remove
                <DeleteIcon style={{ marginLeft: '6px' }} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadingList;
