# 🗞️ Meeting-Hub

A modern and efficient **real-time video conferencing platform** built using React, TypeScript, Node.js, Socket.IO, and PeerJS.

![Meeting Hub Banner](https://user-images.githubusercontent.com/placeholder/meeting-hub-banner.png) <!-- Replace with actual image URL -->

---

## 📊 Project Overview

**Meeting-Hub** enables users to authenticate, create or join virtual rooms, and engage in high-quality video and audio conversations in real-time.

---

## ✨ Features

* 🔐 **Secure Authentication** - Signup, login, and logout using JWT & bcrypt
* 🚪 **Room Management** - Create & join rooms with real-time updates
* 🎥 **Video & Audio Conferencing** - Low-latency peer-to-peer media streaming
* 🧲 **Real-time Signaling** - Enabled via Socket.IO
* ✅ **Room Existence Check** - Ensure valid room entry
* 🔊 **Media Control** - Toggle mic & camera on/off during calls

---

## 📚 Tech Stack

### ▶️ Frontend

* React + TypeScript
* Vite + Tailwind CSS
* Lucide React Icons
* react-router-dom
* axios + socket.io-client + peerjs + react-hot-toast

### ◀️ Backend

* Node.js + Express + TypeScript
* MongoDB + Mongoose
* bcryptjs + jsonwebtoken + cookie-parser + cors + dotenv + socket.io

---

## 📆 Prerequisites

* Node.js (v16+)
* npm or yarn
* MongoDB (local or Atlas)

---

## ⚙️ Setup Instructions

### 1. 🔁 Clone Repository

```bash
git clone https://github.com/ABHI-Theq/Meeting-Hub.git
cd Meeting-Hub
```

### 2. 🛠️ Backend Setup

```bash
cd backend
npm install
```

**Create `.env` in `backend/` with:**

```env
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
PORT=5500
```

**Start Backend Server:**

```bash
npm run dev
```

### 3. 📈 Frontend Setup

```bash
cd ../video-calling-app
npm install
```

Check `video-calling-app/src/api/api.ts`:

```ts
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5500/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

**Start Frontend:**

```bash
npm run dev
```

---

## 🔍 Usage Guide

1. Open [http://localhost:5173](http://localhost:5173)
2. Sign up or log in
3. Create a meeting or enter a room ID to join
4. Allow access to camera & mic
5. Communicate with peers in real-time
6. Use media controls to mute/unmute or turn off/on video

---

## 📄 API Documentation

### ✉️ **Authentication** (`/api/auth`)

* **POST /signup**
* **POST /login**
* **GET /logout**
* **POST /validate**

### 🚪 **Room** (`/api/room`)

* **GET /\:roomId** - Verifies if room exists

---

## 📝 Contribution Guidelines

1. Fork & clone repo
2. Create a new branch
3. Make changes and commit
4. Open a pull request to `main`

---

## 👁️ License

MIT License. See `LICENSE` file for details.

---

## 🚑 Support & Contact

* GitHub: [ABHI-Theq/Meeting-Hub](https://github.com/ABHI-Theq/Meeting-Hub)

---

> Built with ❤️ by Abhishek Sharma
