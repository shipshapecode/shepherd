/* global describe,it */
import { assert } from 'chai';
import Shepherd from '../src/js/shepherd';
import { Step } from '../src/js/step';
// since importing non UMD, needs assignment
window.Shepherd = Shepherd;

describe('Step', function() {
  describe('Shepherd.Step()', function(){
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

    after(function(){
      instance.cancel();
    });


    it('has all the correct properties', function() {
      const values = ['classes', 'scrollTo', 'id', 'text', 'buttons'];
      assert.deepEqual(values, Object.keys(testStep.options));
    });

    describe('.hide()', function() {
      it('shows step evoking method, regardless of order', function() {
        instance.start();
        testStep.hide();

        assert.notEqual(document.querySelector('[data-id=test]').getAttribute('hidden'), null);
      });
    });

    describe('.show()', function() {
      it('shows step evoking method, regardless of order', function() {
        showTestStep.show();

        assert.equal(document.querySelector('[data-id=test2]').dataset.id, 'test2');
      });
    });
  });

  describe('bindMethods()', function(){
    it('binds the expected methods', function(){
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
        assert.ok(step[method], `${method} has been bound`);
      });
    });
  });

  describe('bindAdvance()', function(){
    it('should trigger the advanceOn option via string', function(){
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

      assert.ok(link.classList.contains('click-test'));
      assert.ok(advanced);
    });

    it('should trigger the advanceOn option via object', function(){
      const el = document.createElement('div');
      const event = new Event('test');
      const link = document.createElement('a');
      let advanced = false;
      link.classList.add('object-test');
      document.body.appendChild(link);

      const step = new Step({
        next: () => advanced = true
      }, {
        advanceOn: {selector: '.object-test', event: 'test'}
      });
      step.el = el;
      step.el.hidden = false;

      step.bindAdvance();
      link.dispatchEvent(event);

      assert.ok(link.classList.contains('object-test'));
      assert.ok(advanced);
    });

    it('should capture events attached to no selector', function(){
      const event = new Event('test');
      let advanced = false;

      const step = new Step({
        next: () => advanced = true
      }, {
        advanceOn: {event: 'test'}
      });

      step.el = document.body;
      step.el.hidden = false;

      step.bindAdvance();
      document.body.dispatchEvent(event);

      assert.ok(advanced);
    });


  });


  describe('bindButtonEvents()', function(){
    const link = document.createElement('a');
    const step = new Step();
    it('adds button events', function(){
      const event = new Event('test');
      let eventTriggered = false;

      step.bindButtonEvents({
        events: {
          test: () => eventTriggered = true
        },
        text: 'Next',
        action: () => {}
      }, link)

      link.dispatchEvent(event);
      assert.ok(eventTriggered, 'custom button event was bound/triggered');
    });

    it('removes events once destroyed', function(){
      step.destroy();

      assert.notOk(link.hasAttribute('data-button-event'), 'attribute to confirm event is removed');
    });

  });

  describe('bindCancelLink()', function(){
    it('adds an event handler for the cancel button', function(){
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
      assert.ok(cancelCalled, 'cancel method was called from bound click event');
    });
  });

  describe('render()', function(){
    it('calls destroy if element is already set', function(){
      const step = new Step();
      let destroyCalled = false;
      step.el = document.createElement('a');
      step.destroy = () => destroyCalled = true;
      step.render();
      assert.ok(destroyCalled, 'render method called destroy with element set');
    });

  });

  describe('cancel()', function(){
    it('triggers the cancel event and tour method', function(){
      let cancelCalled = false;
      let eventTriggered = false;
      const step = new Step({
        cancel() {
          cancelCalled = true;
        }
      });
      step.on('cancel', () => eventTriggered = true );
      step.cancel();

      assert.ok(cancelCalled, 'cancel method from tour called');
      assert.ok(eventTriggered, 'cancel event was triggered');
    });
  });

  describe('complete()', function(){
    it('triggers the complete event and tour method', function(){
      let completeCalled = false;
      let eventTriggered = false;
      const step = new Step({
        complete() {
          completeCalled = true;
        }
      });
      step.on('complete', () => eventTriggered = true );
      step.complete();

      assert.ok(completeCalled, 'complete method from tour called');
      assert.ok(eventTriggered, 'complete event was triggered');
    });
  });

  describe('destroy()', function(){
    it('triggers the destroy event', function(){
      const step = new Step();
      let eventTriggered = false;
      step.on('destroy', () => eventTriggered = true );
      step.destroy();

      assert.ok(eventTriggered, 'destroy event was triggered');
    });
  });

  describe('hide()', function(){
    const step = new Step();
    let eventTriggered = false;

    before(function(){
      document.body.setAttribute('data-shepherd-step', 1);
    });

    it('triggers the before-hide event', function(){
      step.on('before-hide', () => eventTriggered = true );
      step.hide();

      assert.ok(eventTriggered, 'before-hide event was triggered');
    });

    it('removes the data-shepherd-step attribute', function(){
      assert.notOk(document.body.hasAttribute('data-shepherd-step'), 'step attribute is removed');
    });
  });

  describe('scrollTo()', function(){
    it('calls the scroll native method', function(){
      const div = document.createElement('div');
      let handlerCalled = false;
      div.classList.add('scroll-test');
      document.body.appendChild(div);
      const step = new Step('test', {
        attachTo: { element: '.scroll-test', on: 'center' }
      });
      div.scrollIntoView = () => handlerCalled = true;

      step.scrollTo();
      assert.ok(handlerCalled);
    });

    it('calls the custom handler', function(){
      let handlerAdded = false;
      const step = new Step('test', {
        scrollToHandler: () => handlerAdded = true
      });

      step.scrollTo();
      assert.ok(handlerAdded);
    });
  });


  describe('setOptions()', function(){
    it('calls the function passed in the when option', function(){
      let whenCalled = false;
      const step = new Step('test', {
        when: {
          destroy: () => whenCalled = true
        }
      });

      step.destroy();
      assert.ok(whenCalled);
    });

  });

  describe('getTour()', function(){
    it('returns the tour value', function(){
      const step = new Step(new Shepherd.Tour());

      assert.ok(step.getTour() instanceof Shepherd.Tour);
    });

  });

  describe('_addContent()', function(){
    it('adds plain text to the content', function(){
      const content = document.createElement('div');
      const step = new Step();
      step.options.text = 'I am some test text.';

      step._addContent(content);

      assert.equal(step.options.text, content.querySelector('.shepherd-text p').innerHTML);
    });

    it('maps mutiple strings to paragraphs', function(){
      const content = document.createElement('div');
      const step = new Step();
      step.options.text = ['I am some test text.', 'I am even more test text.'];

      step._addContent(content);
      assert.equal(content.querySelectorAll('.shepherd-text p').length, 2);
      assert.equal(step.options.text.join(' '),
        Array.from(content.querySelectorAll('.shepherd-text p')).map((text) => text.innerHTML ).join(' '));
    });

    it('applies HTML element directly to content', function(){
      const content = document.createElement('div');
      const text = document.createElement('p');
      const step = new Step();
      text.innerHTML = 'I am some test text.';
      step.options.text = text;

      step._addContent(content);

      assert.equal('I am some test text.', content.querySelector('.shepherd-text p').innerHTML);
    });

    it('applies the text from a function', function(){
      const content = document.createElement('div');
      const step = new Step();
      step.options.text = () => 'I am some test text.';

      step._addContent(content);

      assert.ok(typeof step.options.text === 'function');
      assert.equal('I am some test text.', content.querySelector('.shepherd-text p').innerHTML);
    });
  });

  describe('_attach()', function(){
    it('uses a passed renderLocation as string', function(){
      const element = document.createElement('div');
      const testElement = document.createElement('div');
      element.classList.add('string-element');
      testElement.classList.add('test-element');
      document.body.appendChild(element);

      const step = new Step('test', {
        renderLocation: '.string-element'
      });

      step._attach(testElement);
      assert.ok(element.querySelector('.test-element'));
    });

    it('uses a passed renderLocation as an HTML element', function(){
      const element = document.createElement('div');
      const renderLocation = document.createElement('div');
      element.classList.add('html-element');
      renderLocation.classList.add('render-element');
      document.body.appendChild(renderLocation);

      const step = new Step('test', {
        renderLocation
      });

      step._attach(element);
      assert.ok(renderLocation.querySelector('.html-element'));
    });

  });


});
