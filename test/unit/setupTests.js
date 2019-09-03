import 'regenerator-runtime/runtime';
import 'jest-expect-message';
import '@testing-library/jest-dom/extend-expect';
import 'mutationobserver-shim';
import chai from 'chai';
import chaiDom from 'chai-dom';

// activate the JSX assertion extension:
chai.use(chaiDom);

global.sleep = ms => new Promise( resolve => setTimeout(resolve, ms) );
