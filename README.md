🚀 Full Stack Auth System

A full-stack authentication system built using modern technologies with a focus on security, scalability, and clean architecture.

---

🛠 Tech Stack

| Layer      | Technology              |
| ---------- | ----------------------- |
| Frontend   | Next.js (App Router)    |
| Backend    | NestJS                  |
| Database   | PostgreSQL              |
| Auth       | Custom Token-Based Auth |
| Containers | Docker & Docker Compose |

---

✨ Features

- ✅ User Signup
- ✅ User Login
- ✅ Access Token & Refresh Token flow
- ✅ HTTP-only cookies for secure token storage
- ✅ Protected routes (Profile API)
- ✅ Refresh token mechanism
- ✅ Table-driven unit tests (Jest)
- ✅ No external authentication libraries used

---

🔐 Authentication Flow

Signup → Login → Cookies Stored → Access Protected Routes → Refresh Token

---

📂 Project Structure

auth-task/

│

├── backend/        # NestJS backend

├── frontend/       # Next.js frontend

├── docker-compose.yml

└── README.md

---

⚙️ Running Locally

🔹 Prerequisites
- Docker
- Docker Compose

---

🔹 Start the application

docker compose up --build

---

🔹 Backend runs on:

http://localhost:3000

---

🔹 Frontend runs on:

http://localhost:3001

---

📡 API Endpoints

| Method | Endpoint      | Description          |
| ------ | ------------- | -------------------- |
| POST   | /auth/signup  | Register new user    |
| POST   | /auth/login   | Login user           |
| POST   | /auth/refresh | Refresh access token |
| GET    | /auth/profile | Get user profile     |

---

🧠 Key Highlights

- Built custom authentication system from scratch
- Implemented secure cookie-based token storage
- Designed scalable backend using NestJS architecture
- Demonstrates real-world auth flow (used in production apps)

---

💡 Author

👨‍💻 Navneet Chinchole
🎓 B.Tech in Electronics & Computer Engineering
📧 navneetchinchole04@gmail.com

🔗 GitHub: https://github.com/navneetchinchole04

---

⭐ Support

If you found this project useful, please ⭐ star the repository!
