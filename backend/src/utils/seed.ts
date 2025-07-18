import PrismaService from '@/services/prisma.service';
import { hashPassword } from '@/utils/password';

const prisma = PrismaService.getInstance();

async function seed() {
  try {
    console.log('🌱 Starting database seeding...');

    // Create categories
    const categories = [
      { name: 'Technology', description: 'Programming, Web Development, Data Science' },
      { name: 'Business', description: 'Marketing, Management, Entrepreneurship' },
      { name: 'Design', description: 'UI/UX, Graphic Design, Web Design' },
      { name: 'Language', description: 'English, Spanish, French, German' },
      { name: 'Health', description: 'Fitness, Nutrition, Mental Health' },
    ];

    for (const category of categories) {
      await prisma.createCategory(category);
    }

    // Create sample users
    const users = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        passwordHash: await hashPassword('password123'),
        isOnboarded: true,
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        passwordHash: await hashPassword('password123'),
        isOnboarded: true,
      },
      {
        firstName: 'Mike',
        lastName: 'Johnson',
        phone: '+1234567890',
        isOnboarded: false,
      },
    ];

    const createdUsers = [];
    for (const user of users) {
      const createdUser = await prisma.createUser(user);
      createdUsers.push(createdUser);
    }

    // Create sample courses
    const courses = [
      {
        title: 'React Complete Course',
        description: 'Learn React from scratch with hands-on projects and real-world examples. Master components, hooks, state management, and modern React patterns.',
        level: 'Beginner',
        duration: 480, // 8 hours
        category: 'Technology',
        tags: ['React', 'JavaScript', 'Frontend'],
        instructorName: 'Sarah Wilson',
        instructorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e8?w=150&h=150&fit=crop&crop=face',
        thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop',
        rating: 4.8,
        studentsCount: 1250,
      },
      {
        title: 'Node.js Backend Development',
        description: 'Build scalable backend applications with Node.js, Express, and MongoDB. Learn API design, authentication, and deployment.',
        level: 'Intermediate',
        duration: 600, // 10 hours
        category: 'Technology',
        tags: ['Node.js', 'Express', 'MongoDB', 'Backend'],
        instructorName: 'David Chen',
        instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=300&fit=crop',
        rating: 4.6,
        studentsCount: 890,
      },
      {
        title: 'UI/UX Design Fundamentals',
        description: 'Master the principles of user interface and user experience design. Learn design thinking, prototyping, and user research.',
        level: 'Beginner',
        duration: 360, // 6 hours
        category: 'Design',
        tags: ['UI/UX', 'Design', 'Figma', 'Prototyping'],
        instructorName: 'Emily Rodriguez',
        instructorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        thumbnailUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
        rating: 4.9,
        studentsCount: 2100,
      },
      {
        title: 'Digital Marketing Mastery',
        description: 'Learn how to create effective digital marketing campaigns across social media, search engines, and email platforms.',
        level: 'Intermediate',
        duration: 420, // 7 hours
        category: 'Business',
        tags: ['Marketing', 'Social Media', 'SEO', 'Analytics'],
        instructorName: 'Mark Thompson',
        instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
        rating: 4.7,
        studentsCount: 1560,
      },
      {
        title: 'Python for Data Science',
        description: 'Dive into data science with Python. Learn pandas, numpy, matplotlib, and machine learning fundamentals.',
        level: 'Intermediate',
        duration: 720, // 12 hours
        category: 'Technology',
        tags: ['Python', 'Data Science', 'Machine Learning', 'Analytics'],
        instructorName: 'Dr. Lisa Chang',
        instructorAvatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
        thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
        rating: 4.8,
        studentsCount: 3200,
      },
      {
        title: 'Spanish for Beginners',
        description: 'Start your Spanish learning journey with basic vocabulary, grammar, and conversation skills.',
        level: 'Beginner',
        duration: 300, // 5 hours
        category: 'Language',
        tags: ['Spanish', 'Language', 'Conversation', 'Grammar'],
        instructorName: 'Carlos Mendoza',
        instructorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
        thumbnailUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=300&fit=crop',
        rating: 4.5,
        studentsCount: 980,
      },
    ];

    const createdCourses = [];
    for (const course of courses) {
      const createdCourse = await prisma.createCourse(course);
      createdCourses.push(createdCourse);
    }

    // Create sample lessons for each course
    const lessonTemplates = [
      { title: 'Introduction', type: 'video', duration: 15 },
      { title: 'Getting Started', type: 'video', duration: 30 },
      { title: 'Core Concepts', type: 'video', duration: 45 },
      { title: 'Practical Examples', type: 'video', duration: 60 },
      { title: 'Exercise', type: 'text', duration: 30 },
      { title: 'Advanced Topics', type: 'video', duration: 50 },
      { title: 'Best Practices', type: 'video', duration: 40 },
      { title: 'Project Work', type: 'text', duration: 90 },
      { title: 'Review', type: 'pdf', duration: 20 },
      { title: 'Final Assessment', type: 'text', duration: 30 },
    ];

    for (const course of createdCourses) {
      for (let i = 0; i < lessonTemplates.length; i++) {
        const lesson = lessonTemplates[i];
        await prisma.createLesson({
          courseId: course.id,
          title: lesson.title,
          description: `${lesson.title} for ${course.title}`,
          type: lesson.type,
          videoUrl: lesson.type === 'video' ? 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' : undefined,
          pdfUrl: lesson.type === 'pdf' ? 'https://example.com/sample.pdf' : undefined,
          content: lesson.type === 'text' ? 'This is sample lesson content.' : undefined,
          duration: lesson.duration,
          order: i + 1,
        });
      }
    }

    // Create sample enrollments
    const user1 = createdUsers[0];
    const user2 = createdUsers[1];

    await prisma.createEnrollment(user1.id, createdCourses[0].id); // John -> React
    await prisma.createEnrollment(user1.id, createdCourses[2].id); // John -> UI/UX
    await prisma.createEnrollment(user2.id, createdCourses[1].id); // Jane -> Node.js
    await prisma.createEnrollment(user2.id, createdCourses[4].id); // Jane -> Python

    console.log('✅ Database seeding completed successfully!');
    console.log(`📚 Created ${createdCourses.length} courses`);
    console.log(`👥 Created ${createdUsers.length} users`);
    console.log(`📖 Created ${createdCourses.length * lessonTemplates.length} lessons`);
    console.log(`🎓 Created 4 enrollments`);

  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  }
}

// Run the seed function
seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.disconnect();
  });