import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Evented } from '../../src/evented';

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
      const handlerSpy = vi.fn();
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
      const handlerSpy = vi.fn();
      testEvent.on('testOn', handlerSpy);

      testEvent.trigger('testOn');

      expect(handlerSpy).toHaveBeenCalled();
    });

    it('calls every once handler and removes all of them', () => {
      const firstSpy = vi.fn();
      const secondSpy = vi.fn();
      const thirdSpy = vi.fn();
      testEvent.once('multipleOnce', firstSpy);
      testEvent.once('multipleOnce', secondSpy);
      testEvent.once('multipleOnce', thirdSpy);

      testEvent.trigger('multipleOnce');

      expect(firstSpy).toHaveBeenCalledTimes(1);
      expect(secondSpy).toHaveBeenCalledTimes(1);
      expect(thirdSpy).toHaveBeenCalledTimes(1);
      expect(
        testEvent.bindings.multipleOnce,
        'no spent once bindings left behind'
      ).toHaveLength(0);
    });

    it('only calls a once handler for the first trigger', () => {
      const onceSpy = vi.fn();
      const onSpy = vi.fn();
      testEvent.once('mixed', onceSpy);
      testEvent.on('mixed', onSpy);

      testEvent.trigger('mixed');
      testEvent.trigger('mixed');

      expect(onceSpy).toHaveBeenCalledTimes(1);
      expect(onSpy).toHaveBeenCalledTimes(2);
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

    it('removes every binding for a handler registered more than once', () => {
      const handler = () => {};
      testEvent.on('testOn', handler);
      testEvent.on('testOn', handler);
      expect(
        testEvent.bindings.testOn.length,
        '3 event listeners for testOn'
      ).toBe(3);

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
      ).toHaveLength(0);
    });
  });
});
