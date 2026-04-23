# Team Blue - Student Team Members Management App

## Description
A full-stack web app to manage student team members built with React, Node.js, Express, and MongoDB.

## Installation

### Backend
```bash
cd backend
npm install
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /members | Add new member |
| GET | /api/members | Get all members |
| GET | /api/members/:id | Get single member |

## How to Run
1. Start MongoDB: `mongod`
2. Start backend: `node server.js` (port 5000)
3. Start frontend: `npm start` (port 3000)