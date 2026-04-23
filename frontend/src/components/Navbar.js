import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../App.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand"> TEAM 4 </Link>
      <ul className="navbar-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/add">Add Member</NavLink></li>
        <li><NavLink to="/view">View Members</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;