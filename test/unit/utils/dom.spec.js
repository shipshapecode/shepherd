import {
  elementIsHidden
} from '../../../src/js/utils/dom';

describe('DOM Utils', function() {
  describe('elementIsHidden', function() {
    it('returns true when hidden', () => {
      const element = document.createElement('div');
      element.setAttribute('offsetHeight', 0);
      element.setAttribute('offsetWidth', 0);

      expect(elementIsHidden(element), 'evaluates to true when offset height and width are 0').toBeTruthy();
    });
  });
});
