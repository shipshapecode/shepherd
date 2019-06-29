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
  });
});
