import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import polyfill from '@oddbird/css-anchor-positioning/fn';

// Apply CSS Anchor Positioning Polyfill
let polyfillApplied = false;

export async function setupAnchorPolyfill() {
  if (!polyfillApplied) {
    await polyfill({
      elements: undefined,
      excludeInlineStyles: false,
      roots: [document],
      useAnimationFrame: false,
    });
    polyfillApplied = true;
  }
}

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

// Console errors and warnings are used for user information, do not display them during
// tests. We also silence CSS @position-try warnings since they're expected in the test environment.
const originalConsole = global.console;
global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn((message, ...args) => {
    // Suppress CSS @position-try warnings in tests since they're expected
    if (typeof message === 'string' && message.includes('@position-try')) {
      return;
    }
    originalConsole.warn(message, ...args);
  })
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

// CSS Anchor Positioning property mocks
if (typeof window !== 'undefined' && typeof CSSStyleDeclaration !== 'undefined') {
  // Mock CSS anchor positioning properties
  Object.defineProperty(CSSStyleDeclaration.prototype, 'anchorName', {
    get: function() { return this._anchorName || ''; },
    set: function(value) { this._anchorName = value; },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(CSSStyleDeclaration.prototype, 'positionAnchor', {
    get: function() { return this._positionAnchor || ''; },
    set: function(value) { this._positionAnchor = value; },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(CSSStyleDeclaration.prototype, 'positionArea', {
    get: function() { return this._positionArea || ''; },
    set: function(value) { this._positionArea = value; },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(CSSStyleDeclaration.prototype, 'positionTryOptions', {
    get: function() { return this._positionTryOptions || ''; },
    set: function(value) { this._positionTryOptions = value; },
    enumerable: true,
    configurable: true
  });

  // Mock CSS.supports for @position-try
  if (typeof CSS !== 'undefined' && CSS.supports) {
    const originalSupports = CSS.supports;
    CSS.supports = function(property, value) {
      // Mock support for CSS anchor positioning properties
      if (property === '@position-try' || 
          property.includes('position-try') ||
          property.includes('anchor-name') ||
          property.includes('position-anchor') ||
          property.includes('position-area')) {
        return true;
      }
      return originalSupports.call(this, property, value);
    };
  }

  // Completely mock CSSStyleSheet.insertRule to silently handle @position-try rules
  const originalInsertRule = CSSStyleSheet.prototype.insertRule;
  CSSStyleSheet.prototype.insertRule = function(rule, index) {
    // Initialize cssRules if it doesn't exist
    if (!this.cssRules) {
      this.cssRules = [];
    }
    
    // For @position-try rules or any CSS anchor positioning rules, just mock success
    if (rule.includes('@position-try') || 
        rule.includes('position-area') || 
        rule.includes('anchor-name') ||
        rule.includes('position-anchor') ||
        rule.includes('position-try-options')) {
      
      // Add a mock rule object
      const mockRule = {
        cssText: rule,
        selectorText: rule.split('{')[0].trim(),
        style: {},
        type: rule.includes('@') ? 4 : 1, // 4 for @rules, 1 for style rules
        parentStyleSheet: this
      };
      
      const insertIndex = index !== undefined ? index : this.cssRules.length;
      this.cssRules.splice(insertIndex, 0, mockRule);
      return insertIndex;
    }
    
    // For other rules, try the original method but catch any errors
    try {
      return originalInsertRule.call(this, rule, index);
    } catch (e) {
      // If it fails, still add a mock rule to prevent breaking
      const mockRule = {
        cssText: rule,
        selectorText: rule.includes('{') ? rule.split('{')[0].trim() : rule,
        style: {},
        type: 1,
        parentStyleSheet: this
      };
      
      const insertIndex = index !== undefined ? index : this.cssRules.length;
      this.cssRules.splice(insertIndex, 0, mockRule);
      return insertIndex;
    }
  };
}
