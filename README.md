# ChatCom - Real-time Chat Application

A real-time chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Socket.io for real-time communication.



## Features

- 🔐 User authentication (Sign up/Login)
- 💬 Real-time messaging using Socket.io
- 📸 Image sharing capabilities
- 🟢 Online user status
- 👤 User profile customization
- 🎨 Multiple UI themes
- 📱 Responsive design for all devices

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Daisy UI
- Socket.io-client

### Backend
- Node.js
- Express.js
- MongoDB
- Socket.io
- JWT for authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm/yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Sunny2k25/ChatCom.git
cd ChatCom 
```

2. Install dependencies for backend
```bash
cd backend
npm install
```

3. Install dependencies for frontend
```bash
cd frontend
npm install
```

4. Create a .env file in the backend directory
```bash
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

5. Create a .env file in the frontend directory
```bash
VITE_SERVER_URL=http://localhost:5001
```

### Running the Application
1. Start the backend server
```bash
cd backend
npm run dev
```
2. Start the frontend application
```bash
cd frontend
npm run dev
```
