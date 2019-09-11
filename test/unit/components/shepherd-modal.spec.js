import ShepherdModal from '../../../src/js/components/shepherd-modal.svelte';
import { Tour } from '../../../src/js/tour.js';
import { stub } from 'sinon';

const classPrefix = '';

describe('components/ShepherdModal', () => {
  describe('closeModalOpening()', function() {
    it('sets values back to 0', async () => {
      const modalComponent = new ShepherdModal({
        target: document.body,
        props:
          {
            classPrefix
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

      let modalPath = modalComponent.getElement().querySelector('path');
      expect(modalPath)
        .toHaveAttribute('d', 'M 20 20 H 520 V 270 H 20 L 20 0 Z M 0 0 H 1024 V 768 H 0 L 0 0 Z');

      await modalComponent.closeModalOpening();

      modalPath = modalComponent.getElement().querySelector('path');
      expect(modalPath)
        .toHaveAttribute('d', 'M 0 0 H 0 V 0 H 0 L 0 0 Z M 0 0 H 1024 V 768 H 0 L 0 0 Z');

      modalComponent.$destroy();
    });
  });

  describe('positionModalOpening()', function() {
    it('sets the correct attributes when positioning modal opening', async () => {
      const modalComponent = new ShepherdModal({
        target: document.body,
        props:
          {
            classPrefix
          }
      });

      let modalPath = modalComponent.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute('d', 'M 0 0 H 0 V 0 H 0 L 0 0 Z M 0 0 H 1024 V 768 H 0 L 0 0 Z');

      await modalComponent.closeModalOpening();

      modalPath = modalComponent.getElement().querySelector('path');
      expect(modalPath)
        .toHaveAttribute('d', 'M 0 0 H 0 V 0 H 0 L 0 0 Z M 0 0 H 1024 V 768 H 0 L 0 0 Z');

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

      modalPath = modalComponent.getElement().querySelector('path');
      expect(modalPath)
        .toHaveAttribute('d', 'M 20 20 H 520 V 270 H 20 L 20 0 Z M 0 0 H 1024 V 768 H 0 L 0 0 Z');

      modalComponent.$destroy();
    });

    it('sets the correct attributes with padding', async () => {
      const modalComponent = new ShepherdModal({
        target: document.body,
        props:
          {
            classPrefix
          }
      });

      let modalPath = modalComponent.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute('d', 'M 0 0 H 0 V 0 H 0 L 0 0 Z M 0 0 H 1024 V 768 H 0 L 0 0 Z');

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

      modalPath = modalComponent.getElement().querySelector('path');
      expect(modalPath)
        .toHaveAttribute('d', 'M 10 10 H 530 V 280 H 10 L 10 0 Z M 0 0 H 1024 V 768 H 0 L 0 0 Z');

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
            classPrefix
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
            classPrefix
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
          classPrefix
        }
    });

    it('show adds classes', async () => {
      await modalComponent.show();

      expect(modalComponent.getElement()).toHaveClass('shepherd-modal-is-visible');
    });

    it('hide removes classes', async () => {
      await modalComponent.hide();

      expect(modalComponent.getElement()).not.toHaveClass('shepherd-modal-is-visible');

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
