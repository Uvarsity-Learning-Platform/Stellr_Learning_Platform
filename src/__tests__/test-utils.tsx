// Test utilities and helpers
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

// Custom render function that includes common providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

// Mock data factories
export const createMockUser = (overrides = {}) => ({
  id: '1',
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  isOnboarded: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

export const createMockCourse = (overrides = {}) => ({
  id: '1',
  title: 'Test Course',
  description: 'A test course description',
  thumbnail: 'https://example.com/thumbnail.jpg',
  category: 'Web Development',
  tags: ['React', 'JavaScript'],
  difficulty: 'Beginner' as const,
  duration: 120,
  lessonsCount: 10,
  enrolled: false,
  progress: 0,
  instructor: {
    name: 'Test Instructor',
    avatar: 'https://example.com/avatar.jpg',
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

export const createMockLesson = (overrides = {}) => ({
  id: '1',
  courseId: '1',
  title: 'Test Lesson',
  description: 'A test lesson description',
  type: 'video' as const,
  videoUrl: 'https://example.com/video.mp4',
  duration: 15,
  order: 1,
  completed: false,
  createdAt: new Date().toISOString(),
  ...overrides,
});

// Mock API responses
export const createMockApiResponse = <T,>(data: T, overrides = {}) => ({
  success: true,
  data,
  message: 'Success',
  ...overrides,
});

export const createMockPaginatedResponse = <T,>(data: T[], overrides = {}) => ({
  data,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: data.length,
    itemsPerPage: 10,
  },
  ...overrides,
});

// Test helper functions
export const waitForLoadingToFinish = () => {
  return new Promise(resolve => setTimeout(resolve, 0));
};

export const mockLocalStorage = () => {
  const store: { [key: string]: string } = {};
  
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach(key => delete store[key]);
    }),
  };
};

export const mockAxiosInstance = () => ({
  create: vi.fn(() => mockAxiosInstance()),
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
  interceptors: {
    request: {
      use: vi.fn(),
    },
    response: {
      use: vi.fn(),
    },
  },
});