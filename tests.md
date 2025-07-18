# Testing Guide for Uvarsity

This document provides comprehensive instructions for running tests locally and understanding the testing infrastructure in the Uvarsity application.

## Overview

Uvarsity uses a modern testing stack with the following tools:
- **Vitest**: Fast unit test runner built on Vite
- **React Testing Library**: For testing React components
- **Jest DOM**: Additional matchers for DOM testing
- **User Event**: For simulating user interactions

## Test Structure

The application has comprehensive test coverage for:

### 📁 Services (`src/services/__tests__/`)
- **`apiClient.test.ts`**: HTTP client, interceptors, error handling
- **`authService.test.ts`**: Authentication flows, login, registration, OTP
- **`courseService.test.ts`**: Course management, lessons, enrollment

### 📁 State Management (`src/store/__tests__/`)
- **`authStore.test.ts`**: User authentication state
- **`appStore.test.ts`**: Application state, courses, progress, certificates

### 📁 Components (`src/components/__tests__/`)
- **`auth.test.tsx`**: Protected/Public route components
- **`layout.test.tsx`**: Layout components (Header, Sidebar, AuthLayout, MainLayout)

### 📁 Test Utilities (`src/__tests__/`)
- **`test-utils.tsx`**: Custom render functions, mock factories, helpers

## Running Tests Locally

### Prerequisites

1. **Node.js** (v18+ recommended)
2. **npm** or **yarn** package manager
3. **Git** for version control

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd Uvarsity

# Install dependencies
npm install

# Verify installation
npm run test:run
```

### Test Commands

#### Run All Tests
```bash
npm run test
```
- Runs all tests in watch mode
- Automatically re-runs tests when files change
- Best for development

#### Run Tests Once
```bash
npm run test:run
```
- Runs all tests once and exits
- Best for CI/CD and quick verification

#### Run Tests with Coverage
```bash
npm run test:coverage
```
- Generates test coverage report
- Creates HTML report in `coverage/` directory
- Shows line, branch, and function coverage

#### Run Tests with UI
```bash
npm run test:ui
```
- Opens Vitest UI in browser
- Visual test runner with filtering and debugging
- Great for exploring test results

### Running Specific Tests

#### Test a Specific File
```bash
# Run only service tests
npm run test -- src/services

# Run only store tests  
npm run test -- src/store

# Run only component tests
npm run test -- src/components

# Run specific test file
npm run test -- src/services/__tests__/authService.test.ts
```

#### Filter Tests by Name
```bash
# Run tests matching pattern
npm run test -- --grep "login"

# Run tests for specific service
npm run test -- --grep "AuthService"
```

#### Watch Specific Files
```bash
# Watch only changed files
npm run test -- --changed

# Watch files matching pattern
npm run test -- src/services --watch
```

## Test Configuration

### Vitest Configuration (`vite.config.ts`)

```typescript
test: {
  globals: true,              // Global test functions (describe, it, expect)
  environment: 'jsdom',       // Browser-like environment for React
  setupFiles: './src/test-setup.ts',  // Global test setup
  include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  coverage: {
    provider: 'v8',
    reporter: ['text', 'json', 'html'],
    exclude: [
      'node_modules/',
      'src/test-setup.ts',
      '**/*.d.ts',
      '**/*.config.*',
      'dist/',
    ],
  },
}
```

### Test Setup (`src/test-setup.ts`)

Global mocks and utilities:
- **DOM APIs**: IntersectionObserver, matchMedia
- **Storage**: localStorage, sessionStorage  
- **Testing Libraries**: @testing-library/jest-dom matchers

## Writing Tests

### Test Structure Example

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/__tests__/test-utils';

describe('ComponentName', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Feature Group', () => {
    it('should do something specific', async () => {
      // Arrange
      const props = { /* test props */ };
      
      // Act
      render(<ComponentName {...props} />);
      
      // Assert
      expect(screen.getByText('Expected Text')).toBeInTheDocument();
    });
  });
});
```

### Mock Patterns

#### Mock External Dependencies
```typescript
vi.mock('axios');
vi.mock('react-router-dom');
vi.mock('@/services/apiClient');
```

#### Mock Zustand Stores
```typescript
vi.mock('@/store/authStore', () => ({
  useAuthStore: () => ({
    isAuthenticated: false,
    user: null,
    setUser: vi.fn(),
  }),
}));
```

#### Mock Factory Functions
```typescript
const createMockUser = (overrides = {}) => ({
  id: '1',
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  ...overrides,
});
```

