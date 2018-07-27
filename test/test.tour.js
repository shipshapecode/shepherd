/* global require,describe,it */
const assert = require('assert');
const Shepherd = require('../dist/js/shepherd.js');

describe('Shepherd', function() {
  describe('.Tour()', function() {
    it('creates a new tour instance', function() {
      const instance = new Shepherd.Tour();
      assert.ok(instance);
    });
  });
});
