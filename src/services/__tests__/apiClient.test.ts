import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Mock dependencies
vi.mock('axios');
vi.mock('react-hot-toast');

const mockedAxios = vi.mocked(axios);
const mockedToast = vi.mocked(toast);

describe('ApiClient', () => {
  let mockAxiosInstance: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
    interceptors: {
      request: { use: ReturnType<typeof vi.fn> };
      response: { use: ReturnType<typeof vi.fn> };
    };
  };
  let mockLocalStorage: {
    getItem: ReturnType<typeof vi.fn>;
    setItem: ReturnType<typeof vi.fn>;
    removeItem: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();

    // Mock axios instance
    mockAxiosInstance = {
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
    };

    // Mock axios.create to return our mock instance
    mockedAxios.create = vi.fn().mockReturnValue(mockAxiosInstance);

    // Mock localStorage
    mockLocalStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });

    // Mock toast methods
    mockedToast.error = vi.fn();
    mockedToast.success = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Initialization', () => {
    it('should create axios instance with correct configuration', async () => {
      // Import after mocks are set up
      await import('@/services/apiClient');
      
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'http://localhost:3001/api',
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should setup request and response interceptors', async () => {
      await import('@/services/apiClient');
      
      expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
      expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
    });
  });

  describe('HTTP Methods', () => {
    it('should call get method correctly', async () => {
      const { apiClient } = await import('@/services/apiClient');
      const responseData = { id: 1, name: 'Test' };
      mockAxiosInstance.get.mockResolvedValue({ data: responseData });

      const result = await apiClient.get('/test');

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', undefined);
      expect(result).toEqual(responseData);
    });

    it('should call post method correctly', async () => {
      const { apiClient } = await import('@/services/apiClient');
      const responseData = { id: 1, name: 'Created' };
      const postData = { name: 'Test' };
      mockAxiosInstance.post.mockResolvedValue({ data: responseData });

      const result = await apiClient.post('/test', postData);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/test', postData, undefined);
      expect(result).toEqual(responseData);
    });

    it('should call put method correctly', async () => {
      const { apiClient } = await import('@/services/apiClient');
      const responseData = { id: 1, name: 'Updated' };
      const putData = { name: 'Updated Test' };
      mockAxiosInstance.put.mockResolvedValue({ data: responseData });

      const result = await apiClient.put('/test/1', putData);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/test/1', putData, undefined);
      expect(result).toEqual(responseData);
    });

    it('should call patch method correctly', async () => {
      const { apiClient } = await import('@/services/apiClient');
      const responseData = { id: 1, name: 'Patched' };
      const patchData = { name: 'Patched Test' };
      mockAxiosInstance.patch.mockResolvedValue({ data: responseData });

      const result = await apiClient.patch('/test/1', patchData);

      expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/test/1', patchData, undefined);
      expect(result).toEqual(responseData);
    });

    it('should call delete method correctly', async () => {
      const { apiClient } = await import('@/services/apiClient');
      const responseData = { success: true };
      mockAxiosInstance.delete.mockResolvedValue({ data: responseData });

      const result = await apiClient.delete('/test/1');

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/test/1', undefined);
      expect(result).toEqual(responseData);
    });
  });
});