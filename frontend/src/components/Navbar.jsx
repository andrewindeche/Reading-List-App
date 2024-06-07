import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <div className="navBar">
    <img className="navImage" src="https://ml.globenewswire.com/Resource/Download/671a4959-db29-4139-a53e-5ca7e3294702?size=2" alt="Ello Logo" />
    <span className="navLinks">
      <Link to="/">
        <p>Search</p>
      </Link>
      <p>My Reading List</p>
    </span>
  </div>
);
export default Navbar;
