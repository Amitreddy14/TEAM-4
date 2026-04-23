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

  if (loading) return <div style={styles.center}><p style={{color:'#888'}}>Loading...</p></div>;
  if (!member) return <div style={styles.center}><p style={{color:'#f5576c'}}>Member not found.</p></div>;

  const hobbies = member.hobbies
    ? member.hobbies.split(',').map(h => h.trim())
    : [];

  return (
    <div style={styles.container}>
      <Link to="/view" style={styles.back}>← Back to Members</Link>

      <div style={styles.card}>

        {/* Cover Image */}
        {member.image
          ? <img src={`http://localhost:5000/uploads/${member.image}`} alt={member.name} style={styles.cover} />
          : <div style={styles.coverPlaceholder}>👤</div>
        }

        {/* Name & Degree */}
        <div style={styles.header}>
          <h2 style={styles.name}>{member.name}</h2>
          <p style={styles.sub}>{member.degree} · {member.year}</p>
        </div>

        {/* Details Grid */}
        <div style={styles.grid}>
          <div style={styles.item}>
            <p style={styles.label}>Roll Number</p>
            <p style={styles.value}>{member.roll}</p>
          </div>
          <div style={styles.item}>
            <p style={styles.label}>Degree</p>
            <p style={styles.value}>{member.degree}</p>
          </div>
          <div style={styles.item}>
            <p style={styles.label}>Year</p>
            <p style={styles.value}>{member.year}</p>
          </div>
          <div style={styles.item}>
            <p style={styles.label}>Certificate</p>
            <p style={styles.value}>{member.certificate || '—'}</p>
          </div>
          <div style={styles.item}>
            <p style={styles.label}>Internship</p>
            <p style={styles.value}>{member.internship || '—'}</p>
          </div>
          <div style={{...styles.item, gridColumn: '1 / -1'}}>
            <p style={styles.label}>About Project</p>
            <p style={styles.value}>{member.aboutProject || '—'}</p>
          </div>
          <div style={{...styles.item, gridColumn: '1 / -1'}}>
            <p style={styles.label}>About Your Aim</p>
            <p style={styles.value}>{member.aboutAim || '—'}</p>
          </div>
          {hobbies.length > 0 && (
            <div style={{...styles.item, gridColumn: '1 / -1'}}>
              <p style={styles.label}>Hobbies</p>
              <div style={styles.hobbies}>
                {hobbies.map((h, i) => (
                  <span key={i} style={styles.tag}>{h}</span>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: { background: '#0f0f1a', minHeight: '90vh', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  center: { background: '#0f0f1a', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  back: { alignSelf: 'flex-start', color: '#667eea', textDecoration: 'none', marginBottom: '1.5rem', fontSize: '0.9rem' },
  card: { background: '#1a1a2e', borderRadius: '20px', overflow: 'hidden', width: '100%', maxWidth: '700px', border: '1px solid rgba(255,255,255,0.07)' },
  cover: { width: '100%', height: '250px', objectFit: 'cover', display: 'block' },
  coverPlaceholder: { width: '100%', height: '250px', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem' },
  header: { textAlign: 'center', padding: '1.5rem 1.5rem 0' },
  name: { color: '#fff', fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.3rem' },
  sub: { color: '#888', fontSize: '0.95rem', marginBottom: '0' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1.5rem' },
  item: { background: '#0f0f1a', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' },
  label: { color: '#667eea', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' },
  value: { color: '#e0e0e0', fontSize: '0.95rem' },
  hobbies: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.4rem' },
  tag: { background: 'rgba(102,126,234,0.15)', border: '1px solid rgba(102,126,234,0.3)', color: '#667eea', padding: '0.2rem 0.75rem', borderRadius: '20px', fontSize: '0.82rem' },
};

export default MemberDetailsPage;