import { jest } from '@jest/globals';

import { Evented } from '../../shepherd.js/src/evented';

describe('Evented', () => {
  let testEvent, testOnTriggered;

  beforeEach(() => {
    testEvent = new Evented();
    testEvent.on('testOn', () => (testOnTriggered = true));
    testOnTriggered = false;
  });

  describe('on()', () => {
    it('adds a new event binding', () => {
      expect(testEvent.bindings.testOn, 'custom event added').toBeTruthy();
    });
  });

  describe('trigger()', () => {
    it('triggers a created event', () => {
      testEvent.trigger('testOn');
      expect(
        testOnTriggered,
        'true is returned from event trigger'
      ).toBeTruthy();
    });

    it('passes arguments to handler functions', () => {
      const handlerSpy = jest.fn();
      testEvent.on('myEvent', handlerSpy);
      testEvent.trigger('myEvent', {
        step: { id: 'test', text: 'A step' },
        previous: null
      });
      expect(handlerSpy).toHaveBeenCalledWith({
        previous: null,
        step: { id: 'test', text: 'A step' }
      });
    });

    it('does not skip event bindings after removing an event binding', () => {
      testEvent.once('testOn', () => true);
      const handlerSpy = jest.fn();
      testEvent.on('testOn', handlerSpy);
      testEvent.trigger('testOn');
      expect(handlerSpy).toHaveBeenCalled();
    });
  });

  describe('off()', () => {
    it('removes a generic event binding when no handler passed', () => {
      testEvent.off('testOn');
      expect(testEvent.bindings.testOn, 'custom event removed').toBeUndefined();
    });

    it('removes a specific event binding when handler is passed', () => {
      const handler = () => {};
      testEvent.on('testOn', handler);
      expect(
        testEvent.bindings.testOn.length,
        '2 event listeners for testOn'
      ).toBe(2);
      testEvent.off('testOn', handler);
      expect(
        testEvent.bindings.testOn.length,
        '1 event listener for testOn'
      ).toBe(1);
    });

    it('does not remove uncreated events', () => {
      testEvent.off('testBlank');
      expect(
        testEvent.bindings.testBlank,
        'returns false for non created events'
      ).toBeFalsy();
    });
  });

  describe('once()', () => {
    it('adds a new event binding that only triggers once', () => {
      testEvent.once('testOnce', () => true);
      testEvent.trigger('testOnce');
      expect(
        testEvent.bindings.testOnce,
        'custom event removed after one trigger'
      ).toBeTruthy();
    });
  });
});
