import { Step } from '../../../src/js/step.js';
import { getPopperOptions, parseAttachTo } from '../../../src/js/utils/general.js';

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

  describe('getPopperOptions', function() {
    it('modifiers can be overridden', function() {
      const step = new Step({}, {
        attachTo: { element: '.scroll-test', on: 'right' },
        popperOptions: {
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                altAxis: false
              }
            }
          ]
        }
      });

      const { popperOptions } = getPopperOptions(step.options.attachTo, step);
      expect(popperOptions.modifiers[0].options.altAxis).toBe(false);
    });

    it('positioning strategy is explicitly set', function() {
      const step = new Step({}, {
        attachTo: { element: '.scroll-test', on: 'center' },
        options: {
          popperOptions: {
            strategy: 'absolute'
          }
        }
      });

      const { popperOptions } = getPopperOptions(step.options.attachTo, step);
      expect(popperOptions.strategy).toBe('absolute');
    });
  });
});
