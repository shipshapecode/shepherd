import { assert } from 'chai';
import { Evented } from '../../src/js/evented.js';

describe('Evented', () => {
  let testEvent, testOnTriggered;

  beforeEach(() => {
    testEvent = new Evented();
    testEvent.on('testOn', () => testOnTriggered = true);
    testOnTriggered = false;
  });

  describe('on()', () => {
    it('adds a new event binding', () => {
      assert.ok(testEvent.bindings.testOn, 'custom event added');
    });
  });

  describe('trigger()', () => {
    it('triggers a created event', () => {
      testEvent.trigger('testOn');
      assert.ok(testOnTriggered, 'true is returned from event trigger');
    });
  });

  describe('off()', () => {
    it('removes a generic event binding when no handler passed', () => {
      testEvent.off('testOn');
      assert.notOk(testEvent.bindings.testOn, 'custom event removed');
    });

    it('removes a specific event binding when handler is passed', () => {
      const handler = () => {};
      testEvent.on('testOn', handler);
      assert.equal(testEvent.bindings.testOn.length, 2, '2 event listeners for testOn');
      testEvent.off('testOn', handler);
      assert.equal(testEvent.bindings.testOn.length, 1, '1 event listener for testOn');
    });

    it('does not remove uncreated events', () => {
      assert.notOk(testEvent.off('testBlank'), 'returns false for non created events');
    });
  });

  describe('once()', () => {
    it('adds a new event binding that only triggers once', () => {
      testEvent.once('testOnce', () => true);
      testEvent.trigger('testOnce');
      assert.ok(testEvent.bindings.testOnce, 'custom event removed after one trigger');
    });
  });
});
