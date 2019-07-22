import preact from 'preact';
import ShepherdFooter from '../../../src/js/components/shepherd-footer.jsx';
import { expect } from 'chai';
// import { Step } from '../../../src/js/step';
// import defaultButtons from '../../cypress/utils/default-buttons';

describe('components/ShepherdFooter', () => {
  it('should add the buttons', () => {
    const options = {
      buttons: [
        {
          text: 'Next'
        }
      ]
    };

    const styles = {
      button: ' shepherd-button',
      footer: ' shepherd-footer'
    };

    const footer = <ShepherdFooter options={options} styles={styles}/>;
    expect(footer).to.contain(<button class=" shepherd-button" tabindex="0">Next</button>);
  });
  // TODO: convert these tests to use the new components
  // describe('_addButtons', () => {
  //   it('renders no buttons if an empty array is passed to `options.buttons`', () => {
  //     const content = document.createElement('div');
  //     const step = new Step(tour, {});
  //
  //     step.options.buttons = [];
  //
  //     step._addButtons(content);
  //
  //     expect(content.children.length).toBe(0);
  //   });
  //
  //   it('renders no buttons if nothing is passed to `options.buttons`', () => {
  //     const content = document.createElement('div');
  //     const step = new Step(tour, {});
  //
  //     step._addButtons(content);
  //
  //     expect(content.children.length).toBe(0);
  //   });
  //
  //   it('renders buttons for each item passed to `options.buttons`', () => {
  //     const content = document.createElement('div');
  //     const step = new Step(tour, {});
  //
  //     step.options.buttons = [
  //       defaultButtons.cancel,
  //       defaultButtons.next
  //     ];
  //
  //     step._addButtons(content);
  //
  //     expect(content.children.length).toBe(1);
  //
  //     const buttonContainer = content.querySelector('.shepherd-footer');
  //
  //     expect(buttonContainer instanceof HTMLElement).toBe(true);
  //
  //     const buttons = buttonContainer.querySelectorAll('.shepherd-button');
  //
  //     expect(buttons.length).toBe(2);
  //   });
  // });
});
