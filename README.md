Bro this is your **production-ready README.md** for your AI Planner 🚀
Clean, professional, portfolio-level.

You can copy-paste this directly into your GitHub repo.

---

# 🚀 AI Study Planner

An AI-powered task management and study planning web app built using the **MERN Stack + Groq AI**.

Generate structured study plans with AI, manage tasks, track progress, and stay productive.

---

## 🌐 Live Demo

🔗 Frontend (Vercel):
[https://brainplan-ai.vercel.app/](https://brainplan-ai.vercel.app/)

🔗 Backend (Render):
[https://ai-planner-4xv2.onrender.com](https://ai-planner-4xv2.onrender.com)

---

## ✨ Features

* 🔐 JWT Authentication (Register/Login)
* 📋 Create, Edit, Delete Tasks
* ✅ Mark Tasks Complete
* 📊 Progress Tracking
* 🌙 Dark / Light Mode
* 🤖 AI Study Plan Generator (Groq LLaMA 3.3)
* 🔒 Protected Routes
* 🌍 Fully Deployed (Vercel + Render)

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios (with interceptor)
* React Router

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Groq AI SDK

### Deployment

* Frontend → Vercel
* Backend → Render
* Database → MongoDB Atlas

---

## 🧠 How AI Works

When user enters a topic:

1. Frontend sends topic to backend
2. Backend calls Groq API (`llama-3.3-70b-versatile`)
3. AI returns structured 5-day plan (JSON)
4. Tasks are saved into MongoDB
5. User sees auto-generated study roadmap

---

## 📂 Project Structure


AI-Study-Planner/
│
├── client/        # React Frontend
│   ├── src/
│   ├── components/
│   └── api/axios.js
│
├── server/        # Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
└── README.md




## ⚙️ Installation (Local Setup)

### 1️⃣ Clone the repository

bash
git clone https://github.com/yourusername/AI-Study-Planner.git
cd AI-Study-Planner


---

### 2️⃣ Backend Setup

`bash
cd server
npm install


Create `.env` file inside `/server`:

env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
```

Run backend:

`bash
npm run dev




### 3️⃣ Frontend Setup

``bash
cd client
npm install
npm run dev
`

## 🔐 Environment Variables

### Backend (.env)

| Variable     | Description                     |
| ------------ | ------------------------------- |
| MONGO_URI    | MongoDB Atlas connection string |
| JWT_SECRET   | Secret key for JWT              |
| GROQ_API_KEY | Groq AI API key                 |
| PORT         | Server port                     |

---

## 🚀 Deployment Guide

### Frontend (Vercel)

* Connect GitHub repo
* Set build command: `npm run build`
* Output directory: `dist`

### Backend (Render)

* Create Web Service
* Add environment variables
* Set start command: `node server.js`

---

## 🧩 API Routes

### Auth

``
POST /api/auth/register
POST /api/auth/login


### Tasks


GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
PUT    /api/tasks/edit/:id
DELETE /api/tasks/:id
```

### AI

```
POST /api/ai/generate
```

---

## 📸 Screenshots

(Add screenshots here later for better GitHub presentation)

---

## 🛡 Security Features

* Password hashing (bcrypt)
* JWT token authentication
* Protected routes middleware
* Environment variables secured
* GitHub secret scanning compliance

---

## 📈 Future Improvements

* Due dates & reminders
* AI-generated weekly/monthly plans
* Task categories
* Analytics dashboard
* OAuth login (Google/GitHub)
* Mobile responsive improvements

---

## 👨‍💻 Author

Dhruv Kumar
Full Stack Developer | AI Enthusiast

---

## ⭐ If You Like This Project

Give it a ⭐ on GitHub and support the work!

---
