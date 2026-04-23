import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AddMemberPage() {
  const [form, setForm] = useState({
    name: '', roll: '', year: '', degree: '',
    aboutProject: '', hobbies: '', certificate: '',
    internship: '', aboutAim: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.roll.trim()) e.roll = 'Required';
    if (!form.year.trim()) e.year = 'Required';
    if (!form.degree.trim()) e.degree = 'Required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) { setErrors(validation); return; }
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (image) data.append('image', image);
      await axios.post('http://localhost:5000/members', data);
      setSuccess(true);
      setForm({ name: '', roll: '', year: '', degree: '', aboutProject: '', hobbies: '', certificate: '', internship: '', aboutAim: '' });
      setImage(null);
      setPreview(null);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setErrors({ submit: 'Submission failed. Is the server running?' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Background grid */}
      <div style={styles.grid}></div>

      <div style={styles.inner}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.badge}>➕ New Member</div>
          <h2 style={styles.title}>Add Team Member</h2>
          <div style={styles.underline}></div>
        </div>

        {success && <div style={styles.success}>✅ Member added successfully!</div>}
        {errors.submit && <div style={styles.errorBanner}>⚠️ {errors.submit}</div>}

        <div style={styles.card}>
          <form onSubmit={handleSubmit}>

            {/* Photo preview + upload */}
            <div style={styles.photoSection}>
              <div style={styles.photoPreview}>
                {preview
                  ? <img src={preview} alt="preview" style={styles.previewImg} />
                  : <span style={styles.photoPlaceholder}>📷</span>
                }
              </div>
              <div>
                <p style={styles.photoLabel}>Profile Photo</p>
                <p style={styles.photoHint}>Upload your professional photo</p>
                <label style={styles.uploadBtn}>
                  Choose File
                  <input type="file" accept="image/*" onChange={handleImage} style={{display:'none'}} />
                </label>
                {image && <p style={styles.photoHint}>✅ {image.name}</p>}
              </div>
            </div>

            <div style={styles.divider}></div>

            {/* Row 1 */}
            <div style={styles.row}>
              <Field label="Full Name *" error={errors.name}>
                <input style={styles.input} name="name" value={form.name} onChange={handleChange} placeholder="e.g. Amit Reddy" />
              </Field>
              <Field label="Roll Number *" error={errors.roll}>
                <input style={styles.input} name="roll" value={form.roll} onChange={handleChange} placeholder="e.g. RA2311027010046" />
              </Field>
            </div>

            {/* Row 2 */}
            <div style={styles.row}>
              <Field label="Year *" error={errors.year}>
                <input style={styles.input} name="year" value={form.year} onChange={handleChange} placeholder="e.g. 2024" />
              </Field>
              <Field label="Degree *" error={errors.degree}>
                <input style={styles.input} name="degree" value={form.degree} onChange={handleChange} placeholder="e.g. B.Tech" />
              </Field>
            </div>

            <Field label="About Project">
              <textarea style={{...styles.input, minHeight:'80px', resize:'vertical'}} name="aboutProject" value={form.aboutProject} onChange={handleChange} placeholder="Describe your project..." />
            </Field>

            <Field label="Hobbies (comma separated)">
              <input style={styles.input} name="hobbies" value={form.hobbies} onChange={handleChange} placeholder="e.g. Reading, Coding, Gaming" />
            </Field>

            <div style={styles.row}>
              <Field label="Certificate">
                <input style={styles.input} name="certificate" value={form.certificate} onChange={handleChange} placeholder="e.g. AWS, Fullstack" />
              </Field>
              <Field label="Internship">
                <input style={styles.input} name="internship" value={form.internship} onChange={handleChange} placeholder="e.g. Samsung Prism" />
              </Field>
            </div>

            <Field label="About Your Aim">
              <textarea style={{...styles.input, minHeight:'80px', resize:'vertical'}} name="aboutAim" value={form.aboutAim} onChange={handleChange} placeholder="What is your career aim?" />
            </Field>

            <button type="submit" style={styles.btn} disabled={loading}>
              {loading ? '⏳ Submitting...' : '🚀 Submit Member'}
            </button>

          </form>
        </div>

        <div style={{textAlign:'center', marginTop:'1rem'}}>
          <Link to="/view" style={styles.backLink}>👥 View All Members →</Link>
        </div>
      </div>
    </div>
  );
}

