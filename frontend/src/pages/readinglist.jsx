import React, { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useReadingList } from '../components/listcontext';

const ReadingList = () => {
  const { readingList, removeFromReadingList } = useReadingList();
  const [isHovered, setIsHovered] = useState(false);

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
          <span className="resultquery">Ello User</span>
        </p>
        <div className="imageRow">
          {readingList.map((book) => (
            <div key={book.title} className="imageContainer">
              <img
                src={book.coverPhotoURL}
                alt={book.title}
              />
              <p>
                {' '}
                {book.title}
              </p>
              <p>
                By:
                {' '}
                {book.author}
              </p>
              <button
                type="button"
                id="readinglistbutton"
                onClick={() => removeFromReadingList(book.title)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  backgroundColor: isHovered ? '#5ACCCC' : 'white',
                  color: isHovered ?  'white' : '#5ACCCC' ,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '5px 10px',
                  justifyContent: 'center',
                  borderRadius: '15px',
                  cursor: 'pointer',
                }}
              >
                {isHovered ? (
                  <>
                    <DeleteIcon style={{ marginRight: '6px' }} />
                    Remove
                  </>
                ) : (
                  <>
                    <CheckCircleIcon style={{ marginRight: '6px' }} />
                    Added
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadingList;
