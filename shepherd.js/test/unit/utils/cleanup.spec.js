import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Shepherd from '../../../src/shepherd';

const CLICK_DISABLED = 'shepherd-target-click-disabled';

describe('Ending a tour', function () {
  let elements;

  const addElement = (className) => {
    const el = document.createElement('div');
    el.classList.add(className);
    document.body.appendChild(el);
    elements.push(el);
    return el;
  };

  beforeEach(() => {
    elements = [];
  });

  afterEach(() => {
    elements.forEach((el) => el.remove());
  });

  describe.each(['cancel', 'complete'])('%s()', function (ending) {
    it('removes shepherd-target-click-disabled from every target and extra highlight', async () => {
      const first = addElement('first-attach-to');
      const second = addElement('second-attach-to');
      const extra = addElement('extra-highlight');
      const otherExtra = addElement('extra-highlight');

      const tour = new Shepherd.Tour({
        steps: [
          {
            id: 'first',
            attachTo: { element: '.first-attach-to', on: 'bottom' },
            canClickTarget: false
          },
          {
            id: 'second',
            attachTo: { element: '.second-attach-to', on: 'bottom' },
            canClickTarget: false,
            extraHighlights: ['.extra-highlight']
          }
        ]
      });

      await tour.start();
      expect(first).toHaveClass(CLICK_DISABLED);

      await tour.next();
      expect(second).toHaveClass(CLICK_DISABLED);
      expect(extra).toHaveClass(CLICK_DISABLED);
      expect(otherExtra).toHaveClass(CLICK_DISABLED);

      await tour[ending]();

      elements.forEach((el) => expect(el).not.toHaveClass(CLICK_DISABLED));
    });
  });
});