// Small helper component for form fields
function Field({ label, error, children }) {
  return (
    <div style={{ flex: 1, marginBottom: '1.2rem' }}>
      <label style={fieldStyles.label}>{label}</label>
      {children}
      {error && <p style={fieldStyles.error}>{error}</p>}
    </div>
  );
}

const fieldStyles = {
  label: { display: 'block', color: '#667eea', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem', fontWeight: '600' },
  error: { color: '#f5576c', fontSize: '0.78rem', marginTop: '0.3rem' },
};

const styles = {
  container: { background: '#070714', minHeight: '92vh', padding: '2rem', display: 'flex', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
  grid: { position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(102,126,234,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(102,126,234,0.04) 1px, transparent 1px)`, backgroundSize: '50px 50px', pointerEvents: 'none' },
  inner: { position: 'relative', width: '100%', maxWidth: '680px' },
  header: { textAlign: 'center', marginBottom: '2rem' },
  badge: { display: 'inline-block', background: 'rgba(102,126,234,0.1)', border: '1px solid rgba(102,126,234,0.3)', color: '#667eea', padding: '0.4rem 1.2rem', borderRadius: '20px', fontSize: '0.78rem', letterSpacing: '1px', marginBottom: '1rem' },
  title: { fontFamily: "'Orbitron', sans-serif", fontSize: '1.8rem', fontWeight: '700', color: '#fff', letterSpacing: '3px', marginBottom: '0.8rem' },
  underline: { width: '60px', height: '3px', background: 'linear-gradient(90deg, #667eea, #f093fb)', margin: '0 auto' },
  card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(102,126,234,0.15)', borderRadius: '20px', padding: '2rem', backdropFilter: 'blur(10px)' },
  row: { display: 'flex', gap: '1rem' },
  input: { width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(102,126,234,0.2)', borderRadius: '10px', color: '#e0e0e0', fontSize: '0.92rem', boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none' },
  btn: { width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', letterSpacing: '1px', marginTop: '0.5rem', fontFamily: 'inherit' },
  photoSection: { display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' },
  photoPreview: { width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(102,126,234,0.1)', border: '2px solid rgba(102,126,234,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 },
  previewImg: { width: '100%', height: '100%', objectFit: 'cover' },
  photoPlaceholder: { fontSize: '2rem' },
  photoLabel: { color: '#fff', fontWeight: '600', marginBottom: '0.3rem' },
  photoHint: { color: '#555', fontSize: '0.8rem', marginBottom: '0.6rem' },
  uploadBtn: { display: 'inline-block', background: 'rgba(102,126,234,0.15)', border: '1px solid rgba(102,126,234,0.3)', color: '#667eea', padding: '0.4rem 1rem', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer', fontWeight: '600' },
  divider: { height: '1px', background: 'rgba(102,126,234,0.1)', margin: '1.2rem 0' },
  success: { background: 'rgba(102,234,139,0.08)', border: '1px solid rgba(102,234,139,0.3)', color: '#6eea8a', padding: '1rem', borderRadius: '10px', marginBottom: '1rem', textAlign: 'center' },
  errorBanner: { background: 'rgba(245,87,108,0.08)', border: '1px solid rgba(245,87,108,0.3)', color: '#f5576c', padding: '1rem', borderRadius: '10px', marginBottom: '1rem', textAlign: 'center' },
  backLink: { color: '#555', textDecoration: 'none', fontSize: '0.88rem' },
};

export default AddMemberPage;