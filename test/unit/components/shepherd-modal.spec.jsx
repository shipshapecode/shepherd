import { render } from 'solid-js/web';
import ShepherdModal from '../../../shepherd.js/src/components/shepherd-modal';

describe('components/ShepherdModal', () => {
  describe('closeModalOpening()', function () {
    it('sets values back to 0', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const [ModalComponent, modalRef] = ShepherdModal();
      render(ModalComponent, container);

      await modalRef.positionModal(0, 0, 0, 0, null, {
        getBoundingClientRect() {
          return {
            height: 250,
            x: 20,
            y: 20,
            width: 500
          };
        }
      });

      let modalPath = modalRef.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM20,20a0,0,0,0,0-0,0V270a0,0,0,0,0,0,0H520a0,0,0,0,0,0-0V20a0,0,0,0,0-0-0Z'
      );

      await modalRef.closeModalOpening();

      modalPath = modalRef.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM0,0a0,0,0,0,0-0,0V0a0,0,0,0,0,0,0H0a0,0,0,0,0,0-0V0a0,0,0,0,0-0-0Z'
      );

      container.remove();
    });
  });

  describe('positionModal()', function () {
    it('sets the correct attributes when positioning modal opening', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const [ModalComponent, modalRef] = ShepherdModal();
      render(ModalComponent, container);

      await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for mount
      let modalPath = modalRef.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM0,0a0,0,0,0,0-0,0V0a0,0,0,0,0,0,0H0a0,0,0,0,0,0-0V0a0,0,0,0,0-0-0Z'
      );

      await modalRef.closeModalOpening();

      modalPath = modalRef.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM0,0a0,0,0,0,0-0,0V0a0,0,0,0,0,0,0H0a0,0,0,0,0,0-0V0a0,0,0,0,0-0-0Z'
      );

      await modalRef.positionModal(0, 0, 0, 0, null, {
        getBoundingClientRect() {
          return {
            height: 250,
            x: 20,
            y: 20,
            width: 500
          };
        }
      });

      modalPath = modalRef.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM20,20a0,0,0,0,0-0,0V270a0,0,0,0,0,0,0H520a0,0,0,0,0,0-0V20a0,0,0,0,0-0-0Z'
      );

      container.remove();
    });

    it('sets the correct attributes with padding', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const [ModalComponent, modalRef] = ShepherdModal();
      render(ModalComponent, container);

      await new Promise((resolve) => setTimeout(resolve, 0));

      let modalPath = modalRef.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM0,0a0,0,0,0,0-0,0V0a0,0,0,0,0,0,0H0a0,0,0,0,0,0-0V0a0,0,0,0,0-0-0Z'
      );

      await modalRef.positionModal(50, 0, 0, 0, null, {
        getBoundingClientRect() {
          return {
            height: 250,
            x: 20,
            y: 20,
            width: 500
          };
        }
      });

      modalPath = modalRef.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM-30,-30a0,0,0,0,0-0,0V320a0,0,0,0,0,0,0H570a0,0,0,0,0,0-0V-30a0,0,0,0,0-0-0Z'
      );

      container.remove();
    });
  });

  describe('show/hide', function () {
    it('show adds the class, hide removes it', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const [ModalComponent, modalRef] = ShepherdModal();
      render(ModalComponent, container);

      const modalElement = modalRef.getElement();
      
      modalRef.show();
      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(modalElement).toHaveClass('shepherd-modal-is-visible');

      modalRef.hide();
      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(modalElement).not.toHaveClass('shepherd-modal-is-visible');

      container.remove();
    });
  });
});
