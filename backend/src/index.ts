import app from '@/app';
import config from '@/config';
import PrismaService from '@/services/prisma.service';

const prisma = PrismaService.getInstance();

async function startServer(): Promise<void> {
  try {
    // Connect to database
    await prisma.connect();

    // Start the server
    const server = app.listen(config.server.port, () => {
      console.log(`🚀 Server running on port ${config.server.port}`);
      console.log(`🔗 Environment: ${config.server.nodeEnv}`);
      console.log(`📊 Database: Connected`);
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('SIGTERM received, shutting down gracefully...');
      server.close(async () => {
        await prisma.disconnect();
        process.exit(0);
      });
    });

    process.on('SIGINT', async () => {
      console.log('SIGINT received, shutting down gracefully...');
      server.close(async () => {
        await prisma.disconnect();
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();