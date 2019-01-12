import {
  _parseAttachToOpts,
  parseShorthand
} from '../../src/js/utils.js';

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

  describe('parseShorthand', function() {
    it('null or undefined', function() {
      expect(parseShorthand(null), 'null returns null').toBe(null);
      expect(parseShorthand(undefined), 'undefined returns undefined').toBe(undefined);
    });

    it('string of values', function() {
      const values = '.foo click';
      const { event, selector } = parseShorthand(values, ['selector', 'event']);
      expect(event, 'maps event from string to event prop').toBe('click');
      expect(selector, 'maps selector from string to selector prop').toBe('.foo');
    });
  });
});
