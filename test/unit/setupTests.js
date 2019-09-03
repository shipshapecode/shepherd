import 'regenerator-runtime/runtime';
import 'jest-expect-message';
import '@testing-library/jest-dom/extend-expect';
import 'mutationobserver-shim';

global.sleep = ms => new Promise( resolve => setTimeout(resolve, ms) );
