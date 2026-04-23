import React, { useState } from 'react';
import axios from 'axios';

function AddMemberPage() {
  const [form, setForm] = useState({
    name: '', roll: '', year: '', degree: '',
    aboutProject: '', hobbies: '', certificate: '',
    internship: '', aboutAim: '',
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.roll.trim()) newErrors.roll = 'Roll number is required';
    if (!form.year.trim()) newErrors.year = 'Year is required';
    if (!form.degree.trim()) newErrors.degree = 'Degree is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (image) data.append('image', image);
      await axios.post('http://localhost:5000/members', data);
      setSuccess(true);
      setForm({ name: '', roll: '', year: '', degree: '', aboutProject: '', hobbies: '', certificate: '', internship: '', aboutAim: '' });
      setImage(null);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setErrors({ submit: 'Submission failed. Is the server running?' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add Team Member</h2>

      {success && <div style={styles.success}>✅ Member added successfully!</div>}
      {errors.submit && <div style={styles.errorBanner}>⚠️ {errors.submit}</div>}

      <div style={styles.card}>
        <form onSubmit={handleSubmit}>

          <div style={styles.row}>
            <div style={styles.group}>
              <label style={styles.label}>Name *</label>
              <input style={styles.input} name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />
              {errors.name && <p style={styles.error}>{errors.name}</p>}
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Roll Number *</label>
              <input style={styles.input} name="roll" value={form.roll} onChange={handleChange} placeholder="e.g. RA2111026010001" />
              {errors.roll && <p style={styles.error}>{errors.roll}</p>}
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.group}>
              <label style={styles.label}>Year *</label>
              <input style={styles.input} name="year" value={form.year} onChange={handleChange} placeholder="e.g. 2024" />
              {errors.year && <p style={styles.error}>{errors.year}</p>}
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Degree *</label>
              <input style={styles.input} name="degree" value={form.degree} onChange={handleChange} placeholder="e.g. B.Tech" />
              {errors.degree && <p style={styles.error}>{errors.degree}</p>}
            </div>
          </div>

          <div style={styles.group}>
            <label style={styles.label}>About Project</label>
            <textarea style={{...styles.input, minHeight: '80px'}} name="aboutProject" value={form.aboutProject} onChange={handleChange} placeholder="Describe your project..." />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Hobbies (comma separated)</label>
            <input style={styles.input} name="hobbies" value={form.hobbies} onChange={handleChange} placeholder="e.g. Reading, Coding, Gaming" />
          </div>

          <div style={styles.row}>
            <div style={styles.group}>
              <label style={styles.label}>Certificate</label>
              <input style={styles.input} name="certificate" value={form.certificate} onChange={handleChange} placeholder="e.g. Fullstack" />
            </div>
            <div style={styles.group}>
              <label style={styles.label}>Internship</label>
              <input style={styles.input} name="internship" value={form.internship} onChange={handleChange} placeholder="e.g. Cloud Computing" />
            </div>
          </div>

          <div style={styles.group}>
            <label style={styles.label}>About Your Aim</label>
            <textarea style={{...styles.input, minHeight: '80px'}} name="aboutAim" value={form.aboutAim} onChange={handleChange} placeholder="What is your career aim?" />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Profile Photo</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} style={styles.input} />
          </div>

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? '⏳ Submitting...' : 'SUBMIT'}
          </button>

        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { background: '#0f0f1a', minHeight: '90vh', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  title: { color: '#667eea', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.5rem' },
  card: { background: '#1a1a2e', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '650px', border: '1px solid rgba(255,255,255,0.07)' },
  row: { display: 'flex', gap: '1rem' },
  group: { flex: 1, marginBottom: '1.2rem' },
  label: { display: 'block', color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem' },
  input: { width: '100%', padding: '0.7rem 1rem', background: '#0f0f1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#e0e0e0', fontSize: '0.95rem', boxSizing: 'border-box', fontFamily: 'inherit' },
  btn: { width: '100%', padding: '1rem', background: '#667eea', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', letterSpacing: '1px', marginTop: '0.5rem' },
  error: { color: '#f5576c', fontSize: '0.8rem', marginTop: '0.3rem' },
  errorBanner: { background: 'rgba(245,87,108,0.1)', border: '1px solid #f5576c', color: '#f5576c', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', width: '100%', maxWidth: '650px' },
  success: { background: 'rgba(102,234,139,0.1)', border: '1px solid #6eea8a', color: '#6eea8a', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', width: '100%', maxWidth: '650px', textAlign: 'center' },
};

export default AddMemberPage;