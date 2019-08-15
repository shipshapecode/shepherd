import { makeAttachedTippyOptions } from '../../../src/js/utils/tippy-popper-options';

describe('Tippy/Popper Options Utils', function() {
  describe('makeAttachedTippyOptions()', function() {
    it('passing tippyOptions.popperOptions sets nested values', function() {
      const stepOptions =
        {
          options: {
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
          },
          styles: {
            shepherd: ' shepherd'
          }
        };

      const attachToOpts = {
        on: 'top'
      };

      const tippyOptions = makeAttachedTippyOptions(attachToOpts, stepOptions);
      expect(tippyOptions.popperOptions.modifiers.foo).toBe('bar');
      expect(tippyOptions.popperOptions.modifiers.preventOverflow.escapeWithReference).toBe(true);
    });
  });
});
