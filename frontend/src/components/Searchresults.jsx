import React from "react";
import image1 from '../assets/image1.webp';

const Searchresults = () => (
  <div className="searchResultsContainer">
    <p className="searchResults">
      12 Search Results for
      {' '}
      <span className="resultquery">Book1</span>
    </p>
    <div className="card-grid">
      <p>Cards</p>
    </div>
  </div>
);
export default Searchresults;
