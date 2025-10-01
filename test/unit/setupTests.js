import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Configure Svelte to force client-side rendering
vi.doMock('svelte', async () => {
  const svelteModule = await vi.importActual('svelte');
  return {
    ...svelteModule,
    mount:
      svelteModule.mount ||
      function (component, options) {
        return svelteModule.createRoot(component, options);
      }
  };
});

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
