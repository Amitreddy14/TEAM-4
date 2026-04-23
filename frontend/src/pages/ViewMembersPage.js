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

  if (loading) return <div style={styles.center}><p style={{color:'#888'}}>Loading...</p></div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Meet Our Amazing Team</h2>
      <p style={{color:'#555', marginBottom:'2rem'}}>{members.length} member(s)</p>

      <div style={styles.grid}>
        {members.map(member => (
          <div key={member._id} style={styles.card}>
            {member.image
              ? <img src={`http://localhost:5000/uploads/${member.image}`} alt={member.name} style={styles.img} />
              : <div style={styles.placeholder}>👤</div>
            }
            <div style={styles.cardBody}>
              <h3 style={styles.name}>{member.name}</h3>
              <p style={styles.roll}>Roll: {member.roll}</p>
              <p style={styles.degree}>{member.degree} · {member.year}</p>
              <Link to={`/members/${member._id}`} style={styles.btn}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { background: '#0f0f1a', minHeight: '90vh', padding: '2rem' },
  center: { background: '#0f0f1a', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#667eea', textAlign: 'center', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.5rem' },
  grid: { display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' },
  card: { background: '#1a1a2e', borderRadius: '16px', overflow: 'hidden', width: '260px', border: '1px solid rgba(255,255,255,0.07)' },
  img: { width: '100%', height: '200px', objectFit: 'cover' },
  placeholder: { width: '100%', height: '200px', background: '#2d2d5e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' },
  cardBody: { padding: '1.2rem' },
  name: { color: '#fff', marginBottom: '0.3rem' },
  roll: { color: '#667eea', fontSize: '0.82rem', marginBottom: '0.3rem' },
  degree: { color: '#666', fontSize: '0.82rem', marginBottom: '1rem' },
  btn: { display: 'block', textAlign: 'center', background: '#667eea', color: '#fff', padding: '0.6rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '0.85rem' },
};

export default ViewMembersPage;