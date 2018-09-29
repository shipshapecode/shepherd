import { assert } from 'chai';
import UtilsInjector from 'inject-loader!../../src/js/utils';
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
      assert.equal(_parseAttachToOpts(attachTo), attachTo, 'when attachTo already includes `element` and `on` return as is');
      assert.equal(_parseAttachToOpts({}), null, 'when attachTo does not include `element` and `on`, return null');
    });

    it('attachTo as a string', function() {
      let attachTo = '.foo bottom';
      assert.deepEqual(_parseAttachToOpts(attachTo), { element: '.foo', on: 'bottom' }, 'when attachTo is a string, return as object with `element` and `on`');

      attachTo = '.foo notValid';
      assert.equal(_parseAttachToOpts(attachTo), null, 'when `on` is not a valid direction, return null');
    });
  });

  describe('parseShorthand', function() {
    it('null or undefined', function() {
      assert.equal(parseShorthand(null), null, 'null returns null');
      assert.equal(parseShorthand(undefined), undefined, 'undefined returns undefined');
    });

    it('string of values', function() {
      const values = '.foo click';
      const { event, selector } = parseShorthand(values, ['selector', 'event']);
      assert.equal(event, 'click', 'maps event from string to event prop');
      assert.equal(selector, '.foo', 'maps selector from string to selector prop');
    });
  });

  describe('setupTooltip', function() {
    it('when Tippy is undefined, throws error', function() {
      const Utils = UtilsInjector({
        'tippy.js': undefined
      });
      assert.throws(Utils.setupTooltip, 'Using the attachment feature of Shepherd requires the Tippy.js library');
    });
  });
});
