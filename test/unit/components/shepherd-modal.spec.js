import ShepherdModal from '../../../src/js/components/shepherd-modal/index.svelte';
import { Tour } from '../../../src/js/tour.js';
import { stub } from 'sinon';

const classPrefix = '';
const styles = {
  'modal-mask-rect': ' shepherd-modal-mask-rect',
  'modal-overlay-container': ' shepherd-modal-overlay-container'
};

describe('components/ShepherdModal', () => {
  describe('closeModalOpening()', function() {
    it('sets values back to 0', async () => {
      const modalComponent = new ShepherdModal({
        target: document.body,
        props:
          {
            classPrefix,
            styles
          }
      });

      await modalComponent.positionModalOpening({
        getBoundingClientRect() {
          return {
            height: 250,
            x: 20,
            y: 20,
            width: 500
          };
        }
      });

      let modalMaskOpening = modalComponent.getElement().querySelector('.shepherd-modal-mask-opening');

      expect(modalMaskOpening).toHaveAttribute('height', '250');
      expect(modalMaskOpening).toHaveAttribute('x', '20');
      expect(modalMaskOpening).toHaveAttribute('y', '20');
      expect(modalMaskOpening).toHaveAttribute('width', '500');

      await modalComponent.closeModalOpening();

      modalMaskOpening = modalComponent.getElement().querySelector('.shepherd-modal-mask-opening');

      expect(modalMaskOpening).toHaveAttribute('height', '0');
      expect(modalMaskOpening).toHaveAttribute('x', '0');
      expect(modalMaskOpening).toHaveAttribute('y', '0');
      expect(modalMaskOpening).toHaveAttribute('width', '0');

      modalComponent.$destroy();
    });
  });

  describe('positionModalOpening()', function() {
    it('sets the correct attributes when positioning modal opening', async () => {
      const modalComponent = new ShepherdModal({
        target: document.body,
        props:
          {
            classPrefix,
            styles
          }
      });

      let modalMaskOpening = modalComponent.getElement().querySelector('.shepherd-modal-mask-opening');

      expect(modalMaskOpening).toHaveAttribute('height', '0');
      expect(modalMaskOpening).toHaveAttribute('x', '0');
      expect(modalMaskOpening).toHaveAttribute('y', '0');
      expect(modalMaskOpening).toHaveAttribute('width', '0');

      await modalComponent.positionModalOpening({
        getBoundingClientRect() {
          return {
            height: 250,
            x: 20,
            y: 20,
            width: 500
          };
        }
      });

      modalMaskOpening = modalComponent.getElement().querySelector('.shepherd-modal-mask-opening');

      expect(modalMaskOpening).toHaveAttribute('height', '250');
      expect(modalMaskOpening).toHaveAttribute('x', '20');
      expect(modalMaskOpening).toHaveAttribute('y', '20');
      expect(modalMaskOpening).toHaveAttribute('width', '500');

      modalComponent.$destroy();
    });

    it('sets the correct attributes with padding', async () => {
      const modalComponent = new ShepherdModal({
        target: document.body,
        props:
          {
            classPrefix,
            styles
          }
      });

      let modalMaskOpening = modalComponent.getElement().querySelector('.shepherd-modal-mask-opening');

      expect(modalMaskOpening).toHaveAttribute('height', '0');
      expect(modalMaskOpening).toHaveAttribute('x', '0');
      expect(modalMaskOpening).toHaveAttribute('y', '0');
      expect(modalMaskOpening).toHaveAttribute('width', '0');

      await modalComponent.positionModalOpening({
        getBoundingClientRect() {
          return {
            height: 250,
            x: 20,
            y: 20,
            width: 500
          };
        }
      }, 10);

      modalMaskOpening = modalComponent.getElement().querySelector('.shepherd-modal-mask-opening');

      expect(modalMaskOpening).toHaveAttribute('height', '270');
      expect(modalMaskOpening).toHaveAttribute('x', '10');
      expect(modalMaskOpening).toHaveAttribute('y', '10');
      expect(modalMaskOpening).toHaveAttribute('width', '520');

      modalComponent.$destroy();
    });
  });

  describe('setupForStep()', function() {
    let hideStub, showStub;

    afterEach(() => {
      hideStub.restore();
      showStub.restore();
    });

    it.skip('useModalOverlay: false, hides modal', async () => {
      const modalComponent = new ShepherdModal({
        target: document.body,
        props:
          {
            classPrefix,
            styles
          }
      });

      const step = {
        options: {},
        tour: {
          options: {
            useModalOverlay: false
          }
        }
      };
      hideStub = stub(modalComponent, 'hide');
      showStub = stub(modalComponent, 'show');
      await modalComponent.setupForStep(step);

      expect(hideStub.called).toBe(true);
      expect(showStub.called).toBe(false);

      modalComponent.$destroy();
    });

    it.skip('useModalOverlay: true, shows modal', async () => {
      const modalComponent = new ShepherdModal({
        target: document.body,
        props:
          {
            classPrefix,
            styles
          }
      });

      const step = {
        options: {},
        tour: {
          options: {
            useModalOverlay: true
          }
        }
      };
      hideStub = stub(modalComponent, 'hide');
      showStub = stub(modalComponent, 'show');
      await modalComponent.setupForStep(step);

      expect(hideStub.called).toBe(false);
      expect(showStub.called).toBe(true);

      modalComponent.$destroy();
    });
  });

  describe('show/hide', function() {
    const modalComponent = new ShepherdModal({
      target: document.body,
      props:
        {
          classPrefix,
          styles
        }
    });

    it('show adds classes', async () => {
      await modalComponent.show();

      expect(document.body).toHaveClass('shepherd-modal-is-visible');
    });

    it('hide removes classes', async () => {
      await modalComponent.hide();

      expect(document.body).not.toHaveClass('shepherd-modal-is-visible');

      modalComponent.$destroy();
    });
  });

  describe('shepherdModalOverlayContainer', function() {
    it('appends shepherdModalOverlayContainer to DOM when it does not exist', () => {
      expect(document.querySelectorAll('.shepherd-modal-overlay-container').length).toBe(0);

      new Tour({ useModalOverlay: true });

      expect(document.querySelectorAll('.shepherd-modal-overlay-container').length).toBe(1);
    });
  });
});
