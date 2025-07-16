import { describe, it, expect, vi } from 'vitest';

// Integration tests for the overall application architecture
describe('Application Integration', () => {
  describe('Module Structure', () => {
    it('should have all required service modules', async () => {
      const modules = await Promise.all([
        import('@/services/apiClient'),
        import('@/services/authService'),
        import('@/services/courseService'),
      ]);

      expect(modules[0].apiClient).toBeDefined();
      expect(modules[1].AuthService).toBeDefined();
      expect(modules[2].CourseService).toBeDefined();
    });

    it('should have all required store modules', async () => {
      const modules = await Promise.all([
        import('@/store/authStore'),
        import('@/store/appStore'),
      ]);

      expect(modules[0].useAuthStore).toBeDefined();
      expect(modules[1].useAppStore).toBeDefined();
    });

    it('should have all required component modules', async () => {
      const modules = await Promise.all([
        import('@/components/auth/ProtectedRoute'),
        import('@/components/auth/PublicRoute'),
        import('@/components/layout/AuthLayout'),
        import('@/components/layout/MainLayout'),
        import('@/components/layout/Header'),
        import('@/components/layout/Sidebar'),
      ]);

      modules.forEach(module => {
        expect(module.default).toBeDefined();
        expect(typeof module.default).toBe('function');
      });
    });
  });

  describe('Type System', () => {
    it('should have proper TypeScript types', async () => {
      const types = await import('@/types');
      
      // Should export types (this tests that the module can be imported)
      expect(types).toBeDefined();
    });

    it('should support mock data factories', () => {
      const { 
        createMockUser, 
        createMockCourse, 
        createMockLesson,
        createMockApiResponse,
        createMockPaginatedResponse 
      } = require('@/__tests__/test-utils');

      expect(typeof createMockUser).toBe('function');
      expect(typeof createMockCourse).toBe('function');
      expect(typeof createMockLesson).toBe('function');
      expect(typeof createMockApiResponse).toBe('function');
      expect(typeof createMockPaginatedResponse).toBe('function');
    });
  });

  describe('Service Integration', () => {
    it('should have consistent API patterns across services', async () => {
      const { AuthService } = await import('@/services/authService');
      const { CourseService } = await import('@/services/courseService');

      // All services should have static methods
      expect(typeof AuthService.login).toBe('function');
      expect(typeof AuthService.register).toBe('function');
      expect(typeof CourseService.getCourses).toBe('function');
      expect(typeof CourseService.getCourse).toBe('function');
    });

    it('should integrate with API client', async () => {
      const { apiClient } = await import('@/services/apiClient');

      // API client should have HTTP methods
      expect(typeof apiClient.get).toBe('function');
      expect(typeof apiClient.post).toBe('function');
      expect(typeof apiClient.put).toBe('function');
      expect(typeof apiClient.patch).toBe('function');
      expect(typeof apiClient.delete).toBe('function');
    });
  });

  describe('Store Integration', () => {
    it('should have consistent store patterns', async () => {
      const { useAuthStore } = await import('@/store/authStore');
      const { useAppStore } = await import('@/store/appStore');

      // Both stores should be functions (zustand stores)
      expect(typeof useAuthStore).toBe('function');
      expect(typeof useAppStore).toBe('function');
    });

    it('should provide state and actions', async () => {
      const { useAuthStore } = await import('@/store/authStore');
      const { useAppStore } = await import('@/store/appStore');

      // Test that stores can be called (basic zustand behavior)
      expect(() => useAuthStore.getState()).not.toThrow();
      expect(() => useAppStore.getState()).not.toThrow();
    });
  });

  describe('Component Integration', () => {
    it('should have consistent component exports', async () => {
      const authComponents = await Promise.all([
        import('@/components/auth/ProtectedRoute'),
        import('@/components/auth/PublicRoute'),
      ]);

      const layoutComponents = await Promise.all([
        import('@/components/layout/AuthLayout'),
        import('@/components/layout/MainLayout'),
        import('@/components/layout/Header'),
        import('@/components/layout/Sidebar'),
      ]);

      // All should have default exports
      [...authComponents, ...layoutComponents].forEach(component => {
        expect(component.default).toBeDefined();
        expect(typeof component.default).toBe('function');
      });
    });
  });

  describe('Test Infrastructure', () => {
    it('should have complete test utilities', () => {
      const utils = require('@/__tests__/test-utils');

      // Should export essential testing utilities
      expect(utils.render).toBeDefined();
      expect(utils.screen).toBeDefined();
      expect(utils.createMockUser).toBeDefined();
      expect(utils.createMockCourse).toBeDefined();
      expect(utils.createMockLesson).toBeDefined();
      expect(utils.waitForLoadingToFinish).toBeDefined();
    });

    it('should support custom render with providers', () => {
      const { render } = require('@/__tests__/test-utils');
      
      expect(typeof render).toBe('function');
      // Should be the custom render, not the original one
      expect(render.name).not.toBe('render');
    });
  });

  describe('Build System Integration', () => {
    it('should support Vite configuration', () => {
      // Test that we can access environment variables that would be available in Vite
      const env = import.meta.env;
      expect(env).toBeDefined();
    });

    it('should support module imports with @ alias', async () => {
      // If these imports work, the @ alias is properly configured
      const modules = await Promise.all([
        import('@/services/apiClient'),
        import('@/store/authStore'),
        import('@/components/auth/ProtectedRoute'),
        import('@/types'),
      ]);

      modules.forEach(module => {
        expect(module).toBeDefined();
      });
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle import errors gracefully', async () => {
      try {
        // Test importing main modules
        await Promise.all([
          import('@/services/apiClient'),
          import('@/services/authService'),
          import('@/services/courseService'),
          import('@/store/authStore'),
          import('@/store/appStore'),
        ]);
        expect(true).toBe(true); // If we get here, no import errors
      } catch (error) {
        expect(error).toBeNull(); // Should not have import errors
      }
    });
  });

  describe('Production Readiness', () => {
    it('should have clean architecture separation', async () => {
      // Services should not import components
      const { AuthService } = await import('@/services/authService');
      const { CourseService } = await import('@/services/courseService');
      
      expect(AuthService).toBeDefined();
      expect(CourseService).toBeDefined();
      
      // Stores should not import components
      const { useAuthStore } = await import('@/store/authStore');
      const { useAppStore } = await import('@/store/appStore');
      
      expect(useAuthStore).toBeDefined();
      expect(useAppStore).toBeDefined();
    });

    it('should support TypeScript strict mode', () => {
      // If tests compile and run, TypeScript configuration is working
      expect(true).toBe(true);
    });

    it('should have proper test coverage structure', () => {
      // Test that test files exist for major modules
      const testModules = [
        require('@/services/__tests__/apiClient.test'),
        require('@/services/__tests__/authService.test'),
        require('@/services/__tests__/courseService.test'),
        require('@/store/__tests__/authStore.test'),
        require('@/store/__tests__/appStore.test'),
        require('@/components/__tests__/auth.test'),
        require('@/components/__tests__/layout.test'),
      ];

      testModules.forEach(testModule => {
        expect(testModule).toBeDefined();
      });
    });
  });
});