import ShepherdFooter from '../../../src/js/components/shepherd-footer.jsx';
import { Step } from '../../../src/js/step';
import defaultButtons from '../../cypress/utils/default-buttons';

describe('shepherd-text', () => {
  // TODO: convert these tests to use the new components
  // describe('_addContent()', () => {
  //   it('adds plain text to the content', () => {
  //     const content = document.createElement('div');
  //     const step = new Step(tour, {});
  //     step.options.text = 'I am some test text.';
  //
  //     step._addContent(content, '123', step);
  //
  //     expect(content.querySelector('.shepherd-text').innerHTML).toBe('I am some test text.');
  //   });
  //
  //   it('applies HTML element directly to content', () => {
  //     const content = document.createElement('div');
  //     const text = document.createElement('p');
  //     const step = new Step(tour, {});
  //     text.innerHTML = 'I am some test text.';
  //     step.options.text = text;
  //
  //     step._addContent(content, '123', step);
  //
  //     expect(content.querySelector('.shepherd-text').innerHTML).toBe('<p>I am some test text.</p>');
  //   });
  //
  //   it('applies the text from a function', () => {
  //     const content = document.createElement('div');
  //     const step = new Step(tour, {});
  //     step.options.text = () => 'I am some test text.';
  //
  //     step._addContent(content, '123', step);
  //
  //     expect(typeof step.options.text === 'function').toBeTruthy();
  //     expect(content.querySelector('.shepherd-text').innerHTML).toBe('I am some test text.');
  //   });
  // });
});
