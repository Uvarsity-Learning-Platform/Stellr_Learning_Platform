import { PrismaClient } from '@prisma/client';

class PrismaService {
  private static instance: PrismaService;
  private prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }

  public static getInstance(): PrismaService {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService();
    }
    return PrismaService.instance;
  }

  public getClient(): PrismaClient {
    return this.prisma;
  }

  public async connect(): Promise<void> {
    try {
      await this.prisma.$connect();
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection failed:', error);
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.prisma.$disconnect();
      console.log('Database disconnected successfully');
    } catch (error) {
      console.error('Database disconnection failed:', error);
    }
  }

  // User operations
  public async createUser(data: {
    email?: string;
    phone?: string;
    firstName: string;
    lastName: string;
    passwordHash?: string;
    avatar?: string;
  }) {
    return this.prisma.user.create({
      data,
    });
  }

  public async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  public async findUserByPhone(phone: string) {
    return this.prisma.user.findUnique({
      where: { phone },
    });
  }

  public async findUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  public async updateUser(id: string, data: Partial<{
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    avatar: string;
    isOnboarded: boolean;
  }>) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // Course operations
  public async createCourse(data: {
    title: string;
    description: string;
    thumbnailUrl?: string;
    level: string;
    duration: number;
    category: string;
    tags: string[];
    instructorName: string;
    instructorAvatar?: string;
  }) {
    return this.prisma.course.create({
      data,
    });
  }

  public async findCourses(params?: {
    skip?: number;
    take?: number;
    category?: string;
    search?: string;
    published?: boolean;
  }) {
    const { skip = 0, take = 12, category, search, published = true } = params || {};
    
    const where: any = { isPublished: published };
    
    if (category) {
      where.category = category;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { category: { contains: search } },
      ];
    }

    const [courses, total] = await Promise.all([
      this.prisma.course.findMany({
        where,
        skip,
        take,
        include: {
          _count: {
            select: {
              lessons: true,
              enrollments: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.course.count({ where }),
    ]);

    return { courses, total };
  }

  public async findCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            lessons: true,
            enrollments: true,
          },
        },
      },
    });
  }

  public async updateCourse(id: string, data: Partial<{
    title: string;
    description: string;
    thumbnailUrl: string;
    level: string;
    duration: number;
    category: string;
    tags: string[];
    instructorName: string;
    instructorAvatar: string;
    isPublished: boolean;
  }>) {
    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  // Lesson operations
  public async createLesson(data: {
    courseId: string;
    title: string;
    description: string;
    type: string;
    videoUrl?: string;
    pdfUrl?: string;
    content?: string;
    duration?: number;
    order: number;
  }) {
    return this.prisma.lesson.create({
      data,
    });
  }

  public async findLessonsByCourse(courseId: string) {
    return this.prisma.lesson.findMany({
      where: { courseId },
      orderBy: { order: 'asc' },
    });
  }

  public async findLessonById(id: string) {
    return this.prisma.lesson.findUnique({
      where: { id },
    });
  }

  // Enrollment operations
  public async createEnrollment(userId: string, courseId: string) {
    return this.prisma.enrollment.create({
      data: {
        userId,
        courseId,
      },
    });
  }

  public async findEnrollmentByUserAndCourse(userId: string, courseId: string) {
    return this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });
  }

  public async findEnrollmentsByUser(userId: string) {
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            _count: {
              select: {
                lessons: true,
              },
            },
          },
        },
      },
    });
  }

  // Progress operations
  public async createOrUpdateLessonProgress(
    userId: string,
    lessonId: string,
    completed: boolean
  ) {
    return this.prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      update: {
        completed,
        completedAt: completed ? new Date() : null,
      },
      create: {
        userId,
        lessonId,
        completed,
        completedAt: completed ? new Date() : null,
      },
    });
  }

  public async getUserProgress(userId: string, courseId: string) {
    const lessons = await this.prisma.lesson.findMany({
      where: { courseId },
      include: {
        progress: {
          where: { userId },
        },
      },
    });

    const totalLessons = lessons.length;
    const completedLessons = lessons.filter(
      (lesson: any) => lesson.progress.length > 0 && lesson.progress[0].completed
    ).length;

    return {
      totalLessons,
      completedLessons,
      progress: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0,
    };
  }

  // Category operations
  public async findCategories() {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }

  public async createCategory(data: {
    name: string;
    description: string;
  }) {
    return this.prisma.category.create({
      data,
    });
  }

  // Utility methods
  public async healthCheck() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'healthy' };
    } catch (error) {
      return { status: 'unhealthy', error: String(error) };
    }
  }
}

export default PrismaService;