import Shepherd from '../../src/js/shepherd';
import { Step } from '../../src/js/step';
import { Tour } from '../../src/js/tour';

// since importing non UMD, needs assignment
window.Shepherd = Shepherd;

const DEFAULT_STEP_CLASS = 'shepherd-step-tooltip';

describe('Tour | Step', () => {
  let tour;

  const showOn = () => {
    return true;
  };

  const when = {
    show() {}
  };

  beforeEach(() => {
    tour = new Tour();
  });

  describe('Shepherd.Step()', () => {
    const instance = new Shepherd.Tour({
      defaultStepOptions: {
        classes: DEFAULT_STEP_CLASS,
        scrollTo: true,
        popperOptions: {
          modifiers: [{ name: 'offset', options: { offset: [0, 32] } }]
        },
        showOn,
        when
      }
    });

    const testStep = instance.addStep({
      attachTo: { element: 'body', on: 'top' },
      highlightClass: 'highlight',
      text: 'This is a step for testing',
      buttons: [
        {
          text: 'Next',
          action: instance.next
        }
      ],
      id: 'test',
      popperOptions: {
        modifiers: [{ name: 'foo', options: 'bar' }]
      }
    });

    const showTestStep = instance.addStep({
      buttons: [],
      id: 'test2',
      text: 'Another Step'
    });

    // Add more steps for total _setupButtons coverage
    instance.addStep({
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
      attachTo: { element: 'body' },
      highlightClass: 'highlight',
      text: 'This is a step without a name, and without an id',
      buttons: [
        {
          text: 'Next',
          action: instance.next
        }
      ],
      popperOptions: {
        modifiers: [{ name: 'offset', options: { offset: [0, 0] } }]
      }
    });

    const beforeShowPromise = new Promise((resolve) => {
      return setTimeout(1000, resolve('beforeShowPromise worked!'));
    });

    const beforeShowPromiseTestStep = instance.addStep({
      text: 'Before Show Promise Step',
      id: 'test3',
      beforeShowPromise() {
        return beforeShowPromise;
      }
    });

    afterEach(() => {
      instance.complete();
    });

    it('has all the correct properties', () => {
      const values = [
        'arrow',
        'classes',
        'scrollTo',
        'popperOptions',
        'showOn',
        'when',
        'attachTo',
        'highlightClass',
        'text',
        'buttons',
        'id'
      ];
      expect(values).toEqual(Object.keys(testStep.options));

      expect(testStep.id, 'passed name set as id').toBe('test');
      expect(stepWithoutNameWithId.id, 'no name, id passed is set').toBe(
        'no-name'
      );
      expect(
        stepWithoutNameWithoutId.id,
        'id is generated when no name or id passed'
      ).toMatch(
        /^step-[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
      );
    });

    it('deep clones defaultStepOptions and copies functions', () => {
      expect(testStep.options).toEqual({
        arrow: true,
        attachTo: { element: 'body', on: 'top' },
        buttons: [
          {
            text: 'Next',
            action: instance.next
          }
        ],
        classes: DEFAULT_STEP_CLASS,
        highlightClass: 'highlight',
        id: 'test',
        scrollTo: true,
        text: 'This is a step for testing',
        popperOptions: {
          modifiers: [{ name: 'foo', options: 'bar' }]
        },
        showOn,
        when
      });
    });

    it('allows the step to override a previously defined modifier', () => {
      stepWithoutNameWithoutId.show();
      const offsetValues = stepWithoutNameWithoutId.options.popperOptions.modifiers.reduce(
        (prev, next) => {
          if (next.name === 'offset') {
            return `${next.options.offset}`;
          }

          return '';
        },
        ''
      );

      expect(offsetValues).toBe('0,0');
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
          expect(result, 'beforeShowPromise is called').toBe(
            'beforeShowPromise worked!'
          );
        });
      });

      it('shows step evoking method, regardless of order', () => {
        showTestStep.show();

        expect(
          document.querySelector('[data-shepherd-step-id=test2]')
        ).toBeInTheDocument();
      });
    });
  });

  describe('cancel()', () => {
    it('triggers the cancel event and tour method', () => {
      let cancelCalled = false;
      let eventTriggered = false;
      const step = new Step(
        {
          cancel() {
            cancelCalled = true;
          }
        },
        {}
      );
      step.on('cancel', () => (eventTriggered = true));
      step.cancel();

      expect(cancelCalled, 'cancel method from tour called').toBeTruthy();
      expect(eventTriggered, 'cancel event was triggered').toBeTruthy();
    });
  });

  describe('complete()', () => {
    it('triggers the complete event and tour method', () => {
      let completeCalled = false;
      let eventTriggered = false;
      const step = new Step(
        {
          complete() {
            completeCalled = true;
          }
        },
        {}
      );
      step.on('complete', () => (eventTriggered = true));
      step.complete();

      expect(completeCalled, 'complete method from tour called').toBeTruthy();
      expect(eventTriggered, 'complete event was triggered').toBeTruthy();
    });
  });

  describe('destroy()', () => {
    it('triggers the destroy event', () => {
      const step = new Step(tour, {});
      let eventTriggered = false;
      step.on('destroy', () => (eventTriggered = true));
      step.destroy();

      expect(eventTriggered, 'destroy event was triggered').toBeTruthy();
    });
  });

  describe('hide()', () => {
    let beforeHideTriggered = false;
    let modalHideCalled = false;
    const step = new Step(
      {
        modal: {
          hide() {
            modalHideCalled = true;
          }
        }
      },
      {}
    );

    it('triggers the before-hide event', () => {
      step.on('before-hide', () => (beforeHideTriggered = true));
      step.hide();

      expect(
        beforeHideTriggered,
        'before-hide event was triggered'
      ).toBeTruthy();
    });

    it('calls tour.modal.hide', () => {
      expect(modalHideCalled, 'tour.modal.hide called').toBeTruthy();
    });
  });

  describe('updateStepOptions', () => {
    let step;

    beforeEach(() => {
      step = new Step(tour, {
        id: 'test-id',
        attachTo: { element: 'body', on: 'top' },
        text: 'Lorem Ipsum',
        classes: 'classes-test',
        title: 'Test',
        scrollTo: false,
        buttons: [
          { text: 'button one', disabled: false, classes: 'button1' },
          { text: 'button two', disabled: true, classes: 'button2' }
        ]
      });
      step.show();
    });

    afterEach(() => {
      step.destroy();
    });

    it('should update passed in properties', async() => {
      step.updateStepOptions({ text: 'updated', title: 'New title' });

      expect(step.options.text).toBe('updated');
      expect(step.options.title).toBe('New title');

      await requestAnimationFrame(
        () =>
          new Promise((resolve) => {
            return resolve();
          })
      );

      expect(document.querySelector('.shepherd-text').textContent).toBe(
        'updated'
      );
      expect(document.querySelector('.shepherd-title').textContent).toBe(
        'New title'
      );
    });

    it('should not affect other properties', async() => {
      step.updateStepOptions({ text: 'updated', title: 'New title' });
      expect(step.options.id).toEqual('test-id');
      expect(step.options.buttons).toEqual([
        { text: 'button one', disabled: false, classes: 'button1' },
        { text: 'button two', disabled: true, classes: 'button2' }
      ]);

      await requestAnimationFrame(
        () =>
          new Promise((resolve) => {
            return resolve();
          })
      );

      expect(document.querySelector('.button1').textContent).toBe('button one');
      expect(document.querySelector('.button2').textContent).toBe('button two');
    });

    it('should update buttons', async() => {
      const buttons = [
        { text: 'button one updated', disabled: true, classes: 'button1' },
        { text: 'button two updated', disabled: false, classes: 'button2' }
      ];

      step.updateStepOptions({ buttons });
      expect(step.options.buttons).toEqual(buttons);

      await requestAnimationFrame(
        () =>
          new Promise((resolve) => {
            return resolve();
          })
      );

      const buttonOne = document.querySelector('.button1');
      expect(buttonOne.textContent).toBe('button one updated');
      expect(buttonOne.disabled).toBe(true);

      const buttonTwo = document.querySelector('.button2');
      expect(buttonTwo.textContent).toBe('button two updated');
      expect(buttonTwo.disabled).toBe(false);
    });

    it('removing title should remove class', async() => {
      step.updateStepOptions({ title: '' });
      expect(step.options.title).toEqual('');

      await requestAnimationFrame(
        () =>
          new Promise((resolve) => {
            return resolve();
          })
      );

      const element = document.querySelector('.shepherd-element');
      expect(element.classList.contains('shepherd-has-title')).toBeFalsy();
    });

    it('updating classes should update element classes', async() => {
      step.updateStepOptions({ classes: 'test-1 test-2' });
      expect(step.options.classes).toEqual('test-1 test-2');

      await requestAnimationFrame(
        () =>
          new Promise((resolve) => {
            return resolve();
          })
      );

      const element = document.querySelector('.shepherd-element');
      expect(element.classList.contains('test-1')).toBeTruthy();
      expect(element.classList.contains('test-2')).toBeTruthy();
      expect(element.classList.contains('classes-test')).toBeFalsy();
    });
  });

  describe('_setupElements()', () => {
    it('calls destroy on the step if the content element is already set', () => {
      const step = new Step(tour, {});
      let destroyCalled = false;
      step.el = document.createElement('a');
      step.destroy = () => (destroyCalled = true);
      step._setupElements();
      expect(
        destroyCalled,
        '_setupElements method called destroy with element set'
      ).toBeTruthy();
    });

    it('calls destroy on the tooltip if it already exists', () => {
      const step = new Step(tour, {});
      let destroyCalled = false;
      step.tooltip = {
        destroy() {
          destroyCalled = true;
        }
      };
      step._setupElements();
      expect(
        destroyCalled,
        '_setupElements method called destroy on the existing tooltip'
      ).toBe(true);
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
      div.scrollIntoView = () => (handlerCalled = true);

      step._scrollTo();
      expect(handlerCalled).toBeTruthy();
    });

    it('calls the custom handler', () => {
      let handlerAdded = false;
      const step = new Step('test', {
        scrollToHandler: () => (handlerAdded = true)
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
          destroy: () => (whenCalled = true)
        }
      });

      step.destroy();
      expect(whenCalled).toBeTruthy();
    });
  });

  describe('getTour()', () => {
    it('returns the tour value', () => {
      const step = new Step(new Shepherd.Tour(), {});

      expect(step.getTour() instanceof Shepherd.Tour).toBeTruthy();
    });
  });

  describe('_createTooltipContent', () => {
    it('ARIA attributes set', () => {
      const step = new Step(tour, {
        id: 'test-step',
        text: 'Lorem Ipsum',
        title: 'Test'
      });

      const element = step._createTooltipContent();

      expect(element.getAttribute('aria-labelledby')).toBe('test-step-label');
      expect(element.querySelector('.shepherd-title').id).toBe(
        'test-step-label'
      );

      expect(element.getAttribute('aria-describedby')).toBe(
        'test-step-description'
      );
      expect(element.querySelector('.shepherd-text').id).toBe(
        'test-step-description'
      );
    });
  });
});
