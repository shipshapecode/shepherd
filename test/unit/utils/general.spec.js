import { Step } from '../../../src/js/step.js';
import { parseAttachTo } from '../../../src/js/utils/general.js';

describe('General Utils', function() {
  describe('parseAttachTo()', function() {
    it('fails if element does not exist', function() {
      const step = new Step({}, {
        attachTo: { element: '.scroll-test', on: 'center' }
      });

      const { element } = parseAttachTo(step);
      expect(element).toBeFalsy();
    });
  });
});
