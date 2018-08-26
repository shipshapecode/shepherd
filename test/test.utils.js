import { assert } from 'chai';
import {
  parsePosition,
  parseShorthand
} from '../src/js/utils';

describe('Utils', function() {
  describe('parsePosition', function() {
    it('attachTo as an object', function() {
      const attachTo = {
        element: '.foo',
        on: 'bottom'
      };
      assert.equal(parsePosition(attachTo), attachTo, 'when attachTo already includes `element` and `on` return as is');
      assert.equal(parsePosition({}), null, 'when attachTo does not include `element` and `on`, return null');
    });

    it('attachTo as a string', function() {
      let attachTo = '.foo bottom';
      assert.deepEqual(parsePosition(attachTo), { element: '.foo', on: 'bottom' }, 'when attachTo is a string, return as object with `element` and `on`');

      attachTo = '.foo notValid';
      assert.equal(parsePosition(attachTo), null, 'when `on` is not a valid direction, return null');
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

  describe('setupPopper', function() {
    it('when Popper is undefined, throws error', function() {
      const UtilsInjector = require('inject-loader!../src/js/utils');
      const Utils = UtilsInjector({
        'popper.js': undefined
      });
      assert.throws(Utils.setupPopper, 'Using the attachment feature of Shepherd requires the Popper.js library');
    });
  });
});
