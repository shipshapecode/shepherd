import { makeAttachedPopperOptions } from '../../../src/js/utils/popper-options.js';

describe('Popper Options Utils', function() {
  describe('makeAttachedTippyOptions()', function() {
    it('passing tippyOptions.popperOptions sets nested values', function() {
      const stepOptions =
        {
          options: {
            popperOptions: {
              modifiers: {
                foo: 'bar',
                preventOverflow: {
                  escapeWithReference: true
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

      const popperOptions = makeAttachedPopperOptions(attachToOpts, stepOptions);
      expect(popperOptions.modifiers.foo).toBe('bar');
      expect(popperOptions.modifiers.preventOverflow.escapeWithReference).toBe(true);
    });
  });
});
