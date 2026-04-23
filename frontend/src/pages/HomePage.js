import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>TEAM BLUE</h1>
      <p style={styles.subtitle}>Welcome to the BLUE Team Management System</p>

      <div style={styles.card}>
        <p style={styles.cardLabel}>Manage Team</p>
        <div style={styles.buttons}>
          <Link to="/add" style={styles.btnPrimary}>Add Member</Link>
          <Link to="/view" style={styles.btnSecondary}>View Members</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0f0f1a',
    textAlign: 'center',
    padding: '2rem',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '800',
    letterSpacing: '6px',
    color: '#667eea',
    marginBottom: '1rem',
  },
  subtitle: {
    color: '#888',
    fontSize: '1.1rem',
    marginBottom: '2.5rem',
  },
  card: {
    background: '#1a1a2e',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '2rem 3rem',
  },
  cardLabel: {
    color: '#555',
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '1.2rem',
  },
  buttons: { display: 'flex', gap: '1rem' },
  btnPrimary: {
    background: '#667eea',
    color: '#fff',
    padding: '0.75rem 1.8rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
  },
  btnSecondary: {
    background: 'transparent',
    color: '#667eea',
    padding: '0.75rem 1.8rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    border: '2px solid #667eea',
  },
};

export default HomePage;