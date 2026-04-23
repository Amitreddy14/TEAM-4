import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>⚡ Team Blue</span>
      <div style={styles.links}>
        <NavLink to="/" style={styles.link}>Home</NavLink>
        <NavLink to="/add" style={styles.link}>Add Member</NavLink>
        <NavLink to="/view" style={styles.link}>View Members</NavLink>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: '#1a1a2e',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.3rem',
    letterSpacing: '2px',
  },
  links: { display: 'flex', gap: '1.5rem' },
  link: { color: '#aaa', textDecoration: 'none', fontSize: '0.95rem' },
};

export default Navbar;