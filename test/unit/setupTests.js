import 'regenerator-runtime/runtime';
import 'jest-expect-message';
import '@testing-library/jest-dom/extend-expect';
import 'mutationobserver-shim';
import chai from 'chai';
import assertJsx, { options } from 'preact-jsx-chai';

// when checking VDOM assertions, don't compare functions, just nodes and attributes:
options.functions = false;

// activate the JSX assertion extension:
chai.use(assertJsx);

global.sleep = ms => new Promise( resolve => setTimeout(resolve, ms) );
