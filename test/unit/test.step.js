import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { assert } = chai;
import Shepherd from '../../src/js/shepherd.js';
import { Step } from '../../src/js/step.js';
// since importing non UMD, needs assignment
window.Shepherd = Shepherd;

describe('Step', () => {
  describe('Shepherd.Step()', () => {
    const instance = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-arrows',
        scrollTo: true
      }
    });

    const testStep = instance.addStep('test', {
      id: 'test',
      text: 'This is a step for testing',
      classes: 'example-step-extra-class',
      buttons: [
        {
          text: 'Next',
          action: instance.next
        }
      ]
    });

    const showTestStep = instance.addStep('test2', {
      id: 'test2',
      text: 'Another Step'
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

    after(() => {
      instance.cancel();
    });


    it('has all the correct properties', () => {
      const values = ['classes', 'scrollTo', 'id', 'text', 'buttons'];
      assert.deepEqual(values, Object.keys(testStep.options));
    });

    describe('.hide()', () => {
      it('shows step evoking method, regardless of order', () => {
        instance.start();
        testStep.hide();

        assert.notEqual(document.querySelector('[data-id=test]').getAttribute('hidden'), null);
      });
    });

    describe('.show()', () => {
      it('beforeShowPromise called before `show`', () => {
        assert.eventually.equal(beforeShowPromise, 'beforeShowPromise worked!', 'beforeShowPromise is called');
        beforeShowPromiseTestStep.show();
      });

      it('shows step evoking method, regardless of order', () => {
        showTestStep.show();

        assert.equal(document.querySelector('[data-id=test2]').dataset.id, 'test2');
      });
    });
  });

  describe('bindAdvance()', () => {
    it('should trigger the advanceOn option via string', () => {
      const el = document.createElement('div');
      const event = new Event('test');
      const link = document.createElement('a');
      let advanced = false;
      link.classList.add('click-test');
      document.body.appendChild(link);

      const step = new Step({
        next: () => advanced = true
      }, {
        advanceOn: '.click-test test'
      });
      step.el = el;
      step.el.hidden = false;

      step.bindAdvance();
      link.dispatchEvent(event);

      assert.isOk(link.classList.contains('click-test'));
      assert.isOk(advanced);
    });

    it('should trigger the advanceOn option via object', () => {
      const el = document.createElement('div');
      const event = new Event('test');
      const link = document.createElement('a');
      let advanced = false;
      link.classList.add('object-test');
      document.body.appendChild(link);

      const step = new Step({
        next: () => advanced = true
      }, {
        advanceOn: { selector: '.object-test', event: 'test' }
      });
      step.el = el;
      step.el.hidden = false;

      step.bindAdvance();
      link.dispatchEvent(event);

      assert.isOk(link.classList.contains('object-test'));
      assert.isOk(advanced, 'next triggered for advanceOn');
    });

    it('should capture events attached to no selector', () => {
      const event = new Event('test');
      let advanced = false;

      const step = new Step({
        next: () => advanced = true
      }, {
        advanceOn: { event: 'test' }
      });

      step.el = document.body;
      step.el.hidden = false;

      step.bindAdvance();
      document.body.dispatchEvent(event);

      assert.isOk(advanced, 'next triggered for advanceOn');
    });
  });

  describe('bindButtonEvents()', () => {
    const link = document.createElement('a');
    const step = new Step();
    it('adds button events', () => {
      const event = new Event('test');
      let eventTriggered = false;

      step.bindButtonEvents({
        events: {
          test: () => eventTriggered = true
        },
        text: 'Next',
        action: () => {}
      }, link);

      link.dispatchEvent(event);
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
        'show',
        'hide',
        'isOpen',
        'cancel',
        'complete',
        'scrollTo',
        'destroy',
        'render'
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

  describe('render()', () => {
    it('calls destroy if element is already set', () => {
      const step = new Step();
      let destroyCalled = false;
      step.el = document.createElement('a');
      step.destroy = () => destroyCalled = true;
      step.render();
      assert.isOk(destroyCalled, 'render method called destroy with element set');
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
    it('calls the function passed in the when option', () => {
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

  describe('_attach()', () => {
    it('uses a passed renderLocation as string', () => {
      const element = document.createElement('div');
      const testElement = document.createElement('div');
      element.classList.add('string-element');
      testElement.classList.add('test-element');
      document.body.appendChild(element);

      const step = new Step('test', {
        renderLocation: '.string-element'
      });

      step._attach(testElement);
      assert.isOk(element.querySelector('.test-element'));
    });

    it('uses a passed renderLocation as an HTML element', () => {
      const element = document.createElement('div');
      const renderLocation = document.createElement('div');
      element.classList.add('html-element');
      renderLocation.classList.add('render-element');
      document.body.appendChild(renderLocation);

      const step = new Step('test', {
        renderLocation
      });

      step._attach(element);
      assert.isOk(renderLocation.querySelector('.html-element'));
    });
  });
});
