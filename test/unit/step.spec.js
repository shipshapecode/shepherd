import { spy, stub } from 'sinon';
import Shepherd from '../../src/js/shepherd.js';
import { Step } from '../../src/js/step.js';
import { Tour } from '../../src/js/tour.js';
import tippy from 'tippy.js';
import defaultButtons from '../cypress/utils/default-buttons';

// since importing non UMD, needs assignment
window.Shepherd = Shepherd;

const DEFAULT_STEP_CLASS = 'shepherd-step-tooltip';

describe('Tour | Step', () => {
  describe('Shepherd.Step()', () => {
    const instance = new Shepherd.Tour({
      defaultStepOptions: {
        classes: DEFAULT_STEP_CLASS,
        scrollTo: true
      }
    });

    const testStep = instance.addStep('test', {
      attachTo: { element: 'body' },
      highlightClass: 'highlight',
      id: 'test-id',
      text: 'This is a step for testing',
      buttons: [
        {
          text: 'Next',
          action: instance.next
        }
      ]
    });

    const showTestStep = instance.addStep('test2', {
      buttons: [],
      id: 'test2-id',
      text: 'Another Step'
    });

    // Add more steps for total _setupButtons coverage
    instance.addStep('test3', {
      buttons: {
        text: 'Next',
        action: instance.next
      },
      id: 'test3-id',
      text: 'Another Step part deux'
    });

    const stepWithoutNameWithId = instance.addStep({
      attachTo: { element: 'body' },
      highlightClass: 'highlight',
      id: 'no-name',
      text: 'This is a step without a name, but with an id',
      buttons: [
        {
          text: 'Next',
          action: instance.next
        }
      ]
    });

    const stepWithoutNameWithoutId = instance.addStep({
      attachTo: { element:'body' },
      highlightClass: 'highlight',
      text: 'This is a step without a name, and without an id',
      buttons: [
        {
          text: 'Next',
          action: instance.next
        }
      ]
    });

    const beforeShowPromise = new Promise((resolve) => {
      return setTimeout(1000, resolve('beforeShowPromise worked!'));
    });

    const beforeShowPromiseTestStep = instance.addStep('test3', {
      text: 'Before Show Promise Step',
      beforeShowPromise() {
        return beforeShowPromise;
      }
    });

    beforeEach(() => {
      tippy.setDefaultProps({ duration: 0, delay: 0 });
    });

    afterEach(() => {
      instance.complete();
    });

    it('has all the correct properties', () => {
      const values = ['classes', 'scrollTo', 'attachTo', 'highlightClass', 'id', 'text', 'buttons'];
      expect(values).toEqual(Object.keys(testStep.options));

      expect(testStep.id, 'passed name set as id').toBe('test');
      expect(stepWithoutNameWithId.id, 'no name, id passed is set').toBe('no-name');
      expect(stepWithoutNameWithoutId.id, 'id is generated when no name or id passed').toBe('step-1');
    });

    describe('.hide()', () => {
      it('detaches from the step target', () => {
        instance.start();

        const targetElem = document.body;

        expect(targetElem.classList.contains('shepherd-enabled')).toBe(true);

        testStep.hide();

        expect(targetElem.classList.contains('shepherd-enabled')).toBe(false);
      });
    });

    describe('.show()', () => {
      it('beforeShowPromise called before `show`', () => {
        beforeShowPromiseTestStep.show();

        return beforeShowPromise.then((result) => {
          expect(result, 'beforeShowPromise is called').toBe('beforeShowPromise worked!');
        });
      });

      it('shows step evoking method, regardless of order', () => {
        showTestStep.show();

        expect(document.querySelector('[data-shepherd-step-id=test2]')).toBeInTheDocument();
      });
    });
  });

  describe('cancel()', () => {
    it('triggers the cancel event and tour method', () => {
      let cancelCalled = false;
      let eventTriggered = false;
      const step = new Step({
        cancel() {
          cancelCalled = true;
        }
      });
      step.on('cancel', () => eventTriggered = true);
      step.cancel();

      expect(cancelCalled, 'cancel method from tour called').toBeTruthy();
      expect(eventTriggered, 'cancel event was triggered').toBeTruthy();
    });
  });

  describe('complete()', () => {
    it('triggers the complete event and tour method', () => {
      let completeCalled = false;
      let eventTriggered = false;
      const step = new Step({
        complete() {
          completeCalled = true;
        }
      });
      step.on('complete', () => eventTriggered = true);
      step.complete();

      expect(completeCalled, 'complete method from tour called').toBeTruthy();
      expect(eventTriggered, 'complete event was triggered').toBeTruthy();
    });
  });

  describe('destroy()', () => {
    it('triggers the destroy event', () => {
      const step = new Step();
      let eventTriggered = false;
      step.on('destroy', () => eventTriggered = true);
      step.destroy();

      expect(eventTriggered, 'destroy event was triggered').toBeTruthy();
    });
  });

  describe('hide()', () => {
    let beforeHideTriggered = false;
    let modalHideCalled = false;
    const step = new Step({
      modal: {
        hide() {
          modalHideCalled = true;
        }
      }
    });

    it('triggers the before-hide event', () => {
      step.on('before-hide', () => beforeHideTriggered = true);
      step.hide();

      expect(beforeHideTriggered, 'before-hide event was triggered').toBeTruthy();
    });

    it('calls tour.modal.hide', () => {
      expect(modalHideCalled, 'tour.modal.hide called').toBeTruthy();
    });
  });

  describe('_setupElements()', () => {
    it('calls destroy on the step if the content element is already set', () => {
      const step = new Step();
      let destroyCalled = false;
      step.el = document.createElement('a');
      step.destroy = () => destroyCalled = true;
      step._setupElements();
      expect(destroyCalled, '_setupElements method called destroy with element set').toBeTruthy();
    });

    it('calls destroy on the tooltip if it already exists', () => {
      const step = new Step();
      let destroyCalled = false;
      step.tooltip = {
        destroy() { destroyCalled = true; }
      };
      step._setupElements();
      expect(destroyCalled, '_setupElements method called destroy on the existing tooltip').toBe(true);
    });
  });

  describe('_scrollTo()', () => {
    it('calls the scroll native method', () => {
      const div = document.createElement('div');
      let handlerCalled = false;
      div.classList.add('scroll-test');
      document.body.appendChild(div);
      const step = new Step('test', {
        attachTo: { element: '.scroll-test', on: 'center' }
      });
      div.scrollIntoView = () => handlerCalled = true;

      step._scrollTo();
      expect(handlerCalled).toBeTruthy();
    });

    it('calls the custom handler', () => {
      let handlerAdded = false;
      const step = new Step('test', {
        scrollToHandler: () => handlerAdded = true
      });

      step._scrollTo();
      expect(handlerAdded).toBeTruthy();
    });
  });

  describe('setOptions()', () => {
    it('calls event handlers passed in as properties to the `when` option', () => {
      let whenCalled = false;
      const step = new Step('test', {
        when: {
          destroy: () => whenCalled = true
        }
      });

      step.destroy();
      expect(whenCalled).toBeTruthy();
    });
  });

  describe('getTour()', () => {
    it('returns the tour value', () => {
      const step = new Step(new Shepherd.Tour());

      expect(step.getTour() instanceof Shepherd.Tour).toBeTruthy();
    });

  });

  describe('_addContent()', () => {
    it('adds plain text to the content', () => {
      const content = document.createElement('div');
      const step = new Step();
      step.options.text = 'I am some test text.';

      step._addContent(content);

      expect(content.querySelector('.shepherd-text').innerHTML).toBe('I am some test text.');
    });

    it('applies HTML element directly to content', () => {
      const content = document.createElement('div');
      const text = document.createElement('p');
      const step = new Step();
      text.innerHTML = 'I am some test text.';
      step.options.text = text;

      step._addContent(content);

      expect(content.querySelector('.shepherd-text').innerHTML).toBe('<p>I am some test text.</p>');
    });

    it('applies the text from a function', () => {
      const content = document.createElement('div');
      const step = new Step();
      step.options.text = () => 'I am some test text.';

      step._addContent(content);

      expect(typeof step.options.text === 'function').toBeTruthy();
      expect(content.querySelector('.shepherd-text').innerHTML).toBe('I am some test text.');
    });
  });

  describe('_addButtons', () => {
    it('renders no buttons if an empty array is passed to `options.buttons`', () => {
      const content = document.createElement('div');
      const step = new Step();

      step.options.buttons = [];

      step._addButtons(content);

      expect(content.children.length).toBe(0);
    });

    it('renders no buttons if nothing is passed to `options.buttons`', () => {
      const content = document.createElement('div');
      const step = new Step();

      step._addButtons(content);

      expect(content.children.length).toBe(0);
    });

    it('renders buttons for each item passed to `options.buttons`', () => {
      const content = document.createElement('div');
      const step = new Step();

      step.options.buttons = [
        defaultButtons.cancel,
        defaultButtons.next
      ];

      step._addButtons(content);

      expect(content.children.length).toBe(1);

      const buttonContainer = content.querySelector('.shepherd-footer');

      expect(buttonContainer instanceof HTMLElement).toBe(true);

      const buttons = buttonContainer.querySelectorAll('.shepherd-button');

      expect(buttons.length).toBe(2);
    });
  });

  describe('_addKeyDownHandler', () => {
    it('ESC cancels the tour', () => {
      const element = document.createElement('div');
      const step = new Step();

      const cancelStub = stub(step, 'cancel');

      step._addKeyDownHandler(element);

      const event = new KeyboardEvent('keydown', { keyCode: 27 });
      element.dispatchEvent(event);

      expect(cancelStub.called).toBe(true);
      cancelStub.restore();
    });

    it('arrow keys move between steps', () => {
      const element = document.createElement('div');
      const tour = new Tour();
      const step = new Step(tour, {});

      const tourBackStub = stub(tour, 'back');
      const tourNextStub = stub(tour, 'next');

      expect(tourBackStub.called).toBe(false);
      expect(tourNextStub.called).toBe(false);

      step._addKeyDownHandler(element);

      const rightArrowEvent = new KeyboardEvent('keydown', { keyCode: 39 });
      element.dispatchEvent(rightArrowEvent);

      expect(tourNextStub.called).toBe(true);


      const leftArrowEvent = new KeyboardEvent('keydown', { keyCode: 37 });
      element.dispatchEvent(leftArrowEvent);

      expect(tourBackStub.called).toBe(true);

      tourBackStub.restore();
      tourNextStub.restore();
    });
  });

  describe('_addCancelLink', () => {
    it('Cancel link', () => {
      const header = document.createElement('header');
      const element = document.createElement('div');
      const step = new Step(null, { showCancelLink: true });

      step._addCancelLink(element, header);

      expect(element).toHaveClass('shepherd-has-cancel-link');
    });
  });

  describe('_createTooltipContent', () => {
    it('ARIA attributes set', () => {
      const step = new Step(null, {
        id: 'test-step',
        text: 'Lorem Ipsum',
        title: 'Test'
      });

      const element = step._createTooltipContent();

      expect(element.getAttribute('aria-labeledby')).toBe('test-step-label');
      expect(element.querySelector('.shepherd-title').id).toBe('test-step-label');

      expect(element.getAttribute('aria-describedby')).toBe('test-step-description');
      expect(element.querySelector('.shepherd-text').id).toBe('test-step-description');
    });
  });
});
