import {
  closeModalOpening,
  positionModalOpening
} from '../../../src/js/utils/modal';

const svgNS = 'http://www.w3.org/2000/svg';

describe('Modal Utils', function() {
  describe('closeModalOpening', function() {
    it('sets the correct attributes when closed', () => {
      const element = document.createElementNS(svgNS, 'rect');
      element.setAttribute('x', 20);
      element.setAttribute('y', 20);
      element.setAttribute('width', '100%');
      element.setAttribute('height', '100%');

      closeModalOpening(element);

      expect(element.getAttribute('x'), 'x should be 0').toBe('0');
      expect(element.getAttribute('y'), 'y should be 0').toBe('0');
      expect(element.getAttribute('width'), 'width should be \'0\'').toBe('0');
      expect(element.getAttribute('height'), 'height should be \'0\'').toBe('0');
    });
  });

  describe('positionModalOpening', function() {
    it('sets the correct attributes when positioning modal opening', () => {
      const targetElement = document.createElement('div');
      targetElement.getBoundingClientRect = () => {
        return {
          x: 20,
          y: 20,
          width: 500,
          height: 250
        };
      };

      const svgElement = document.createElementNS(svgNS, 'rect');
      positionModalOpening(targetElement, svgElement);

      expect(svgElement.getAttribute('x'), 'x should be 20').toBe('20');
      expect(svgElement.getAttribute('y'), 'y should be 20').toBe('20');
      expect(svgElement.getAttribute('width'), 'width should be 500').toBe('500');
      expect(svgElement.getAttribute('height'), 'height should be 250').toBe('250');
    });
  });
});