# 📝 Task Manager Application

A full-stack task management application with user authentication, built with the MERN stack (MongoDB, Express.js, Node.js) and deployed on Render.

![Task Manager App](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node.js](https://img.shields.io/badge/node-18.x-brightgreen)
![MongoDB](https://img.shields.io/badge/mongodb-Atlas-orange)

## 👨‍💻 Author

**Netan Thakur**
- GitHub: Netan135(https://github.com/Netan135)
- LinkedIn: Netan Thakur(https://www.linkedin.com/in/netan-thakur-5915012b6/)
- Email: netanthakur25@gmail.com
- Repository: https://github.com/Netan135/task-manager-app

## 🚀 Live Demo

**Live Website:** [https://task-manager-app-fhiy.onrender.com](https://task-manager-app-fhiy.onrender.com)

## ✨ Features

- ✅ User Registration & Login with JWT Authentication
- ✅ Create, Read, Update, Delete Tasks
- ✅ Mark Tasks as Complete/Incomplete
- ✅ Secure Password Hashing with bcrypt
- ✅ Responsive Design for Mobile & Desktop
- ✅ Persistent Login with Local Storage
- ✅ MongoDB Atlas Database Integration

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with gradients & animations
- **Vanilla JavaScript** - Client-side logic
- **Fetch API** - HTTP requests

### Deployment
- **Render** - Backend hosting
- **MongoDB Atlas** - Database hosting

## 📁 Project Structure
task-manager-app/
├── public/ # Frontend files
│ ├── index.html # Main HTML file
│ ├── css/
│ │ └── style.css # Styles
│ └── js/
│ └── app.js # Frontend logic
├── models/ # Database models
│ ├── User.js # User schema
│ └── Task.js # Task schema
├── routes/ # API routes
│ ├── userRoutes.js # Auth routes
│ └── taskRoutes.js # Task CRUD routes
├── middleware/ # Middleware
│ └── auth.js # JWT authentication
├── server.js # Main server file
├── package.json # Dependencies
├── .env # Environment variables
└── README.md # Documentation


## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Netan135/task-manager-app.git
cd task-manager-app

2. **Install dependencies**

bash
npm install
Create .env file

3. **bash**
cp .env.example .env
Update .env with your credentials

4. **env**
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/database_name
JWT_SECRET=YOUR_SUPER_SECRET_KEY_HERE
Run the application

5. **bash**
# Development mode
npm run dev

# Production mode
npm start
Open your browser

text
http://localhost:5000
🔧 Environment Variables
Variable	Description	Required
PORT	Server port (default: 5000)	No
MONGODB_URI	MongoDB connection string	Yes
JWT_SECRET	Secret key for JWT tokens	Yes
📡 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/users/register	Register new user
POST	/api/users/login	Login user
Tasks (Protected)
Method	Endpoint	Description
GET	/api/tasks	Get all tasks
POST	/api/tasks	Create new task
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task
Sample API Requests
Register User:

bash
curl -X POST https://task-manager-app-fhiy.onrender.com/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"password123"}'
Login:

bash
curl -X POST https://task-manager-app-fhiy.onrender.com/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
Create Task:

bash
curl -X POST https://task-manager-app-fhiy.onrender.com/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Node.js","description":"Complete the tutorial"}'