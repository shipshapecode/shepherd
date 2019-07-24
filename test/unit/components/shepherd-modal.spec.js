import preact from 'preact';
import ShepherdModal from '../../../src/js/components/shepherd-modal.jsx';
import { expect } from 'chai';
import { shallow } from 'preact-render-spy';
import { Tour } from '../../../src/js/tour';
import { Step } from '../../../src/js/step';
import { stub } from 'sinon';

describe('components/ShepherdModal', () => {
  describe('show/hide', function() {
    const modalComponent = shallow(<ShepherdModal/>);

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

  it('closeModalOpening sets values back to 0', () => {
    const modalComponent = shallow(<ShepherdModal/>);

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

    expect(modalComponent.find('#shepherdModalMaskOpening').attr('height')).to.equal(250);
    expect(modalComponent.find('#shepherdModalMaskOpening').attr('x')).to.equal(20);
    expect(modalComponent.find('#shepherdModalMaskOpening').attr('y')).to.equal(20);
    expect(modalComponent.find('#shepherdModalMaskOpening').attr('width')).to.equal(500);

    modalComponent.component().closeModalOpening();
    modalComponent.rerender();

    expect(modalComponent.find('#shepherdModalMaskOpening').attr('height')).to.equal(0);
    expect(modalComponent.find('#shepherdModalMaskOpening').attr('x')).to.equal(0);
    expect(modalComponent.find('#shepherdModalMaskOpening').attr('y')).to.equal(0);
    expect(modalComponent.find('#shepherdModalMaskOpening').attr('width')).to.equal(0);
  });

  it('sets the correct attributes when positioning modal opening', () => {
    const modalComponent = shallow(<ShepherdModal/>);

    expect(modalComponent.find('#shepherdModalMaskOpening').attr('height')).to.equal(0);
    expect(modalComponent.find('#shepherdModalMaskOpening').attr('x')).to.equal(0);
    expect(modalComponent.find('#shepherdModalMaskOpening').attr('y')).to.equal(0);
    expect(modalComponent.find('#shepherdModalMaskOpening').attr('width')).to.equal(0);

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

    expect(modalComponent.find('#shepherdModalMaskOpening').attr('height')).to.equal(250);
    expect(modalComponent.find('#shepherdModalMaskOpening').attr('x')).to.equal(20);
    expect(modalComponent.find('#shepherdModalMaskOpening').attr('y')).to.equal(20);
    expect(modalComponent.find('#shepherdModalMaskOpening').attr('width')).to.equal(500);
  });

  it('sets the correct attributes with padding', () => {
    const modalComponent = shallow(<ShepherdModal/>);

    expect(modalComponent.find('#shepherdModalMaskOpening').attr('height')).to.equal(0);
    expect(modalComponent.find('#shepherdModalMaskOpening').attr('x')).to.equal(0);
    expect(modalComponent.find('#shepherdModalMaskOpening').attr('y')).to.equal(0);
    expect(modalComponent.find('#shepherdModalMaskOpening').attr('width')).to.equal(0);

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

    expect(modalComponent.find('#shepherdModalMaskOpening').attr('height')).to.equal(270);
    expect(modalComponent.find('#shepherdModalMaskOpening').attr('x')).to.equal(10);
    expect(modalComponent.find('#shepherdModalMaskOpening').attr('y')).to.equal(10);
    expect(modalComponent.find('#shepherdModalMaskOpening').attr('width')).to.equal(520);
  });

  // TODO: finish porting these tests
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
  // describe('setupForStep()', function() {
  //   let hideStub, showStub, tour;
  //
  //   beforeEach(() => {
  //     tour = new Tour();
  //   });
  //
  //   afterEach(() => {
  //     hideStub.restore();
  //     showStub.restore();
  //   });
  //
  //   it('useModalOverlay: false, hides modal', () => {
  //     const modal = new Modal({ useModalOverlay: false });
  //     const step = new Step(tour, {});
  //     hideStub = stub(modal, 'hide');
  //     showStub = stub(modal, 'show');
  //     modal.setupForStep(step);
  //
  //     expect(hideStub.called).toBe(true);
  //     expect(showStub.called).toBe(false);
  //   });
  //
  //   it('useModalOverlay: true, shows modal', () => {
  //     const modal = new Modal({ useModalOverlay: true });
  //     const step = new Step(tour, {});
  //     hideStub = stub(modal, 'hide');
  //     showStub = stub(modal, 'show');
  //     modal.setupForStep(step);
  //
  //     expect(hideStub.called).toBe(false);
  //     expect(showStub.called).toBe(true);
  //   });
  // });
});
