/* global describe,it */
import { assert } from 'chai';
import { Evented } from '../src/js/evented';

describe('Evented', function() { //eslint-disable-line mocha/no-exclusive-tests
  const testEvent = new Evented();
  let testOnTriggered = false;
  describe('on()', function(){
    it('adds a new event binding', function(){
      testEvent.on('testOn', () => testOnTriggered = true );
      assert.ok(testEvent.bindings.testOn, 'custom event added');
    });
  });

  describe('trigger()', function(){
    it('triggers a created event', function(){
      testEvent.trigger('testOn')
      assert.ok(testOnTriggered, 'true is returned from event trigger');
    });
  });

  describe('off()', function(){
    it('removes an event binding', function(){
      testEvent.off('testOn');
      assert.notOk(testEvent.bindings.testOn, 'custom event removed');
    });
  });

  describe('once()', function(){
    it('adds a new event binding that only triggers once', function(){
      testEvent.once('testOnce', () => true );
      testEvent.trigger('testOnce')
      assert.ok(testEvent.bindings.testOnce, 'custom event removed after one trigger');
    });
  });
});
