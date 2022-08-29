import 'regenerator-runtime/runtime';
//import 'jest-expect-message';
import '@testing-library/jest-dom/extend-expect';
import 'mutationobserver-shim';


// Console errors are used for user information, do not display them during
// tests.
global.console = {
  ...console,
  error: jest.fn()
};

global.sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
