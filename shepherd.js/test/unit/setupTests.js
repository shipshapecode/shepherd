import { vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);

// Set browser environment
Object.defineProperty(globalThis, 'IS_BROWSER', {
  value: true,
  writable: false
});

// Console errors are used for user information, do not display them during
// tests.
global.console = {
  ...console,
  error: vi.fn()
};

global.sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Add custom matchers for DOM testing
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  });
}
