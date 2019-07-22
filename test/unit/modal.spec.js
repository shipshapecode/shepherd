import { Modal } from '../../src/js/modal';
import { Step } from '../../src/js/step.jsx';
import { Tour } from '../../src/js/tour';
import { classNames as modalClassNames } from '../../src/js/utils/modal';
import { stub } from 'sinon';

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

  describe('createModalOverlay()', function() {
    it('appends shepherdModalOverlayContainer to DOM when it does not exist', () => {
      const modal = new Modal();
      modal.createModalOverlay();

      expect(document.querySelectorAll('#shepherdModalOverlayContainer').length).toBe(1);
    });

    it('reuses shepherdModalOverlayContainer rather than making a new one', () => {
      const modal = new Modal();
      const modal2 = new Modal();
      modal.createModalOverlay();
      modal2.createModalOverlay();

      expect(document.querySelectorAll('#shepherdModalOverlayContainer').length).toBe(1);
      expect(modal._modalOverlayElem).toBe(modal2._modalOverlayElem);
    });
  });

  describe('setupForStep()', function() {
    let hideStub, showStub, tour;

    beforeEach(() => {
      tour = new Tour();
    });

    afterEach(() => {
      hideStub.restore();
      showStub.restore();
    });

    it('useModalOverlay: false, hides modal', () => {
      const modal = new Modal({ useModalOverlay: false });
      const step = new Step(tour, {});
      hideStub = stub(modal, 'hide');
      showStub = stub(modal, 'show');
      modal.setupForStep(step);

      expect(hideStub.called).toBe(true);
      expect(showStub.called).toBe(false);
    });

    it('useModalOverlay: true, shows modal', () => {
      const modal = new Modal({ useModalOverlay: true });
      const step = new Step(tour, {});
      hideStub = stub(modal, 'hide');
      showStub = stub(modal, 'show');
      modal.setupForStep(step);

      expect(hideStub.called).toBe(false);
      expect(showStub.called).toBe(true);
    });
  });
});
