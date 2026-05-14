# AI Code Reviewer - Full-Stack SaaS Application

A modern, AI-powered code review platform built with React, Node.js, Express, MongoDB, and Prisma.

## 🚀 Features

### Authentication System
- User registration and login with JWT authentication
- Protected routes and middleware
- Profile management
- Password hashing with bcrypt

### AI Code Reviewer
- **Monaco Editor Integration**: Professional code editor with syntax highlighting
- **Multi-Language Support**: JavaScript, TypeScript, Python, Java, C++, Go
- **AI Analysis**: 
  - Bug detection and error prevention
  - Security vulnerability identification
  - Performance optimization suggestions
  - Code readability improvements
  - Best practices enforcement
- **Multiple Review Types**:
  - Code Review: Comprehensive analysis
  - Code Explanation: Detailed breakdown
  - Code Improvement: Optimized suggestions

### Dashboard & Analytics
- Total reviews count and statistics
- Favorite programming language tracking
- Recent activity monitoring
- AI usage analytics
- Beautiful analytics cards with charts

### Review History
- Complete review history with search and filtering
- Pagination for large datasets
- Delete and manage reviews
- View full review details in modal

### Modern UI/UX
- **Dark Theme**: Beautiful dark mode by default
- **Glassmorphism Effects**: Modern glass-like design
- **Framer Motion Animations**: Smooth transitions and micro-interactions
- **Responsive Design**: Fully mobile-responsive layout
- **Toast Notifications**: User-friendly feedback system

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Monaco Editor** for code editing
- **Zustand** for state management
- **React Router** for navigation
- **Axios** for API calls
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express.js
- **MongoDB** database
- **Prisma ORM** for database management
- **JWT** for authentication
- **bcrypt** for password hashing
- **Express Validator** for input validation
- **Rate Limiting** for API protection
- **Helmet** for security headers

### AI Integration
- **Gemini API** for AI-powered code analysis
- **Hugging Face API** support (alternative)

## 📦 Project Structure

```
ai-code-reviewer/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── codeReviewController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── codeReview.js
│   ├── services/
│   │   └── aiService.js
│   ├── utils/
│   │   ├── bcrypt.js
│   │   └── jwt.js
│   ├── validators/
│   │   └── authValidator.js
│   ├── prisma/
│   │   └── schema.prisma
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── pages/
│   │   │   ├── Landing.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── CodeReviewer.tsx
│   │   │   ├── ReviewHistory.tsx
│   │   │   └── Profile.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── store/
│   │   │   └── authStore.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (provide `DATABASE_URL` in `backend/.env`)

- npm or yarn


### 1. Clone the Repository
```bash
git clone https://github.com/SapotaDA/AI-Code-Reviewer.git
cd AI-Code-Reviewer
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create env file
# Note: this repo expects you to create `.env` (there may or may not be an `.env.example` in the repo)
copy .env.example .env
# or create .env manually

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev

```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API URL

# Start development server
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/health

## ⚙️ Environment Configuration

### Backend (.env)
```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster0.mongodb.net/ai_code_reviewer?retryWrites=true&w=majority"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# AI Service
GEMINI_API_KEY="your-gemini-api-key-here"

# Server
PORT=5000
NODE_ENV="development"

# Frontend
FRONTEND_URL="http://localhost:3000"
```

### Frontend (.env)
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Application Configuration
VITE_APP_NAME=AI Code Reviewer
VITE_APP_VERSION=1.0.0
```

## 🗄 Database Schema

The application uses MongoDB with the following main models:


### User
- Authentication and user information
- Relations to reviews and analytics

### CodeReview
- Stores code review results
- Links to user and language data

### ReviewHistory
- Complete history of all AI interactions
- Supports multiple review types

### Analytics
- User statistics and usage data
- Tracks favorite languages and activity

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Code Review
- `POST /api/code/review` - Review code
- `POST /api/code/explain` - Explain code
- `POST /api/code/improve` - Improve code
- `GET /api/code/history` - Get review history
- `DELETE /api/code/history/:id` - Delete review
- `GET /api/code/dashboard` - Get dashboard stats

## 🚀 Deployment

### Backend Deployment (Render/Railway)
1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables
4. Deploy automatically

### Frontend Deployment (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy automatically

### Database (Neon/Supabase)
1. Create MongoDB database
2. Get connection string
3. Update DATABASE_URL in backend
4. Run migrations

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Security headers with Helmet
- Input validation and sanitization
- SQL injection prevention with Prisma

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Join our Discord community
4. Contact support via email

## 🎯 Future Roadmap

- [ ] Real-time collaborative code reviews
- [ ] Integration with Git providers (GitHub, GitLab)
- [ ] Team and organization features
- [ ] Advanced analytics and reporting
- [ ] Custom AI model training
- [ ] Mobile applications
- [ ] Browser extensions
- [ ] VS Code extension

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- Vercel for frontend hosting
- Prisma for excellent ORM
- Tailwind CSS for beautiful UI
- Framer Motion for smooth animations

---

Built with ❤️ by [SapotaDA](https://github.com/SapotaDA)