## Test Categories

### 🔧 Unit Tests
- Test individual functions and components in isolation
- Mock external dependencies
- Fast execution, reliable results

### 🔗 Integration Tests  
- Test multiple components working together
- Test service interactions
- Verify data flow between modules

### 🎯 End-to-End Tests
*Note: E2E tests are not currently implemented but can be added using Playwright*

## Coverage Goals

### Current Coverage Targets
- **Services**: 90%+ coverage
- **Stores**: 85%+ coverage  
- **Components**: 80%+ coverage
- **Utils**: 95%+ coverage

### Viewing Coverage

```bash
# Generate coverage report
npm run test:coverage

# Open HTML report
open coverage/index.html
```

The coverage report shows:
- **Line Coverage**: Percentage of lines executed
- **Branch Coverage**: Percentage of branches tested
- **Function Coverage**: Percentage of functions called
- **Statement Coverage**: Percentage of statements executed

## Debugging Tests

### VS Code Integration

Add to `.vscode/settings.json`:
```json
{
  "vitest.enable": true,
  "vitest.commandLine": "npm run test"
}
```

### Debug Specific Tests
```bash
# Run with debug output
npm run test -- --verbose

# Run in debug mode (Node.js debugger)
npm run test -- --debug

# Run single test file with logs
npm run test -- src/services/__tests__/authService.test.ts --reporter=verbose
```

### Common Debug Patterns

#### Log Component Output
```typescript
import { render, screen } from '@testing-library/react';
import { debug } from '@testing-library/react';

it('should render correctly', () => {
  render(<Component />);
  screen.debug(); // Prints current DOM
});
```

#### Async Testing
```typescript
import { waitFor } from '@testing-library/react';

it('should handle async operations', async () => {
  render(<AsyncComponent />);
  
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
```

## Continuous Integration

### GitHub Actions
Tests run automatically on:
- **Pull Requests**: Full test suite
- **Main Branch**: Full test suite + coverage
- **Releases**: Full test suite + E2E (when implemented)

### Pre-commit Hooks
```bash
# Install husky (if not already installed)
npm install --save-dev husky

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run test:run"
```

## Troubleshooting

### Common Issues

#### Tests Failing in CI but Passing Locally
```bash
# Clear all caches
rm -rf node_modules coverage dist
npm install
npm run test:run
```

#### Mock Issues
```bash
# Clear vi mock cache
vi.clearAllMocks()
vi.resetAllMocks()
vi.restoreAllMocks()
```

#### Async Test Issues
```typescript
// Use fake timers for setTimeout/setInterval
vi.useFakeTimers();
vi.advanceTimersByTime(1000);
vi.useRealTimers();
```

#### Memory Issues with Large Test Suites
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run test
```

### Performance Tips

1. **Use `vi.mock()` at module level** for better performance
2. **Clear mocks in `beforeEach()`** to avoid test pollution
3. **Use `test.concurrent()`** for independent tests
4. **Avoid unnecessary `await`** in synchronous tests

## Best Practices

### ✅ Do's
- Write descriptive test names
- Test behavior, not implementation
- Use meaningful assertions
- Mock external dependencies
- Test edge cases and error scenarios
- Keep tests focused and isolated

### ❌ Don'ts
- Test implementation details
- Write overly complex test setup
- Ignore test warnings
- Skip cleanup in `afterEach()`
- Test multiple concerns in one test
- Mock everything unnecessarily

## Team Guidelines

### Test Review Checklist
- [ ] Tests cover happy path
- [ ] Tests cover error scenarios  
- [ ] Tests are readable and maintainable
- [ ] Proper use of mocks and spies
- [ ] No test pollution between tests
- [ ] Adequate coverage for new code

### Code Quality Standards
- Use TypeScript for type safety
- Follow existing test patterns
- Add tests for new features
- Update tests when changing behavior
- Document complex test scenarios

## Resources

### Documentation
- [Vitest Guide](https://vitest.dev/guide/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

### Learning Resources
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Effective Testing Strategies](https://testing-library.com/docs/guiding-principles)

---

## Quick Reference

```bash
# Essential Commands
npm run test              # Watch mode
npm run test:run         # Run once  
npm run test:coverage    # With coverage
npm run test:ui          # Visual UI

# File-specific
npm run test -- src/services
npm run test -- --grep "login"

# Debug
npm run test -- --verbose
npm run test -- --debug
```

For additional help or questions about testing, please refer to the team documentation or create an issue in the repository.