# Uvarsity Learning Platform

A full-stack learning management system built with React + TypeScript frontend and Node.js + Prisma backend.

## 🚀 Features

### Frontend
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Router** for navigation
- **React Hook Form** with Zod validation
- **Axios** for API communication
- **Vitest** for testing

### Backend
- **Node.js** with Express and TypeScript
- **Prisma ORM** with SQLite (configurable)
- **JWT Authentication**
- **Zod Validation**
- **Centralized Error Handling**
- **CORS Support**
- **Security Middleware**

## 🏗️ Architecture

### Database Migration from TypeORM to Prisma

This project has been migrated from TypeORM to Prisma ORM, providing:

- **Centralized Database Module** - Single point of database access
- **Type-Safe Database Operations** - Fully typed database queries
- **Modern Schema Management** - Declarative schema with migrations
- **Built-in Query Optimization** - Efficient database operations
- **Development Tools** - Prisma Studio for database management

### Project Structure

```
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── store/             # Zustand stores
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── backend/               # Backend API server
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic (including Prisma service)
│   │   ├── middleware/    # Express middleware
│   │   ├── utils/         # Utility functions
│   │   └── config/        # Configuration
│   ├── prisma/            # Prisma schema and migrations
│   └── README.md          # Backend documentation
└── README.md              # This file
```

## 🛠️ Setup and Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd Uvarsity
   npm run setup
   ```

2. **Set up the database**:
   ```bash
   npm run backend:db:generate
   npm run backend:db:push
   npm run backend:db:seed
   ```

3. **Start both frontend and backend**:
   ```bash
   npm run dev:all
   ```

4. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000
   - Database Studio: `npm run backend:db:studio`

### Individual Setup

#### Frontend Only
```bash
npm install
npm run dev
```

#### Backend Only
```bash
npm run backend:install
npm run backend:dev
```

## 📝 Available Scripts

### Root Level
- `npm run setup` - Install all dependencies
- `npm run dev:all` - Start both frontend and backend
- `npm run dev` - Start frontend only
- `npm run build` - Build frontend
- `npm run test` - Run frontend tests

### Backend
- `npm run backend:dev` - Start backend development server
- `npm run backend:build` - Build backend
- `npm run backend:start` - Start backend production server
- `npm run backend:db:generate` - Generate Prisma client
- `npm run backend:db:push` - Push schema to database
- `npm run backend:db:seed` - Seed database with sample data
- `npm run backend:db:studio` - Open Prisma Studio

## 🔧 Configuration

### Frontend Environment Variables
Create a `.env.local` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

### Backend Environment Variables
The backend `.env` file is already configured with defaults:
```env
DATABASE_URL="file:./dev.db"
PORT=3000
NODE_ENV=development
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
CORS_ORIGIN="http://localhost:5173"
```

## 🎯 Key Features

### Authentication
- Email/Phone login
- User registration
- OTP verification
- JWT token management
- Profile management

### Course Management
- Course catalog with filtering
- Course enrollment
- Progress tracking
- Lesson management
- Categories and tags

### User Experience
- Responsive design
- Dark/light mode ready
- Loading states
- Error handling
- Form validation

## 🗄️ Database Schema

The Prisma schema includes:

- **User** - Authentication and profiles
- **Course** - Course information and metadata
- **Lesson** - Individual lessons within courses
- **Enrollment** - User course enrollments
- **LessonProgress** - Progress tracking
- **Quiz** - Assessments and quizzes
- **Certificate** - Course completion certificates
- **Category** - Course categorization

## 🔐 API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/send-otp` - Send OTP
- `POST /api/v1/auth/verify-otp` - Verify OTP

### Courses
- `GET /api/v1/courses` - Get courses (with pagination)
- `GET /api/v1/courses/:id` - Get single course
- `POST /api/v1/courses/:id/enroll` - Enroll in course
- `GET /api/v1/courses/enrollments/my` - Get enrolled courses

### Progress
- `POST /api/v1/progress/lessons/:id/complete` - Mark lesson complete
- `GET /api/v1/progress/my` - Get user progress

## 🚀 Deployment

### Frontend
The frontend can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

### Backend
The backend can be deployed to:
- Railway
- Heroku
- DigitalOcean
- Vercel (serverless)

### Database
For production, consider:
- PostgreSQL
- MySQL
- MongoDB (with Prisma MongoDB connector)

## 🧪 Testing

### Frontend Tests
```bash
npm run test           # Run tests
npm run test:ui        # Run tests with UI
npm run test:coverage  # Run tests with coverage
```

### Backend Tests
```bash
npm run backend:test   # Run backend tests
```

## 📚 Documentation

- [Frontend Components](src/components/README.md)
- [Backend API](backend/README.md)
- [Database Schema](backend/prisma/schema.prisma)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Prisma team for the excellent ORM
- All contributors and the open-source community
