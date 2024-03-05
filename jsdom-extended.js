const JSDOMEnvironment = require('jest-environment-jsdom').default;
// or import JSDOMEnvironment from 'jest-environment-jsdom'
// if you are using ESM modules

class JSDOMEnvironmentExtended extends JSDOMEnvironment {
  constructor(...args) {
    super(...args);

    this.global.structuredClone = structuredClone;
  }
}

module.exports = JSDOMEnvironmentExtended;
