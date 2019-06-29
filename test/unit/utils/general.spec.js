import {
  _parseAttachToOpts
} from '../../../src/js/utils/general.js';

describe('Utils', function() {
  describe('_parseAttachToOpts', function() {
    it('attachTo as an object', function() {
      const attachTo = {
        element: '.foo',
        on: 'bottom'
      };
      expect(_parseAttachToOpts(attachTo), 'when attachTo already includes `element` and `on` return as is')
        .toEqual(attachTo);
      expect(_parseAttachToOpts({}), 'when attachTo does not include `element` and `on`, return null').toBeNull();
    });

    it('attachTo as a string', function() {
      let attachTo = '.foo bottom';
      expect(_parseAttachToOpts(attachTo), 'when attachTo is a string, return as object with `element` and `on`')
        .toEqual({ element: '.foo', on: 'bottom' });

      attachTo = '.foo notValid';
      expect(_parseAttachToOpts(attachTo), 'when `on` is not a valid direction, return null').toBe(null);
    });
  });
});
