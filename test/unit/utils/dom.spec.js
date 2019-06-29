import {
  elementIsHidden,
  getElementForStep
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

  describe('getElementForStep', function() {
    it('attachTo object - element is HTMLElement', () => {
      const element = document.createElement('div');
      const step = {
        options: {
          attachTo: {
            element,
            on: 'bottom'
          }
        }
      };

      expect(getElementForStep(step), 'returns element as is for HTMLElement').toEqual(element);
    });

    it('attachTo object - element is selector', () => {
      const element = document.createElement('div');
      element.classList.add('foo');
      document.body.appendChild(element);

      const step = {
        options: {
          attachTo: {
            element: '.foo',
            on: 'bottom'
          }
        }
      };

      expect(getElementForStep(step), 'returns element from selector').toEqual(element);
    });
  });
});
