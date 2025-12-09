# 🏥 Smart Health Assistant

A full-stack real-time health chat application built with the MERN stack, featuring AI-powered health assistance, real-time messaging, and secure JWT authentication.

![Smart Health Assistant](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/database-MongoDB-green.svg)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Authentication & Security
- 🔐 Secure JWT-based authentication
- 🔒 Password hashing with bcrypt
- 🍪 HTTP-only cookie storage for tokens
- 🛡️ Protected routes and middleware

### Messaging & Communication
- 💬 Real-time messaging with Socket.IO
- 👥 One-on-one private conversations
- 📷 Image and video sharing via Cloudinary
- 🟢 Online/offline user status indicators
- 📜 Message history persistence

### AI Health Assistant
- 🤖 AI-powered health chatbot
- 💡 Intelligent health recommendations
- 🩺 Symptom analysis and guidance
- 📊 Health tips and wellness advice

### User Experience
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔔 Real-time notifications
- 👤 Customizable user profiles
- 🖼️ Avatar upload support

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Library |
| Redux Toolkit | State Management |
| React Router v6 | Routing |
| Tailwind CSS | Styling |
| Socket.IO Client | Real-time Communication |
| Axios | HTTP Client |
| Lucide React | Icons |
| React Toastify | Notifications |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| Socket.IO | Real-time Communication |
| JWT | Authentication |
| Cloudinary | Media Storage |
| bcrypt | Password Hashing |

## 📁 Project Structure

```
Deploy_SmartHealthAssistant/
├── frontend_SmartHealthAssistant/
│   ├── public/
│   │   └── avatar-holder.avif
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBot/
│   │   │   │   ├── ChatbotButton.jsx
│   │   │   │   └── ChatbotWindow.jsx
│   │   │   ├── skeletons/
│   │   │   │   ├── MessageSkeleton.jsx
│   │   │   │   └── SidebarSkeleton.jsx
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoChatSelected.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── lib/
│   │   │   ├── axios.js
│   │   │   └── socket.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Register.jsx
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   └── chatSlice.js
│   │   │   └── store.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend_SmartHealthAssistant/
│   ├── config/
│   │   └── config.env
│   ├── controllers/
│   │   ├── messageController.js
│   │   └── userController.js
│   ├── database/
│   │   └── db.js
│   ├── lib/
│   │   └── socket.js
│   ├── middlewares/
│   │   ├── authMiddelware.js
│   │   └── catchAsyncError.js
│   ├── models/
│   │   ├── messageModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── messageRoute.js
│   │   └── userRoute.js
│   ├── utils/
│   │   └── jwtToken.js
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Cloudinary** account (for media storage)
- **Git** (for cloning the repository)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/SmartHealthAssistant.git
cd SmartHealthAssistant
```

### 2. Install Backend Dependencies

```bash
cd backend_SmartHealthAssistant
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend_SmartHealthAssistant
npm install
```

## ⚙️ Environment Variables

### Backend Configuration

Create a `config.env` file in `backend_SmartHealthAssistant/config/`:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Frontend URL
FRONTEND_URI=http://localhost:5173

# MongoDB Database
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/smart_health_assistant

# JWT Authentication
JWT_SECRET_KEY=your_super_secret_jwt_key_here
JWT_EXPIRES=7d
COOKIE_EXPIRE=7

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# N8N Webhook (for AI Chatbot)
N8N_URL=your_n8n_webhook_url
```

### Frontend Configuration

Create a `.env` file in `frontend_SmartHealthAssistant/`:

```env
VITE_N8N_URL=your_n8n_webhook_url
```

## 🏃‍♂️ Running the Application

### Development Mode

**Terminal 1 - Start Backend:**
```bash
cd backend_SmartHealthAssistant
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend_SmartHealthAssistant
npm run dev
```

### Production Mode

**Backend:**
```bash
cd backend_SmartHealthAssistant
npm start
```

**Frontend:**
```bash
cd frontend_SmartHealthAssistant
npm run build
npm run preview
```

### Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:4000
- **API Health Check:** http://localhost:4000/

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/user/sign-up` | Register a new user |
| POST | `/api/v1/user/sign-in` | Login user |
| GET | `/api/v1/user/sign-out` | Logout user |
| GET | `/api/v1/user/me` | Get current user |
| PUT | `/api/v1/user/update-profile` | Update user profile |

### Message Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/message/users` | Get all users for chat |
| GET | `/api/v1/message/:id` | Get messages with a user |
| POST | `/api/v1/message/send/:id` | Send a message |

### Request & Response Examples

#### Register User
```bash
POST /api/v1/user/sign-up
Content-Type: multipart/form-data

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "avatar": <file>
}
```

#### Login User
```bash
POST /api/v1/user/sign-in
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Send Message
```bash
POST /api/v1/message/send/:receiverId
Content-Type: multipart/form-data
Authorization: Bearer <token>

{
  "text": "Hello, how are you?",
  "media": <file> (optional)
}
```

## 🔌 Socket.IO Events

### Client Events (Emit)
| Event | Description |
|-------|-------------|
| `connection` | Connect to socket server |
| `disconnect` | Disconnect from socket server |

### Server Events (Listen)
| Event | Description |
|-------|-------------|
| `getOnlineUsers` | Get list of online user IDs |
| `newMessage` | Receive new message notification |

## 📸 Screenshots

### Login Page
Modern and clean login interface with form validation.

### Chat Interface
Real-time messaging with online status indicators.

### AI Health Chatbot
Intelligent health assistant providing medical guidance.

### Profile Page
User profile management with avatar upload.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Code Style Guidelines

- Use ES6+ syntax
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Write clean, readable code

## 🐛 Known Issues

- Large file uploads may take longer on slower connections
- Mobile keyboard may overlap chat input on some devices

## 📝 Future Enhancements

- [ ] Group chat functionality
- [ ] Voice and video calling
- [ ] Message reactions and emojis
- [ ] Message search functionality
- [ ] Push notifications
- [ ] Dark mode theme
- [ ] Multi-language support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Socket.IO Documentation](https://socket.io/docs/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

<p align="center">
  Made with ❤️ for better health communication
</p>

<p align="center">
  ⭐ Star this repository if you find it helpful!
</p>