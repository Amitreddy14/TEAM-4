# ⚡ TEAM FOUR — Student Team Members Management Application

![Project Banner](screenshots/home.png)

> A full-stack web application built as part of the **Full Stack Development** course (21CSS301T) at SRM Institute of Science and Technology. The app allows a student team to manage their members — add profiles, upload photos, view details, and track internships, certifications, and projects.

---

## 🏫 Course Details

| Field | Details |
|-------|---------|
| Institution | SRM Institute of Science and Technology |
| Campus | SRM Nagar, Kattankulathur – 603203, Chengalpattu District, Tamil Nadu |
| Course Code | 21CSS301T |
| Course Title | Full Stack Development |
| Assessment | CLAT-2 (Online Assessment) |
| Academic Year | 2024–25 (Even Semester) |
| Year & Sem | III Year / VI Semester |

---

## 📸 Screenshots

> Add your screenshots inside a `screenshots/` folder and update the paths below.

| Page | Preview |
|------|---------|
| Home Page | ![Home](screenshots/home.png) |
| Add Member | ![Add Member](screenshots/add.png) |
| View Members | ![View Members](screenshots/view.png) |
| Member Details | ![Details](screenshots/details.png) |

---

## 🚀 Features

- 🏠 **Home Page** — Team landing page with navigation
- ➕ **Add Member** — Form with validation and profile photo upload
- 👥 **View Members** — Card grid displaying all team members with photos
- 🔍 **Member Details** — Full profile view with all member information
- 🗑️ **Delete Member** — Remove a member from the team
- 📁 **Image Upload** — Profile photos stored in the backend `uploads/` folder
- 🌐 **REST API** — Testable directly in the browser

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React.js | UI framework |
| React Router v6 | Client-side routing |
| Axios | HTTP requests to backend |
| CSS (custom) | Styling with dark futuristic theme |
| Google Fonts (Orbitron, Inter) | Typography |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB ODM |
| Multer | File/image upload handling |
| CORS | Cross-origin resource sharing |

### Tools
| Tool | Purpose |
|------|---------|
| Visual Studio Code | Code editor |
| MongoDB Compass | MongoDB GUI |
| Git & GitHub | Version control |
| Postman (optional) | API testing |

---

## 📁 Project Structure

```
team-app/
├── backend/
│   ├── server.js
│   ├── uploads/
│   ├── package.json
│   └── .gitignore
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   └── pages/
│   │       ├── HomePage.js
│   │       ├── AddMemberPage.js
│   │       ├── ViewMembersPage.js
│   │       └── MemberDetailsPage.js
│   ├── package.json
│   └── .gitignore
├── screenshots/
└── README.md
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v16+
- MongoDB installed and running locally
- npm

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/TEAM-FOUR.git
cd TEAM-FOUR
```

### 2. Start MongoDB
```bash
# Create data directory if not exists (first time only)
mkdir C:\data\db

# Start MongoDB
mongod
```

### 3. Setup & run the backend
```bash
cd backend
npm install
node server.js
```
Backend runs at: `http://localhost:5000`

### 4. Setup & run the frontend
Open a new terminal:
```bash
cd frontend
npm install
npm start
```
Frontend runs at: `http://localhost:3000`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/members` | Add a new member (with image upload) |
| `GET` | `/members` | Get all members |
| `GET` | `/api/members` | Get all members (browser testable) |
| `GET` | `/members/:id` | Get a single member by ID |
| `GET` | `/api/members/:id` | Get a single member by ID (browser testable) |
| `DELETE` | `/members/:id` | Delete a member |

### Test in Browser

http://localhost:5000/api/members
http://localhost:5000/api/members/<member_id>

## 📝 Notes

- The `uploads/` folder is excluded from GitHub via `.gitignore`
- The `node_modules/` folder is excluded from GitHub via `.gitignore`
- MongoDB must be running before starting the backend
- Frontend proxies API calls to `http://localhost:5000`

---

*SRM Institute of Science and Technology · School of Computing · 2024–25*