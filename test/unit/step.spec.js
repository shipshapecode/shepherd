import { spy } from 'sinon';
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
      attachTo: 'body',
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
      attachTo: 'body',
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
      attachTo: 'body',
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
      tippy.disableAnimations();
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

  describe('bindAdvance()', () => {
    let event;
    let link;
    let hasAdvanced = false;

    const advanceOnSelector = 'test-selector';
    const advanceOnEventName = 'test-event';
    const tourProto = {
      next() { hasAdvanced = true; }
    };

    beforeAll(() => {
      const tooltipElem = document.createElement('div');

      event = new Event(advanceOnEventName);

      link = document.createElement('a');
      link.classList.add(advanceOnSelector);
      link.textContent = 'Click Me 👋';

      document.body.appendChild(link);
    });

    afterAll(() => {
      link.remove();
    });

    it('triggers the `advanceOn` option via string', () => {
      const step = new Step(tourProto, {
        advanceOn: `.${advanceOnSelector} ${advanceOnEventName}`
      });

      step.isOpen = () => true;

      step.bindAdvance();
      link.dispatchEvent(event);

      expect(link.classList.contains(advanceOnSelector)).toBe(true);
      expect(hasAdvanced).toBe(true);
    });

    it('triggers the `advanceOn` option via object', () => {
      const step = new Step(tourProto, {
        advanceOn: { selector: `.${advanceOnSelector}`, event: advanceOnEventName }
      });

      step.isOpen = () => true;

      step.bindAdvance();
      link.dispatchEvent(event);

      expect(link.classList.contains(advanceOnSelector)).toBe(true);
      expect(hasAdvanced, '`next()` triggered for advanceOn').toBe(true);
    });

    it('captures events attached to no element', () => {
      const step = new Step(tourProto, {
        advanceOn: { event: advanceOnEventName }
      });

      step.isOpen = () => true;

      step.bindAdvance();
      document.body.dispatchEvent(event);

      expect(hasAdvanced, '`next()` triggered for advanceOn').toBeTruthy();
    });

    it('should support bubbling events for nodes that do not exist yet', () => {
      const event = new Event('blur');

      const step = new Step(tourProto, {
        text: 'Lorem ipsum dolor: <a href="https://example.com">sit amet</a>',
        advanceOn: {
          selector: 'a[href="https://example.com"]',
          event: 'blur'
        }
      });

      step.isOpen = () => true;

      step.bindAdvance();
      document.body.dispatchEvent(event);

      expect(hasAdvanced, '`next()` triggered for advanceOn').toBeTruthy();
    });

    it('calls `removeEventListener` when destroyed', function(done) {
      const bodySpy = spy(document.body, 'removeEventListener');
      const step = new Step(tourProto, {
        advanceOn: { event: advanceOnEventName }
      });

      step.isOpen = () => true;

      step.bindAdvance();
      step.trigger('destroy');

      expect(bodySpy.called).toBe(true);
      bodySpy.restore();

      done();
    });
  });

  describe('bindButtonEvents()', () => {
    const link = document.createElement('a');
    const step = new Step(new Tour(), {});
    it('adds button events', () => {
      const event = new Event('test');
      const hover = new Event('mouseover');
      let eventTriggered = false;

      step.bindButtonEvents({
        events: {
          'mouseover': '1',
          test: () => eventTriggered = true
        },
        text: 'Next',
        action: () => {}
      }, link);

      link.dispatchEvent(event);
      link.dispatchEvent(hover);
      expect(eventTriggered, 'custom button event was bound/triggered').toBeTruthy();
    });

    it('removes events once destroyed', () => {
      step.destroy();

      expect(link.hasAttribute('data-button-event'), 'attribute to confirm event is removed').toBeFalsy();
    });

  });

  describe('bindCancelLink()', () => {
    it('adds an event handler for the cancel button', () => {
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      const link = document.createElement('a');
      const step = new Step();
      let cancelCalled = false;

      step.cancel = () => cancelCalled = true;
      step.bindCancelLink(link);

      link.dispatchEvent(event);
      expect(cancelCalled, 'cancel method was called from bound click event').toBeTruthy();
    });
  });

  describe('bindMethods()', () => {
    it('binds the expected methods', () => {
      const step = new Step();
      const methods = [
        '_show',
        'cancel',
        'complete',
        'destroy',
        'hide',
        'isOpen',
        'scrollTo',
        'setupElements',
        'show'
      ];
      methods.forEach((method) => {
        expect(step[method], `${method} has been bound`).toBeTruthy();
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

    beforeAll(() => {
      document.body.setAttribute('data-shepherd-step', 1);
    });

    it('triggers the before-hide event', () => {
      step.on('before-hide', () => beforeHideTriggered = true);
      step.hide();

      expect(beforeHideTriggered, 'before-hide event was triggered').toBeTruthy();
    });

    it('calls tour.modal.hide', () => {
      expect(modalHideCalled, 'tour.modal.hide called').toBeTruthy();
    });

    it('removes the data-shepherd-step attribute', () => {
      expect(document.body.hasAttribute('data-shepherd-step'), 'step attribute is removed').toBeFalsy();
    });
  });

  describe('parseAttachTo()', function() {
    it('fails if element does not exist', function() {
      const step = new Step({}, {
        attachTo: { element: '.scroll-test', on: 'center' }
      });

      const { element } = step.parseAttachTo();
      expect(element).toBeFalsy();
    });
  });

  describe('setupElements()', () => {
    it('calls destroy on the step if the content element is already set', () => {
      const step = new Step();
      let destroyCalled = false;
      step.el = document.createElement('a');
      step.destroy = () => destroyCalled = true;
      step.setupElements();
      expect(destroyCalled, 'setupElements method called destroy with element set').toBeTruthy();
    });

    it('calls destroy on the tooltip if it already exists', () => {
      const step = new Step();
      let destroyCalled = false;
      step.tooltip = {
        destroy() { destroyCalled = true; }
      };
      step.setupElements();
      expect(destroyCalled, 'setupElements method called destroy on the existing tooltip').toBe(true);
    });

    it('calls bindAdvance() if advanceOn passed', () => {
      const step = new Step({
        next: () => true
      }, {
        advanceOn: '.click-test test'
      });
      const bindFunction = spy(step, 'bindAdvance');
      step.setupElements();

      expect(bindFunction.called).toBeTruthy();
    });
  });

  describe('scrollTo()', () => {
    it('calls the scroll native method', () => {
      const div = document.createElement('div');
      let handlerCalled = false;
      div.classList.add('scroll-test');
      document.body.appendChild(div);
      const step = new Step('test', {
        attachTo: { element: '.scroll-test', on: 'center' }
      });
      div.scrollIntoView = () => handlerCalled = true;

      step.scrollTo();
      expect(handlerCalled).toBeTruthy();
    });

    it('calls the custom handler', () => {
      let handlerAdded = false;
      const step = new Step('test', {
        scrollToHandler: () => handlerAdded = true
      });

      step.scrollTo();
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

      expect(content.querySelector('.shepherd-text p').innerHTML).toBe('I am some test text.');
    });

    it('maps mutiple strings to paragraphs', () => {
      const content = document.createElement('div');
      const step = new Step();
      step.options.text = ['I am some test text.', 'I am even more test text.'];

      step._addContent(content);
      expect(content.querySelectorAll('.shepherd-text p').length).toBe(2);
      expect(step.options.text.join(' '))
        .toBe(Array.from(content.querySelectorAll('.shepherd-text p')).map((text) => text.innerHTML).join(' '));
    });

    it('applies HTML element directly to content', () => {
      const content = document.createElement('div');
      const text = document.createElement('p');
      const step = new Step();
      text.innerHTML = 'I am some test text.';
      step.options.text = text;

      step._addContent(content);

      expect(content.querySelector('.shepherd-text p').innerHTML).toBe('I am some test text.');
    });

    it('applies the text from a function', () => {
      const content = document.createElement('div');
      const step = new Step();
      step.options.text = () => 'I am some test text.';

      step._addContent(content);

      expect(typeof step.options.text === 'function').toBeTruthy();
      expect(content.querySelector('.shepherd-text p').innerHTML).toBe('I am some test text.');
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

      const buttonContainer = content.querySelector('.shepherd-buttons');

      expect(buttonContainer instanceof HTMLElement).toBe(true);

      const buttons = buttonContainer.querySelectorAll('.shepherd-button');

      expect(buttons.length).toBe(2);
    });
  });
});
