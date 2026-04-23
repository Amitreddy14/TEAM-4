import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewMembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/members')
      .then(res => setMembers(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this member?')) return;
    try {
      await axios.delete(`http://localhost:5000/members/${id}`);
      setMembers(members.filter(m => m._id !== id));
    } catch {
      alert('Failed to delete.');
    }
  };

  if (loading) return (
    <div style={styles.center}>
      <div style={styles.spinner}></div>
      <p style={{color:'#555', marginTop:'1rem'}}>Loading members...</p>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.grid}></div>

      <div style={styles.inner}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.badge}>👥 Our Team</div>
          <h2 style={styles.title}>Meet The Team</h2>
          <div style={styles.underline}></div>
          <p style={styles.count}>{members.length} member{members.length !== 1 ? 's' : ''} in the team</p>
        </div>

        {members.length === 0 ? (
          <div style={styles.empty}>
            <p style={{fontSize:'3rem', marginBottom:'1rem'}}>👥</p>
            <p style={{color:'#555', marginBottom:'1.5rem'}}>No members yet.</p>
            <Link to="/add" style={styles.addBtn}>➕ Add First Member</Link>
          </div>
        ) : (
          <div style={styles.cardGrid}>
            {members.map(member => (
              <div key={member._id} style={styles.card}>
                {/* Glow on hover handled via inline */}
                <div style={styles.imgWrapper}>
                  {member.image
                    ? <img src={`http://localhost:5000/uploads/${member.image}`} alt={member.name} style={styles.img} />
                    : <div style={styles.placeholder}>👤</div>
                  }
                  <div style={styles.imgOverlay}></div>
                </div>

                <div style={styles.cardBody}>
                  <h3 style={styles.name}>{member.name}</h3>

                  <div style={styles.tagRow}>
                    <span style={styles.tag}>{member.degree}</span>
                    <span style={styles.tag}>{member.year}</span>
                  </div>

                  <p style={styles.roll}>🎓 {member.roll}</p>

                  {member.internship && (
                    <p style={styles.detail}>💼 {member.internship}</p>
                  )}
                  {member.certificate && (
                    <p style={styles.detail}>🏅 {member.certificate}</p>
                  )}

                  <div style={styles.actions}>
                    <Link to={`/members/${member._id}`} style={styles.viewBtn}>
                      View Details →
                    </Link>
                    <button onClick={() => handleDelete(member._id)} style={styles.deleteBtn}>
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { background: '#070714', minHeight: '92vh', padding: '2rem', position: 'relative', overflow: 'hidden' },
  center: { background: '#070714', minHeight: '92vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  grid: { position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(102,126,234,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(102,126,234,0.04) 1px, transparent 1px)`, backgroundSize: '50px 50px', pointerEvents: 'none' },
  inner: { position: 'relative', maxWidth: '1100px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '3rem' },
  badge: { display: 'inline-block', background: 'rgba(102,126,234,0.1)', border: '1px solid rgba(102,126,234,0.3)', color: '#667eea', padding: '0.4rem 1.2rem', borderRadius: '20px', fontSize: '0.78rem', letterSpacing: '1px', marginBottom: '1rem' },
  title: { fontFamily: "'Orbitron', sans-serif", fontSize: '2rem', fontWeight: '700', color: '#fff', letterSpacing: '4px', marginBottom: '0.8rem' },
  underline: { width: '60px', height: '3px', background: 'linear-gradient(90deg, #667eea, #f093fb)', margin: '0 auto 1rem' },
  count: { color: '#444', fontSize: '0.85rem', letterSpacing: '1px' },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' },
  card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(102,126,234,0.15)', borderRadius: '20px', overflow: 'hidden', transition: 'transform 0.3s, border-color 0.3s' },
  imgWrapper: { position: 'relative', height: '220px', overflow: 'hidden', background: '#0f0f1a' },
  img: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' },
  placeholder: { width: '100%', height: '100%', background: 'linear-gradient(135deg, #1a1a3e, #2d2d5e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' },
  imgOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(transparent, #070714)' },
  cardBody: { padding: '1.2rem' },
  name: { color: '#fff', fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.6rem' },
  tagRow: { display: 'flex', gap: '0.5rem', marginBottom: '0.6rem', flexWrap: 'wrap' },
  tag: { background: 'rgba(102,126,234,0.1)', border: '1px solid rgba(102,126,234,0.25)', color: '#667eea', padding: '0.15rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem' },
  roll: { color: '#555', fontSize: '0.8rem', marginBottom: '0.4rem' },
  detail: { color: '#555', fontSize: '0.8rem', marginBottom: '0.3rem' },
  actions: { display: 'flex', gap: '0.5rem', marginTop: '1rem', alignItems: 'center' },
  viewBtn: { flex: 1, textAlign: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', padding: '0.6rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.85rem' },
  deleteBtn: { background: 'rgba(245,87,108,0.1)', border: '1px solid rgba(245,87,108,0.3)', color: '#f5576c', padding: '0.6rem 0.8rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' },
  empty: { textAlign: 'center', padding: '4rem' },
  addBtn: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', padding: '0.75rem 2rem', borderRadius: '10px', textDecoration: 'none', fontWeight: '600' },
  spinner: { width: '40px', height: '40px', border: '3px solid rgba(102,126,234,0.2)', borderTop: '3px solid #667eea', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
};

export default ViewMembersPage;