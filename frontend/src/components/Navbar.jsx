import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <div className="navBar">
    <img className="navImage" src="https://ml.globenewswire.com/Resource/Download/671a4959-db29-4139-a53e-5ca7e3294702?size=2" alt="Ello Logo" />
    <span className="navLinks">
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? 'navLink activeNavLink' : 'navLink')}
      >
        <p>Search</p>
      </NavLink>
      <NavLink
        to="/readinglist"
        className={({ isActive }) => (isActive ? 'navLink activeNavLink' : 'navLink')}
      >
        <p>My Reading List</p>
      </NavLink>
    </span>
  </div>
);
export default Navbar;
