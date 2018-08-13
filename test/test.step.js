/* global describe,it */
import assert from 'assert';
import Shepherd from '../src/js/shepherd.js';
// since importing non UMD, needs assignment
window.Shepherd = Shepherd;

describe('Shepherd', function() {
  describe('.Step()', function() {
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
});
