import { Step } from '../../../src/js/step.jsx';
import { parseAttachTo } from '../../../src/js/utils/general';


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
