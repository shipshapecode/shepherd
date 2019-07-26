import preact from 'preact';
import ShepherdModal from '../../../src/js/components/shepherd-modal';
import { expect } from 'chai';
import { shallow } from 'preact-render-spy';
import { stub } from 'sinon';

const classPrefix = '';
const styles = {
  'modal-mask-rect': ' shepherd-modal-mask-rect',
  'modal-overlay-container': ' shepherd-modal-overlay-container',
};

describe('components/ShepherdModal', () => {
  describe('closeModalOpening()', function() {
    it('sets values back to 0', () => {
      const modalComponent = shallow(<ShepherdModal classPrefix={classPrefix} styles={styles}/>);

      modalComponent.component().positionModalOpening({
        getBoundingClientRect() {
          return {
            height: 250,
            x: 20,
            y: 20,
            width: 500
          };
        }
      });

      modalComponent.rerender();

      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('height')).to.equal(250);
      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('x')).to.equal(20);
      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('y')).to.equal(20);
      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('width')).to.equal(500);

      modalComponent.component().closeModalOpening();
      modalComponent.rerender();

      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('height')).to.equal(0);
      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('x')).to.equal(0);
      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('y')).to.equal(0);
      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('width')).to.equal(0);
    });
  });

  describe('positionModalOpening()', function() {
    it('sets the correct attributes when positioning modal opening', () => {
      const modalComponent = shallow(<ShepherdModal classPrefix={classPrefix} styles={styles}/>);

      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('height')).to.equal(0);
      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('x')).to.equal(0);
      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('y')).to.equal(0);
      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('width')).to.equal(0);

      modalComponent.component().positionModalOpening({
        getBoundingClientRect() {
          return {
            height: 250,
            x: 20,
            y: 20,
            width: 500
          };
        }
      });

      modalComponent.rerender();

      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('height')).to.equal(250);
      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('x')).to.equal(20);
      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('y')).to.equal(20);
      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('width')).to.equal(500);
    });

    it('sets the correct attributes with padding', () => {
      const modalComponent = shallow(<ShepherdModal classPrefix={classPrefix} styles={styles}/>);

      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('height')).to.equal(0);
      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('x')).to.equal(0);
      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('y')).to.equal(0);
      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('width')).to.equal(0);

      modalComponent.component().positionModalOpening({
        getBoundingClientRect() {
          return {
            height: 250,
            x: 20,
            y: 20,
            width: 500
          };
        }
      }, 10);

      modalComponent.rerender();

      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('height')).to.equal(270);
      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('x')).to.equal(10);
      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('y')).to.equal(10);
      expect(modalComponent.find('.shepherd-modal-mask-opening').attr('width')).to.equal(520);
    });
  });

  describe('setupForStep()', function() {
    let hideStub, showStub;

    afterEach(() => {
      hideStub.restore();
      showStub.restore();
    });

    it('useModalOverlay: false, hides modal', () => {
      const modalComponent = shallow(<ShepherdModal classPrefix={classPrefix} styles={styles}/>);
      const modalComponentInstance = modalComponent.component();
      const step = {
        options: {},
        tour: {
          options: {
            useModalOverlay: false
          }
        }
      };
      hideStub = stub(modalComponentInstance, 'hide');
      showStub = stub(modalComponentInstance, 'show');
      modalComponentInstance.setupForStep(step);

      expect(hideStub.called).to.be.true;
      expect(showStub.called).to.be.false;
    });

    it('useModalOverlay: true, shows modal', () => {
      const modalComponent = shallow(<ShepherdModal classPrefix={classPrefix} styles={styles}/>);
      const modalComponentInstance = modalComponent.component();
      const step = {
        options: {},
        tour: {
          options: {
            useModalOverlay: true
          }
        }
      };
      hideStub = stub(modalComponentInstance, 'hide');
      showStub = stub(modalComponentInstance, 'show');
      modalComponentInstance.setupForStep(step);

      expect(hideStub.called).to.be.false;
      expect(showStub.called).to.be.true;
    });
  });

  describe('show/hide', function() {
    const modalComponent = shallow(<ShepherdModal classPrefix={classPrefix} styles={styles}/>);

    it('show adds classes', () => {
      modalComponent.component().show();
      modalComponent.rerender();

      expect(document.body).to.have.class('shepherd-modal-is-visible');
      // expect(modal._modalOverlayElem).toHaveStyle('display: block');
    });

    it('hide removes classes', () => {
      modalComponent.component().hide();
      modalComponent.rerender();

      expect(document.body).not.to.have.class('shepherd-modal-is-visible');
      // expect(modal._modalOverlayElem).toHaveStyle('display: none');
    });
  });

  // TODO: finish porting these tests
  // describe('_cleanupStepEventListeners', function() {
  //   it('adds/removes listeners', () => {
  //     const modalComponent = shallow(<ShepherdModal classPrefix={classPrefix} styles={styles}/>);
  //
  //     const mock = {
  //       foo: 'bar',
  //       _onScreenChange() {}
  //     };
  //
  //     modalComponent.component()._cleanupStepEventListeners.call(mock);
  //
  //     expect(mock._onScreenChange).to.be.null;
  //   });
  // });
  // describe('createModalOverlay()', function() {
  //   it('appends shepherdModalOverlayContainer to DOM when it does not exist', () => {
  //     const modal = new Modal();
  //     modal.createModalOverlay();
  //
  //     expect(document.querySelectorAll('#shepherdModalOverlayContainer').length).toBe(1);
  //   });
  //
  //   it('reuses shepherdModalOverlayContainer rather than making a new one', () => {
  //     const modal = new Modal();
  //     const modal2 = new Modal();
  //     modal.createModalOverlay();
  //     modal2.createModalOverlay();
  //
  //     expect(document.querySelectorAll('#shepherdModalOverlayContainer').length).toBe(1);
  //     expect(modal._modalOverlayElem).toBe(modal2._modalOverlayElem);
  //   });
  // });
  //
});
