import { Modal } from '../../src/js/modal';
import {
  classNames as modalClassNames
} from '../../src/js/utils/modal';

describe('Modal', function() {
  describe('show/hide', function() {
    const modal = new Modal();

    it('show adds classes', () => {
      modal.show();

      expect(document.body).toHaveClass(modalClassNames.isVisible);
      expect(modal._modalOverlayElem).toHaveStyle('display: block');
    });

    it('hide removes classes', () => {
      modal.hide();

      expect(document.body).not.toHaveClass(modalClassNames.isVisible);
      expect(modal._modalOverlayElem).toHaveStyle('display: none');
    });
  });
});