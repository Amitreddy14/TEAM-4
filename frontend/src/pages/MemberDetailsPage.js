import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function MemberDetailsPage() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/members/${id}`)
      .then(res => setMember(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={styles.center}>
      <div style={styles.spinner}></div>
      <p style={{color:'#555', marginTop:'1rem'}}>Loading profile...</p>
    </div>
  );

  if (!member) return (
    <div style={styles.center}>
      <p style={{fontSize:'3rem'}}>❌</p>
      <p style={{color:'#f5576c', marginBottom:'1rem'}}>Member not found.</p>
      <Link to="/view" style={styles.backBtn}>← Back to Members</Link>
    </div>
  );

  const hobbies = member.hobbies
    ? member.hobbies.split(',').map(h => h.trim()).filter(Boolean)
    : [];

  return (
    <div style={styles.container}>
      <div style={styles.grid}></div>

      <div style={styles.inner}>
        <Link to="/view" style={styles.back}>← Back to Members</Link>

        <div style={styles.card}>

          {/* Top banner with image */}
          <div style={styles.banner}>
            <div style={styles.bannerGlow}></div>
            {member.image
              ? <img src={`http://localhost:5000/uploads/${member.image}`} alt={member.name} style={styles.bannerImg} />
              : <div style={styles.bannerPlaceholder}>👤</div>
            }
            <div style={styles.bannerOverlay}></div>
          </div>

          {/* Avatar overlapping banner */}
          <div style={styles.avatarWrapper}>
            {member.image
              ? <img src={`http://localhost:5000/uploads/${member.image}`} alt={member.name} style={styles.avatar} />
              : <div style={styles.avatarPlaceholder}>👤</div>
            }
            <div style={styles.avatarRing}></div>
          </div>

          {/* Name & info */}
          <div style={styles.nameSection}>
            <h2 style={styles.name}>{member.name}</h2>
            <p style={styles.sub}>{member.degree} · {member.year}</p>
            <div style={styles.tagRow}>
              <span style={styles.tag}>🎓 {member.roll}</span>
              {member.internship && <span style={styles.tag}>💼 {member.internship}</span>}
              {member.certificate && <span style={styles.tag}>🏅 {member.certificate}</span>}
            </div>
          </div>

          <div style={styles.divider}></div>

          {/* Details grid */}
          <div style={styles.detailsGrid}>
            <DetailBox label="Roll Number" value={member.roll} icon="🎓" />
            <DetailBox label="Degree" value={member.degree} icon="📚" />
            <DetailBox label="Year" value={member.year} icon="📅" />
            <DetailBox label="Certificate" value={member.certificate || '—'} icon="🏅" />
            <DetailBox label="Internship" value={member.internship || '—'} icon="💼" />

            {member.aboutProject && (
              <div style={{...styles.box, gridColumn: '1 / -1'}}>
                <p style={styles.boxLabel}>🚀 About Project</p>
                <p style={styles.boxValue}>{member.aboutProject}</p>
              </div>
            )}

            {member.aboutAim && (
              <div style={{...styles.box, gridColumn: '1 / -1'}}>
                <p style={styles.boxLabel}>🎯 About Your Aim</p>
                <p style={styles.boxValue}>{member.aboutAim}</p>
              </div>
            )}

            {hobbies.length > 0 && (
              <div style={{...styles.box, gridColumn: '1 / -1'}}>
                <p style={styles.boxLabel}>🎮 Hobbies</p>
                <div style={styles.hobbies}>
                  {hobbies.map((h, i) => (
                    <span key={i} style={styles.hobbyTag}>{h}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

function DetailBox({ label, value, icon }) {
  return (
    <div style={styles.box}>
      <p style={styles.boxLabel}>{icon} {label}</p>
      <p style={styles.boxValue}>{value}</p>
    </div>
  );
}

const styles = {
  container: { background: '#070714', minHeight: '92vh', padding: '2rem', position: 'relative', overflow: 'hidden' },
  center: { background: '#070714', minHeight: '92vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  grid: { position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(102,126,234,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(102,126,234,0.04) 1px, transparent 1px)`, backgroundSize: '50px 50px', pointerEvents: 'none' },
  inner: { position: 'relative', maxWidth: '750px', margin: '0 auto' },
  back: { display: 'inline-block', color: '#667eea', textDecoration: 'none', marginBottom: '1.5rem', fontSize: '0.88rem', border: '1px solid rgba(102,126,234,0.2)', padding: '0.4rem 1rem', borderRadius: '8px', background: 'rgba(102,126,234,0.05)' },
  backBtn: { color: '#667eea', textDecoration: 'none', border: '1px solid rgba(102,126,234,0.3)', padding: '0.5rem 1.2rem', borderRadius: '8px' },
  card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(102,126,234,0.15)', borderRadius: '24px', overflow: 'hidden' },

  // Banner
  banner: { position: 'relative', height: '180px', overflow: 'hidden' },
  bannerImg: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', filter: 'blur(8px) brightness(0.4)', transform: 'scale(1.1)' },
  bannerPlaceholder: { width: '100%', height: '100%', background: 'linear-gradient(135deg, #1a1a3e, #667eea)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem' },
  bannerOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, #070714)' },
  bannerGlow: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(102,126,234,0.3), transparent 70%)', zIndex: 1 },

  // Avatar
  avatarWrapper: { position: 'relative', width: '110px', height: '110px', margin: '-55px auto 0', zIndex: 10 },
  avatar: { width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 20%', border: '3px solid #667eea', display: 'block' },
  avatarPlaceholder: { width: '110px', height: '110px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', border: '3px solid #667eea' },
  avatarRing: { position: 'absolute', inset: '-4px', borderRadius: '50%', border: '1px solid rgba(102,126,234,0.3)' },

  // Name section
  nameSection: { textAlign: 'center', padding: '1.2rem 2rem 0' },
  name: { fontFamily: "'Orbitron', sans-serif", color: '#fff', fontSize: '1.6rem', fontWeight: '700', marginBottom: '0.4rem', letterSpacing: '2px' },
  sub: { color: '#555', fontSize: '0.9rem', marginBottom: '0.8rem' },
  tagRow: { display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' },
  tag: { background: 'rgba(102,126,234,0.1)', border: '1px solid rgba(102,126,234,0.25)', color: '#667eea', padding: '0.25rem 0.8rem', borderRadius: '20px', fontSize: '0.78rem' },

  divider: { height: '1px', background: 'rgba(102,126,234,0.1)', margin: '0 2rem' },

  // Details
  detailsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', padding: '1.5rem 2rem 2rem' },
  box: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(102,126,234,0.1)', borderRadius: '12px', padding: '1rem' },
  boxLabel: { color: '#667eea', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', fontWeight: '600' },
  boxValue: { color: '#ccc', fontSize: '0.9rem', lineHeight: '1.5' },
  hobbies: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.4rem' },
  hobbyTag: { background: 'rgba(240,147,251,0.08)', border: '1px solid rgba(240,147,251,0.2)', color: '#f093fb', padding: '0.2rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem' },

  spinner: { width: '40px', height: '40px', border: '3px solid rgba(102,126,234,0.2)', borderTop: '3px solid #667eea', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
};

export default MemberDetailsPage;