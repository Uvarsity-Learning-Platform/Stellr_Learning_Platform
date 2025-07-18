import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import config from '@/config';
import PrismaService from '@/services/prisma.service';
import { errorHandler, notFoundHandler } from '@/middleware/error';

// Import routes
import authRoutes from '@/routes/auth.routes';
import courseRoutes from '@/routes/course.routes';
import progressRoutes from '@/routes/progress.routes';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
}));

// Compression middleware
app.use(compression());

// Logging middleware
if (config.server.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', async (_req, res) => {
  const prisma = PrismaService.getInstance();
  const dbHealth = await prisma.healthCheck();
  
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: dbHealth,
  });
});

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/progress', progressRoutes);

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    message: 'Uvarsity Backend API',
    version: '1.0.0',
    status: 'running',
  });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

export default app;