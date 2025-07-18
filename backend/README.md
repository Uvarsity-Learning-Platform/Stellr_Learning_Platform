# Uvarsity Backend

A Node.js/Express backend API with Prisma ORM for the Uvarsity Learning Platform.

## Features

- **TypeScript** - Type-safe development
- **Express.js** - Web framework
- **Prisma ORM** - Modern database toolkit
- **SQLite** - Lightweight database (configurable)
- **JWT Authentication** - Secure user authentication
- **Zod Validation** - Runtime type checking
- **Centralized Error Handling** - Consistent error responses
- **CORS Support** - Cross-origin resource sharing
- **Security** - Helmet, compression, and other security middleware

## Database Schema

The backend uses Prisma ORM with the following main entities:

- **User** - User authentication and profile data
- **Course** - Course information and metadata
- **Lesson** - Individual lessons within courses
- **Enrollment** - User course enrollments
- **LessonProgress** - User progress tracking
- **Quiz** - Course quizzes and assessments
- **Certificate** - Course completion certificates
- **Category** - Course categories

## API Endpoints

### Authentication (`/api/v1/auth`)
- `POST /login` - User login
- `POST /register` - User registration
- `POST /send-otp` - Send OTP for phone verification
- `POST /verify-otp` - Verify OTP and login
- `POST /refresh` - Refresh JWT token
- `POST /logout` - User logout
- `GET /profile` - Get user profile
- `PATCH /profile` - Update user profile
- `PATCH /complete-onboarding` - Complete user onboarding

### Courses (`/api/v1/courses`)
- `GET /` - Get all courses (with pagination and filters)
- `GET /:id` - Get single course
- `GET /:id/lessons` - Get course lessons
- `POST /` - Create new course (admin)
- `PUT /:id` - Update course (admin)
- `POST /:id/enroll` - Enroll in course
- `GET /enrollments/my` - Get user's enrolled courses
- `GET /categories/list` - Get course categories

### Progress (`/api/v1/progress`)
- `POST /lessons/:id/complete` - Mark lesson as complete
- `GET /lessons/:id` - Get lesson progress
- `GET /courses/:id` - Get course progress
- `GET /my` - Get user's overall progress

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Set up database**:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

4. **Seed database** (optional):
   ```bash
   npm run db:seed
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Environment Variables

```env
# Database
DATABASE_URL="file:./dev.db"

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"

# CORS
CORS_ORIGIN="http://localhost:5173"
```

## Architecture

### Centralized Prisma Service

The backend uses a centralized Prisma service (`src/services/prisma.service.ts`) that provides:

- **Singleton Pattern** - Single database connection instance
- **Connection Management** - Automatic connection/disconnection
- **Common Operations** - Pre-built methods for common database operations
- **Error Handling** - Consistent error handling across database operations
- **Health Checks** - Database connectivity monitoring

### Request Flow

1. **Request** → **Middleware** (CORS, Auth, Validation)
2. **Controller** → **Service** (Business Logic)
3. **Service** → **Prisma** (Database Operations)
4. **Response** → **Error Handler** (if needed)

### Error Handling

- **AppError** - Custom error class for operational errors
- **Global Error Handler** - Catches and formats all errors
- **Zod Validation** - Automatic request validation
- **Prisma Errors** - Automatic handling of database errors

## Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - BCrypt with salt rounds
- **CORS** - Configurable cross-origin resource sharing
- **Helmet** - Security headers
- **Rate Limiting** - Protection against abuse (can be added)
- **Input Validation** - Zod schema validation

## Deployment

The backend is ready for deployment to platforms like:

- **Vercel** - Serverless deployment
- **Heroku** - Container deployment
- **Railway** - Simple deployment
- **DigitalOcean** - VPS deployment

Make sure to:
1. Set production environment variables
2. Use a production database (PostgreSQL/MySQL)
3. Configure proper CORS origins
4. Set up monitoring and logging

## Development

### Adding New Endpoints

1. **Define validation schema** in `src/utils/validation.ts`
2. **Create controller method** in appropriate controller
3. **Add route** in appropriate route file
4. **Update Prisma service** if needed

### Database Changes

1. **Update Prisma schema** in `prisma/schema.prisma`
2. **Push changes** with `npx prisma db push`
3. **Generate client** with `npx prisma generate`
4. **Update seed file** if needed

## Contributing

1. Follow TypeScript best practices
2. Use Zod for all input validation
3. Handle errors properly with AppError
4. Write tests for new features
5. Update documentation as needed