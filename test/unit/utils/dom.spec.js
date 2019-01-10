import { elementIsHidden } from '../../../src/js/utils/dom';

describe('DOM Utils', function() {
  describe('elementIsHidden', function() {
    it('returns true when hidden', () => {
      const element = {
        offsetHeight: 0,
        offsetWidth: 0
      };

      expect(elementIsHidden(element), 'evaluates to true when offset height and width are 0').toBeTruthy();
    });
  });
});