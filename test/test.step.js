/* global describe,it */
import { assert } from 'chai';
import Shepherd from '../src/js/shepherd';
import { Step } from '../src/js/step';
// since importing non UMD, needs assignment
window.Shepherd = Shepherd;

describe('Step', function() {
  describe('Shepherd.Step()', function(){
    const instance = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-arrows',
        scrollTo: true
      }
    });

    const testStep = instance.addStep('test', {
      id: 'test',
      text: 'This is a step for testing',
      classes: 'example-step-extra-class',
      buttons: [
        {
          text: 'Next',
          action: instance.next
        }
      ]
    });

    const showTestStep = instance.addStep('test2', {
      id: 'test2',
      text: 'Another Step'
    });

    it('has all the correct properties', function() {
      const values = ['classes', 'scrollTo', 'id', 'text', 'buttons'];
      assert.deepEqual(values, Object.keys(testStep.options));
    });

    describe('.hide()', function() {
      it('shows step evoking method, regardless of order', function() {
        instance.start();
        testStep.hide();

        assert.notEqual(document.querySelector('[data-id=test]').getAttribute('hidden'), null);
      });
    });

    describe('.show()', function() {
      it('shows step evoking method, regardless of order', function() {
        showTestStep.show();

        assert.equal(document.querySelector('[data-id=test2]').dataset.id, 'test2');
      });
    });
  });

  describe('bindMethods()', function(){
    it('binds the expected methods', function(){
      const step = new Step();
      const methods = [
        '_show',
        'show',
        'hide',
        'isOpen',
        'cancel',
        'complete',
        'scrollTo',
        'destroy',
        'render'
      ];
      methods.forEach((method) => {
        assert.ok(step[method], `${method} has been bound`);
      });
    });
  });

  describe('bindButtonEvents()', function(){
    it('adds button events', function(){
      const link = document.createElement('a');
      const step = new Step();
      const event = new Event('test');
      let eventTriggered = false;

      step.bindButtonEvents({
        events: {
          test: () => eventTriggered = true
        },
        text: 'Next',
        action: () => {}
      }, link)

      link.dispatchEvent(event);
      assert.ok(eventTriggered, 'custom button event was bound/triggered')
    });
  });

  describe('bindCancelLink()', function(){
    it('adds an event handler for the cancel button', function(){
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      const link = document.createElement('a');
      const step = new Step();
      let cancelCalled = false;

      step.cancel = () => cancelCalled = true;
      step.bindCancelLink(link);

      link.dispatchEvent(event);
      assert.ok(cancelCalled, 'cancel method was called from bound click event');
    });
  });

  describe('render()', function(){
    it('calls destroy if element is already set', function(){
      const step = new Step();
      let destroyCalled = false;
      step.el = document.createElement('a');
      step.destroy = () => destroyCalled = true;
      step.render();
      assert.ok(destroyCalled, 'render method called destroy with element set');
    });

  });

  describe('destroy()', function(){
    it('triggers the destroy event', function(){
      const step = new Step();
      let eventTriggered = false;
      step.on('destroy', () => eventTriggered = true );
      step.destroy();

      assert.ok(eventTriggered, 'destroy event was triggered');
    });

  });
});
