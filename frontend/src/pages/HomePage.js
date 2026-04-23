import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={styles.container}>

      {/* Background grid */}
      <div style={styles.grid}></div>

      {/* Glow orbs */}
      <div style={{...styles.orb, top: '20%', left: '15%', background: 'rgba(102,126,234,0.15)'}}></div>
      <div style={{...styles.orb, bottom: '20%', right: '15%', background: 'rgba(240,147,251,0.1)'}}></div>

      <div style={styles.content}>
        {/* Badge */}
        <div style={styles.badge}>⚡ SRM Institute · Full Stack Development</div>

        {/* Title */}
        <h1 style={styles.title}>TEAM BLUE</h1>

        {/* Animated underline */}
        <div style={styles.underline}></div>

        <p style={styles.subtitle}>Welcome to the BLUE Team Management System</p>
        <p style={styles.desc}>
          Manage your team members, track internships, certifications, and projects — all in one place.
        </p>

        {/* Card */}
        <div style={styles.card}>
          <p style={styles.cardLabel}>🚀 Manage Team</p>
          <div style={styles.buttons}>
            <Link to="/add" style={styles.btnPrimary}>
              ➕ Add Member
            </Link>
            <Link to="/view" style={styles.btnSecondary}>
              👥 View Members
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div style={styles.statsRow}>
          <div style={styles.stat}>
            <span style={styles.statNum}>React</span>
            <span style={styles.statLabel}>Frontend</span>
          </div>
          <div style={styles.statDivider}></div>
          <div style={styles.stat}>
            <span style={styles.statNum}>Node.js</span>
            <span style={styles.statLabel}>Backend</span>
          </div>
          <div style={styles.statDivider}></div>
          <div style={styles.stat}>
            <span style={styles.statNum}>MongoDB</span>
            <span style={styles.statLabel}>Database</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '92vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#070714',
    position: 'relative',
    overflow: 'hidden',
    padding: '2rem',
  },
  grid: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(102,126,234,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(102,126,234,0.05) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
    pointerEvents: 'none',
  },
  orb: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    filter: 'blur(80px)',
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    textAlign: 'center',
    maxWidth: '680px',
    width: '100%',
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(102,126,234,0.1)',
    border: '1px solid rgba(102,126,234,0.3)',
    color: '#667eea',
    padding: '0.4rem 1.2rem',
    borderRadius: '20px',
    fontSize: '0.78rem',
    letterSpacing: '1px',
    marginBottom: '1.5rem',
  },
  title: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '4.5rem',
    fontWeight: '900',
    letterSpacing: '8px',
    background: 'linear-gradient(135deg, #667eea 0%, #f093fb 50%, #667eea 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.8rem',
    textShadow: 'none',
  },
  underline: {
    width: '80px',
    height: '3px',
    background: 'linear-gradient(90deg, #667eea, #f093fb)',
    margin: '0 auto 1.5rem',
    borderRadius: '2px',
  },
  subtitle: {
    color: '#888',
    fontSize: '1.05rem',
    letterSpacing: '1px',
    marginBottom: '0.8rem',
  },
  desc: {
    color: '#444',
    fontSize: '0.88rem',
    lineHeight: '1.7',
    marginBottom: '2.5rem',
    maxWidth: '480px',
    margin: '0 auto 2.5rem',
  },
  card: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(102,126,234,0.2)',
    borderRadius: '20px',
    padding: '2rem 3rem',
    marginBottom: '2rem',
    backdropFilter: 'blur(10px)',
  },
  cardLabel: {
    color: '#555',
    fontSize: '0.82rem',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '1.2rem',
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff',
    padding: '0.85rem 2rem',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.95rem',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 20px rgba(102,126,234,0.4)',
    transition: 'all 0.3s',
  },
  btnSecondary: {
    background: 'transparent',
    color: '#667eea',
    padding: '0.85rem 2rem',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.95rem',
    border: '1px solid rgba(102,126,234,0.4)',
    letterSpacing: '0.5px',
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  statNum: {
    color: '#667eea',
    fontWeight: '700',
    fontSize: '0.95rem',
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '1px',
  },
  statLabel: {
    color: '#444',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  statDivider: {
    width: '1px',
    height: '30px',
    background: 'rgba(102,126,234,0.2)',
  },
};

export default HomePage;