import { Step } from '../../../src/js/step.js';
import { getTetherOptions, parseAttachTo } from '../../../src/js/utils/general.js';

describe('General Utils', function() {
  describe('parseAttachTo()', function() {
    it('fails if element does not exist', function() {
      const step = new Step({}, {
        attachTo: { element: '.scroll-test', on: 'center' }
      });

      const { element } = parseAttachTo(step);
      expect(element).toBeFalsy();
    });
  });

  describe('getTetherOptions', function() {
    it('classes set correctly', function() {
      const step = new Step({}, {
        attachTo: { element: '.scroll-test', on: 'center' },
        tetherOptions: {
          classes: {
            element: 'bar'
          }
        }
      });

      const tetherOptions = getTetherOptions(parseAttachTo(step), step);
      expect(tetherOptions.classes.element).toBe('bar');
    });

    it('constraints can be overridden', function() {
      const step = new Step({}, {
        attachTo: { element: '.scroll-test', on: 'center' },
        tetherOptions: {
          constraints: [
            {
              foo: 'bar'
            }
          ]
        }
      });

      const tetherOptions = getTetherOptions(parseAttachTo(step), step);
      expect(tetherOptions.constraints[0].foo).toBe('bar');
    });

    it('optimizations set correctly', function() {
      const step = new Step({}, {
        attachTo: { element: '.scroll-test', on: 'center' },
        tetherOptions: {
          optimizations: {
            foo: 'bar'
          }
        }
      });

      const tetherOptions = getTetherOptions(parseAttachTo(step), step);
      expect(tetherOptions.optimizations.foo).toBe('bar');
    });
  });
});
