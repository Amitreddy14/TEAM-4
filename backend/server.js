const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded images as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads folder if it doesn't exist
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/teamapp')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

// Member Schema
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roll: { type: String, required: true },
  year: { type: String, required: true },
  degree: { type: String, required: true },
  aboutProject: String,
  hobbies: String,
  certificate: String,
  internship: String,
  aboutAim: String,
  image: String,
}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// POST /members — Add new member
app.post('/members', upload.single('image'), async (req, res) => {
  try {
    const member = new Member({
      ...req.body,
      image: req.file ? req.file.filename : null
    });
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /members — Get all members
app.get(['/members', '/api/members'], async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /members/:id — Get single member
app.get(['/members/:id', '/api/members/:id'], async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





app.listen(5000, () => console.log('Server running on http://localhost:5000'));