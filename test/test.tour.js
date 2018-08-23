/* global window,require,describe,it */
import _ from 'lodash';
import { assert } from 'chai';
import Shepherd from '../src/js/shepherd';
import { Step } from '../src/js/step';
// since importing non UMD, needs assignment
window.Shepherd = Shepherd;

describe('Tour', function() {
  let instance;
  const defaults = {
    classes: 'shepherd-theme-arrows',
    scrollTo: true
  };

  beforeEach(() => {
    instance = new Shepherd.Tour({
      defaults
    });

    instance.addStep('test', {
      classes: 'foo',
      id: 'test',
      title: 'This is a test step for our tour'
    });

    instance.addStep('test2', {
      id: 'test2',
      title: 'Another Step'
    });

    instance.addStep('test3', {
      id: 'test3',
      title: 'Yet, another test step'
    });
  });

  afterEach(() => {
    instance.cancel();
  });

  describe('constructor', function() {
    it('creates a new tour instance', function() {
      assert.isOk(instance instanceof Shepherd.Tour);
    });

    it('returns the default options on the instance', function() {
      assert.deepEqual(instance.options.defaults, {
        classes: 'shepherd-theme-arrows',
        scrollTo: true
      });
    });

    it('sets the correct bindings', function() {
      const bindings = Object.keys(instance.bindings);
      const tourEvents = ['complete', 'cancel', 'start', 'show', 'active', 'inactive'];
      // Check that all bindings are included
      const difference = _.difference(tourEvents, bindings);
      assert.equal(difference.length, 0, 'all tour events bound');
    });
  });

  describe('.addStep()', function() {
    it('adds tour steps', function() {
      assert.equal(instance.steps.length, 3);
      assert.equal(instance.getById('test').options.classes, 'foo', 'classes passed to step options');
    });

    it('adds steps with only one arg', function() {
      const step = instance.addStep({
        id: 'one-arg'
      });

      assert.equal(instance.steps.length, 4);
      assert.equal(step.id, 'one-arg', 'id applied to step with just one arg');
    });

    it('adds steps that are already Step instances', function() {
      const step = instance.addStep(new Step(instance, {
        id: 'already-a-step'
      }));

      assert.equal(instance.steps.length, 4);
      assert.equal(step.id, 'already-a-step', 'id applied to step instance');
      assert.equal(step.tour, instance, 'tour is set to `this`');
    });
  });

  describe('.getById()', function() {
    it('returns the step by ID with the right title', function() {
      assert.equal(instance.steps.length, 3);
      assert.equal(instance.getById('test3').options.title, 'Yet, another test step');
    });

  });

  describe('.start()', function() {
    it('starts a tour that is the current active', function() {
      instance.start();

      assert.equal(instance, Shepherd.activeTour);
    });
  });

  describe('.getCurrentStep()', function() {
    it('returns the currently shown step', function() {
      instance.start();
      assert.equal(instance.getCurrentStep().id, 'test');
    });
  });

  describe('.next()/.back()', function() {
    it('goes to the next/previous steps', function() {
      instance.start();
      instance.next();
      assert.equal(instance.getCurrentStep().id, 'test2');
      instance.back();
      assert.equal(instance.getCurrentStep().id, 'test');
    });
  });

  describe('.complete()', function() {
    it('tears down tour on complete', function() {
      let inactiveFired = false;
      instance.on('inactive', () => {
        inactiveFired = true;
      });
      instance.start();
      assert.equal(instance, Shepherd.activeTour, 'activeTour is set to our tour');
      instance.complete();
      assert.isNotOk(Shepherd.activeTour, 'activeTour is torn down');
      assert.isOk(inactiveFired, 'inactive event fired');
    });

    it('triggers complete event when complete function is called', function() {
      let completeFired = false;
      instance.on('complete', () => {
        completeFired = true;
      });

      instance.start();
      instance.complete();
      assert.isOk(completeFired, 'complete event fired');
    });
  });

  describe('.removeStep()', function() {
    it('removes the step when passed the id', function() {
      instance.start();
      assert.equal(instance.steps.length, 3);
      instance.removeStep('test2');
      assert.equal(instance.steps.length, 2);
    });
  });
});
