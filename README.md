📸 Tasveera – Frame Stories

Tasveera – Frame Stories is a full-stack social media web application built using the MERN stack, where users can share their memories through photos and videos, follow other creators, like posts, and explore content through an infinite scrolling feed.

This project is built as a solo full-stack portfolio project to strengthen real-world MERN skills and work with modern tools used in production-grade applications.

🚀 Project Overview

Tasveera allows users to create accounts, upload image or video posts with captions, discover other users, and interact through likes and follows.
Media is stored securely using Cloudinary, and the app focuses on performance with features like infinite scrolling and debounced search.

The goal of this project was to gain hands-on experience with:

Full-stack application architecture

Secure authentication

Media handling and optimization

Scalable API design

Production-style deployment

✨ Features
🔐 Authentication

Email & password signup/login

Username support

Password hashing using bcrypt

Google login

Facebook login

JWT-based authentication

Protected routes

Logout functionality

🖼️ Posts

Upload image or video posts

Add captions to posts

Media storage using Cloudinary

Only media URLs stored in database

📰 Feed

Latest posts shown first

Infinite scroll feed (auto load more posts)

Smooth user experience without page reloads

❤️ Interactions

Like and unlike posts

Like by double-click on post

Like count displayed

Pause/play video posts

👥 Follow System

Follow and unfollow users

Follow directly from profile or post

Click username to visit profile

🔍 Search

Search users by username

Live search with debouncing to reduce API calls

👤 Profiles

Profile photo

Bio

Followers and following count

User posts displayed in grid

Follow/Unfollow button on other profiles

Edit profile button on own profile

🛠 Tech Stack
Frontend

React (Vite)

Tailwind CSS

Axios

React Router DOM

Lucide Icons / React Icons

Backend

Node.js

Express.js

JWT Authentication

Cookies & Sessions

Multer for file handling

Custom auth & upload middlewares

Database

MongoDB Atlas

Mongoose ODM

User and Post models

Media Storage

Cloudinary

📁 Project Structure
Tasveera/
│
├── frontend/   → React client
│
└── backend/    → Express server

🖥️ Screenshots

Add screenshots here later
Example:

Home Feed

Profile Page

Search Page

Post Upload Modal

(Upload images to GitHub and link them here)

⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/tasveera-frame-stories.git
cd tasveera-frame-stories

2. Setup Backend
cd backend
npm install


Create .env file using env.example

npm run dev     # start with nodemon
# or
npm run start   # start with node

3. Setup Frontend
cd frontend
npm install
npm run dev


Frontend will run on local dev server.

🔐 Environment Variables
Backend (/backend/.env)
PORT=
DEFAULT_PROFILE_PIC=
MONGO_URI=
JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=


An env.example file is already provided in backend.

Frontend (/frontend/.env)
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
VITE_MEASUREMENT_ID=


An env.example file is also provided in frontend.

🌍 Deployment

Frontend: Netlify

Backend: Vercel

Database: MongoDB Atlas

This setup separates frontend and backend deployments for better scalability and performance.

🔮 Future Enhancements

Planned features for future versions:

💬 Real-time chat using Socket.io

🔔 Notifications system

These will be added and documented in future updates of the project.

👨‍💻 Author

Mithlesh Kumar Dewangan
Student | Full Stack Developer (MERN)

GitHub: https://github.com/Mithlesh-15

LinkedIn: https://www.linkedin.com/in/mithlesh-kumar-dewangan-li15

Twitter (X): https://x.com/mithlesh__15

Email: kamaldewangan367@gmail.com

⭐ If you like this project

Give it a star on GitHub and feel free to fork it.
Feedback and suggestions are always welcome.
