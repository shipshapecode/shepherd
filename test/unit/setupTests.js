import { jest } from '@jest/globals';
import 'fake-indexeddb/auto';
import 'regenerator-runtime/runtime';
import 'jest-expect-message';
import '@testing-library/jest-dom/extend-expect';

// Console errors are used for user information, do not display them during
// tests.
global.console = {
  ...console,
  error: jest.fn()
};

global.sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
