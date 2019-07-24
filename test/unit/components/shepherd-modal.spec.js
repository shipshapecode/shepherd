import preact from 'preact';
import ShepherdModal from '../../../src/js/components/shepherd-modal.jsx';
import { expect } from 'chai';
import { shallow } from 'preact-render-spy';

describe('components/ShepherdModal', () => {
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
});
