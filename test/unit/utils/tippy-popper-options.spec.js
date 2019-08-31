import { makeAttachedTippyOptions } from '../../../src/js/utils/tippy-popper-options';
import { Step } from '../../../src/js/step.jsx';
import { Tour } from '../../../src/js/tour.jsx';

describe('Tippy/Popper Options Utils', function() {
  describe('makeAttachedTippyOptions()', function() {
    it('passing tippyOptions.popperOptions sets nested values', function() {
      const tour = new Tour();
      const step = new Step(tour, {
        tippyOptions: {
          popperOptions: {
            modifiers: {
              foo: 'bar',
              preventOverflow: {
                escapeWithReference: true
              }
            }
          }
        }
      });

      const attachToOpts = {
        on: 'top'
      };

      const tippyOptions = makeAttachedTippyOptions(attachToOpts, step);
      expect(tippyOptions.popperOptions.modifiers.foo).toBe('bar');
      expect(tippyOptions.popperOptions.modifiers.preventOverflow.escapeWithReference).toBe(true);
    });
  });
});
