import { assert } from 'chai';
import { elementIsHidden } from '../../src/js/utils/dom';

describe('DOM Utils', function() {
  describe('elementIsHidden', function() {
    it('returns true when hidden', function() {
      const element = {
        offsetHeight: 0,
        offsetWidth: 0
      };

      assert.isOk(elementIsHidden(element), 'evaluates to true when offset height and width are 0');
    });
  });
});