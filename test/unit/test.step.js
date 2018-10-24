import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { spy } from 'sinon';

chai.use(chaiAsPromised);
const { assert } = chai;
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
      id: 'test',
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
      id: 'test2',
      text: 'Another Step'
    });

    // Add more steps for total _setupButtons coverage
    instance.addStep('test3', {
      buttons: {
        text: 'Next',
        action: instance.next
      },
      id: 'test3',
      text: 'Another Step part deux'
    });

    const beforeShowPromise = new Promise((resolve) => {
      return setTimeout(1000, resolve('beforeShowPromise worked!'));
    });

    const beforeShowPromiseTestStep = instance.addStep('test3', {
      id: 'test3',
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
      const values = ['classes', 'scrollTo', 'attachTo', 'id', 'text', 'buttons'];
      assert.deepEqual(values, Object.keys(testStep.options));
    });

    describe('.hide()', () => {
      it('detaches from the step target', () => {
        instance.start();

        const targetElem = document.body;

        assert.equal(targetElem.classList.contains('shepherd-enabled'), true);

        testStep.hide();

        assert.equal(targetElem.classList.contains('shepherd-enabled'), false);
      });
    });

    describe('.show()', () => {
      it('beforeShowPromise called before `show`', () => {
        assert.eventually.equal(beforeShowPromise, 'beforeShowPromise worked!', 'beforeShowPromise is called');
        beforeShowPromiseTestStep.show();
      });

      it('shows step evoking method, regardless of order', () => {
        showTestStep.show();

        assert.exists(document.querySelector('[data-shepherd-step-id=test2]'));
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

    before(() => {
      const tooltipElem = document.createElement('div');

      event = new Event(advanceOnEventName);

      link = document.createElement('a');
      link.classList.add(advanceOnSelector);
      link.textContent = 'Click Me 👋';

      document.body.appendChild(link);
    });

    after(() => {
      link.remove();
    });

    it('triggers the `advanceOn` option via string', () => {
      const step = new Step(tourProto, {
        advanceOn: `.${advanceOnSelector} ${advanceOnEventName}`
      });

      step.isOpen = () => true;

      step.bindAdvance();
      link.dispatchEvent(event);

      assert.equal(link.classList.contains(advanceOnSelector), true);
      assert.equal(hasAdvanced, true);
    });

    it('triggers the `advanceOn` option via object', () => {
      const step = new Step(tourProto, {
        advanceOn: { selector: `.${advanceOnSelector}`, event: advanceOnEventName }
      });

      step.isOpen = () => true;

      step.bindAdvance();
      link.dispatchEvent(event);

      assert.equal(link.classList.contains(advanceOnSelector), true);
      assert.equal(hasAdvanced, true, '`next()` triggered for advanceOn');
    });

    it('captures events attached to no element', () => {
      const step = new Step(tourProto, {
        advanceOn: { event: advanceOnEventName }
      });

      step.isOpen = () => true;

      step.bindAdvance();
      document.body.dispatchEvent(event);

      assert.isOk(hasAdvanced, '`next()` triggered for advanceOn');
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

      assert.isOk(hasAdvanced, '`next()` triggered for advanceOn');
    });

    it('calls `removeEventListener` when destroyed', function(done){
      const bodySpy = spy(document.body, 'removeEventListener');
      const step = new Step(tourProto, {
        advanceOn: { event: advanceOnEventName }
      });

      step.isOpen = () => true;

      step.bindAdvance();
      step.trigger('destroy');

      assert.equal(bodySpy.called, true);
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
      assert.isOk(eventTriggered, 'custom button event was bound/triggered');
    });

    it('removes events once destroyed', () => {
      step.destroy();

      assert.isNotOk(link.hasAttribute('data-button-event'), 'attribute to confirm event is removed');
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
      assert.isOk(cancelCalled, 'cancel method was called from bound click event');
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
        assert.isOk(step[method], `${method} has been bound`);
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

      assert.isOk(cancelCalled, 'cancel method from tour called');
      assert.isOk(eventTriggered, 'cancel event was triggered');
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

      assert.isOk(completeCalled, 'complete method from tour called');
      assert.isOk(eventTriggered, 'complete event was triggered');
    });
  });

  describe('destroy()', () => {
    it('triggers the destroy event', () => {
      const step = new Step();
      let eventTriggered = false;
      step.on('destroy', () => eventTriggered = true);
      step.destroy();

      assert.isOk(eventTriggered, 'destroy event was triggered');
    });
  });

  describe('hide()', () => {
    const step = new Step();
    let eventTriggered = false;

    before(() => {
      document.body.setAttribute('data-shepherd-step', 1);
    });

    it('triggers the before-hide event', () => {
      step.on('before-hide', () => eventTriggered = true);
      step.hide();

      assert.isOk(eventTriggered, 'before-hide event was triggered');
    });

    it('removes the data-shepherd-step attribute', () => {
      assert.isNotOk(document.body.hasAttribute('data-shepherd-step'), 'step attribute is removed');
    });
  });

  describe('parseAttachTo()', function(){
    it('fails if element does not exist', function(){
      const step = new Step({}, {
        attachTo: { element: '.scroll-test', on: 'center' }
      });

      const { element } = step.parseAttachTo();
      assert.notOk(element);
    });
  });

  describe('setupElements()', () => {
    it('calls destroy on the step if the content element is already set', () => {
      const step = new Step();
      let destroyCalled = false;
      step.el = document.createElement('a');
      step.destroy = () => destroyCalled = true;
      step.setupElements();
      assert.isOk(destroyCalled, 'setupElements method called destroy with element set');
    });

    it('calls destroy on the tooltip if it already exists', () => {
      const step = new Step();
      let destroyCalled = false;
      step.tooltip = {
        destroy() { destroyCalled = true; }
      };
      step.setupElements();
      assert.equal(destroyCalled, true, 'setupElements method called destroy on the existing tooltip');
    });

    it('calls bindAdvance() if advanceOn passed', () => {
      const step = new Step({
        next: () =>  true
      }, {
          advanceOn: '.click-test test'
      });
      const bindFunction = spy(step, 'bindAdvance');
      step.setupElements();

      assert.ok(bindFunction.called);
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
      assert.isOk(handlerCalled);
    });

    it('calls the custom handler', () => {
      let handlerAdded = false;
      const step = new Step('test', {
        scrollToHandler: () => handlerAdded = true
      });

      step.scrollTo();
      assert.isOk(handlerAdded);
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
      assert.isOk(whenCalled);
    });
  });

  describe('getTour()', () => {
    it('returns the tour value', () => {
      const step = new Step(new Shepherd.Tour());

      assert.isOk(step.getTour() instanceof Shepherd.Tour);
    });

  });

  describe('_addContent()', () => {
    it('adds plain text to the content', () => {
      const content = document.createElement('div');
      const step = new Step();
      step.options.text = 'I am some test text.';

      step._addContent(content);

      assert.equal(step.options.text, content.querySelector('.shepherd-text p').innerHTML);
    });

    it('maps mutiple strings to paragraphs', () => {
      const content = document.createElement('div');
      const step = new Step();
      step.options.text = ['I am some test text.', 'I am even more test text.'];

      step._addContent(content);
      assert.equal(content.querySelectorAll('.shepherd-text p').length, 2);
      assert.equal(step.options.text.join(' '),
      Array.from(content.querySelectorAll('.shepherd-text p')).map((text) => text.innerHTML).join(' '));
    });

    it('applies HTML element directly to content', () => {
      const content = document.createElement('div');
      const text = document.createElement('p');
      const step = new Step();
      text.innerHTML = 'I am some test text.';
      step.options.text = text;

      step._addContent(content);

      assert.equal('I am some test text.', content.querySelector('.shepherd-text p').innerHTML);
    });

    it('applies the text from a function', () => {
      const content = document.createElement('div');
      const step = new Step();
      step.options.text = () => 'I am some test text.';

      step._addContent(content);

      assert.isOk(typeof step.options.text === 'function');
      assert.equal('I am some test text.', content.querySelector('.shepherd-text p').innerHTML);
    });
  });

  describe('_addButtons', () => {
    it('renders no buttons if an empty array is passed to `options.buttons`', () => {
      const content = document.createElement('div');
      const step = new Step();

      step.options.buttons = [];

      step._addButtons(content);

      assert.equal(content.children.length, 0);
    });

    it('renders no buttons if nothing is passed to `options.buttons`', () => {
      const content = document.createElement('div');
      const step = new Step();

      step._addButtons(content);

      assert.equal(content.children.length, 0);
    });

    it('renders buttons for each item passed to `options.buttons`', () => {
      const content = document.createElement('div');
      const step = new Step();

      step.options.buttons = [
        defaultButtons.cancel,
        defaultButtons.next,
      ];

      step._addButtons(content);

      assert.equal(content.children.length, 1);

      const buttonContainer = content.querySelector('.shepherd-buttons');

      assert.equal(buttonContainer instanceof HTMLElement, true);

      const buttons = buttonContainer.querySelectorAll('.shepherd-button');

      assert.equal(buttons.length, 2);
    });
  });
});
