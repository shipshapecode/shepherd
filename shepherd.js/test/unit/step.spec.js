import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Shepherd from '../../src/shepherd';
import { Step } from '../../src/step';
import { Tour } from '../../src/tour';
import ResizeObserver from 'resize-observer-polyfill';
import { offset } from '@floating-ui/dom';

// since importing non UMD, needs assignment
window.Shepherd = Shepherd;
window.ResizeObserver = ResizeObserver;

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
    const defaultOffsetMiddleware = offset({ mainAxis: 0, crossAxis: 32 });
    const fooMiddleware = { name: 'foo', options: 'bar', fn: (args) => args };

    const instance = new Shepherd.Tour({
      defaultStepOptions: {
        classes: DEFAULT_STEP_CLASS,
        scrollTo: true,
        floatingUIOptions: {
          middleware: [defaultOffsetMiddleware]
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
      floatingUIOptions: {
        middleware: [fooMiddleware]
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

    const stepWithoutNameWithoutIdOffsetMiddleware = offset({
      mainAxis: 0,
      crossAxis: -32
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
      floatingUIOptions: {
        middleware: [stepWithoutNameWithoutIdOffsetMiddleware]
      }
    });

    const beforeShowPromise = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          console.log('beforeShowPromise worked!');
          resolve('beforeShowPromise worked!');
        }, 1000);
      });

    const beforeShowPromiseTestStep = instance.addStep({
      text: 'Before Show Promise Step',
      id: 'test3',
      beforeShowPromise
    });

    afterEach(() => {
      instance.complete();
    });

    it('has all the correct properties', () => {
      const values = [
        'arrow',
        'classes',
        'scrollTo',
        'floatingUIOptions',
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
        floatingUIOptions: {
          middleware: [defaultOffsetMiddleware, fooMiddleware]
        },
        showOn,
        when
      });
    });

    it('allows the step to override a previously defined modifier', () => {
      stepWithoutNameWithoutId.show();
      const offsetMiddleware =
        stepWithoutNameWithoutId.options.floatingUIOptions.middleware.filter(
          ({ name }) => name === 'offset'
        );
      const offsetResult = offsetMiddleware.reduce(
        (agg, current) => {
          agg.mainAxis += current.options.mainAxis;
          agg.crossAxis += current.options.crossAxis;
          return agg;
        },
        { mainAxis: 0, crossAxis: 0 }
      );

      expect(offsetResult).toEqual({ mainAxis: 0, crossAxis: 0 });
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
        console.log = vi.fn();
        const promise = beforeShowPromiseTestStep.show();

        return promise.then(() => {
          expect(console.log).toHaveBeenCalledWith('beforeShowPromise worked!');
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

    it('should update passed in properties', async () => {
      step.updateStepOptions({ text: 'updated', title: 'New title' });

      expect(step.options.text).toBe('updated');
      expect(step.options.title).toBe('New title');

      await window.requestAnimationFrame(
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

    it('should not affect other properties', async () => {
      step.updateStepOptions({ text: 'updated', title: 'New title' });
      expect(step.options.id).toEqual('test-id');
      expect(step.options.buttons).toEqual([
        { text: 'button one', disabled: false, classes: 'button1' },
        { text: 'button two', disabled: true, classes: 'button2' }
      ]);

      await window.requestAnimationFrame(
        () =>
          new Promise((resolve) => {
            return resolve();
          })
      );

      expect(document.querySelector('.button1').textContent).toBe('button one');
      expect(document.querySelector('.button2').textContent).toBe('button two');
    });

    it('should update buttons', async () => {
      const buttons = [
        { text: 'button one updated', disabled: true, classes: 'button1' },
        { text: 'button two updated', disabled: false, classes: 'button2' }
      ];

      step.updateStepOptions({ buttons });
      expect(step.options.buttons).toEqual(buttons);

      await window.requestAnimationFrame(
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

    it('removing title should remove class', async () => {
      step.updateStepOptions({ title: '' });
      expect(step.options.title).toEqual('');

      await window.requestAnimationFrame(
        () =>
          new Promise((resolve) => {
            return resolve();
          })
      );

      const element = document.querySelector('.shepherd-element');
      expect(element.classList.contains('shepherd-has-title')).toBeFalsy();
    });

    it('updating classes should update element classes', async () => {
      step.updateStepOptions({ classes: 'test-1 test-2' });
      expect(step.options.classes).toEqual('test-1 test-2');

      await window.requestAnimationFrame(
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
    it('tears down the existing element without triggering `destroy`', () => {
      const step = new Step(tour, {});
      const teardownSpy = vi.spyOn(step, '_teardownElements');
      const destroySpy = vi.fn();
      step.on('destroy', destroySpy);
      step.el = document.createElement('a');

      step._setupElements();

      expect(
        teardownSpy,
        '_setupElements tore down the previously mounted element'
      ).toHaveBeenCalledTimes(1);
      expect(
        destroySpy,
        'recreating the element did not trigger the public `destroy` event'
      ).not.toHaveBeenCalled();
    });

    it('does not tear down again if the step was already destroyed', () => {
      const step = new Step(tour, {});
      step.el = document.createElement('a');
      step.destroy();

      const teardownSpy = vi.spyOn(step, '_teardownElements');
      step._setupElements();

      expect(
        teardownSpy,
        '_setupElements skipped teardown for an already destroyed step'
      ).not.toHaveBeenCalled();
    });

    it('calls destroy on the tooltip if it already exists', () => {
      const step = new Step(tour, {});
      let destroyCalled = false;
      step.el = document.createElement('a');
      step.cleanup = () => {
        destroyCalled = true;
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

    it('calls scroll native method after before-show promise resolution', () => {
      const resTester = document.createElement('div');
      let resHandlerCalled = false;
      resTester.classList.add('post-res-scroll-test');
      resTester.scrollIntoView = () => (resHandlerCalled = true);
      const resSpy = vi.spyOn(resTester, 'scrollIntoView');
      document.body.appendChild(resTester);

      const beforeShowPromise = new Promise((resolve) => {
        return setTimeout(() => resolve('beforeShowPromise worked!'), 1000);
      });

      const step = new Step('test', {
        attachTo: { element: '.post-res-scroll-test', on: 'center' },
        beforeShowPromise: () => {
          return beforeShowPromise;
        }
      });

      step.show();

      step._scrollTo();

      expect(resHandlerCalled).toBeTruthy();
      expect(resSpy).toHaveBeenCalled();
    });

    it('calls the custom handler after before-show promise resolution', () => {
      let resHandlerAdded = false;

      const beforeShowPromise = new Promise((resolve) => {
        return setTimeout(() => resolve('beforeShowPromise worked!'), 1000);
      });

      const step = new Step('test', {
        scrollToHandler: () => (resHandlerAdded = true),
        beforeShowPromise: () => {
          return beforeShowPromise;
        }
      });

      const resSpy = vi.spyOn(step.options, 'scrollToHandler');

      step.show();

      step._scrollTo();

      expect(resHandlerAdded).toBeTruthy();
      expect(resSpy).toHaveBeenCalled();
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

  describe('correct operation of classes on body element when step not attached to an element', () => {
    const offsetMiddleware = offset({ crossAxis: 32 });
    const defaultCallback = (args) => args;
    const instance = new Shepherd.Tour({
      defaultStepOptions: {
        classes: DEFAULT_STEP_CLASS,
        scrollTo: true,
        floatingUIOptions: {
          middleware: [offsetMiddleware]
        },
        showOn,
        when
      }
    });

    const stepWithoutAttachment = instance.addStep({
      highlightClass: 'highlight',
      text: 'This is a step for testing',
      buttons: [
        {
          text: 'Next',
          action: instance.next
        }
      ],
      id: 'test',
      floatingUIOptions: {
        middleware: [{ name: 'foo', options: 'bar', fn: defaultCallback }]
      }
    });

    afterEach(() => {
      instance.complete();
    });

    describe('.hide()', () => {
      it('detaches from the step target', () => {
        instance.start();

        const targetElem = document.body;

        expect(targetElem.classList.contains('shepherd-enabled')).toBe(true);

        stepWithoutAttachment.hide();

        expect(targetElem.classList.contains('shepherd-enabled')).toBe(false);
      });
    });

    describe('.destroy()', () => {
      it('detaches from the step target', () => {
        instance.start();

        const targetElem = document.body;

        expect(targetElem.classList.contains('shepherd-enabled')).toBe(true);

        stepWithoutAttachment.destroy();

        expect(targetElem.classList.contains('shepherd-enabled')).toBe(false);
      });
    });
  });

  /**
   * The click-blocking CSS rule keys solely on the unprefixed
   * `shepherd-target-click-disabled` class, because `classPrefix` prefixes the
   * sibling `shepherd-enabled`/`shepherd-target` classes at runtime and a
   * static stylesheet cannot know the prefix (#1298). These tests pin which
   * elements carry that class and when.
   *
   * They deliberately do not assert computed `pointer-events`: this suite runs
   * in happy-dom and never loads `shepherd.css`, so such an assertion would
   * pass vacuously. The cascade half of the fix — the `... *` descendant
   * clause and the 0-3-0 specificity — is pinned in
   * `test/cypress/integration/element-targeting.cy.js` against a fixture that
   * competes with both.
   */
  describe('canClickTarget with classPrefix', () => {
    const CLICK_DISABLED = 'shepherd-target-click-disabled';
    let instance, targetElem, extraElem;

    function buildTour(stepOptions) {
      instance = new Shepherd.Tour({ classPrefix: 'my-tour-' });
      instance.addStep({
        id: 'test',
        text: 'This is a step for testing',
        attachTo: { element: '.click-disabled-target', on: 'top' },
        ...stepOptions
      });
      return instance;
    }

    beforeEach(() => {
      targetElem = document.createElement('div');
      targetElem.classList.add('click-disabled-target');
      document.body.appendChild(targetElem);

      extraElem = document.createElement('div');
      extraElem.classList.add('click-disabled-extra');
      document.body.appendChild(extraElem);
    });

    afterEach(() => {
      instance?.complete();
      instance = null;
      targetElem.remove();
      extraElem.remove();
    });

    it('adds `shepherd-target-click-disabled` unprefixed, alongside the prefixed classes', () => {
      buildTour({ canClickTarget: false }).start();

      expect(targetElem.classList.contains(CLICK_DISABLED)).toBe(true);
      expect(targetElem.classList.contains('my-tour-shepherd-enabled')).toBe(
        true
      );
      expect(targetElem.classList.contains('my-tour-shepherd-target')).toBe(
        true
      );
    });

    it('removes all three classes on `hide()`', () => {
      buildTour({ canClickTarget: false }).start();
      instance.getCurrentStep().hide();

      expect(targetElem.classList.contains(CLICK_DISABLED)).toBe(false);
      expect(targetElem.classList.contains('my-tour-shepherd-enabled')).toBe(
        false
      );
      expect(targetElem.classList.contains('my-tour-shepherd-target')).toBe(
        false
      );
    });

    it('removes all three classes on `destroy()`', () => {
      buildTour({ canClickTarget: false }).start();
      instance.getCurrentStep().destroy();

      expect(targetElem.classList.contains(CLICK_DISABLED)).toBe(false);
      expect(targetElem.classList.contains('my-tour-shepherd-enabled')).toBe(
        false
      );
      expect(targetElem.classList.contains('my-tour-shepherd-target')).toBe(
        false
      );
    });

    // The class now carries the whole meaning of the CSS rule, so it must not
    // appear on targets that never opted in: any element wearing it is
    // unclickable.
    it('does not add `shepherd-target-click-disabled` when `canClickTarget` is unset', () => {
      buildTour({}).start();

      expect(targetElem.classList.contains('my-tour-shepherd-target')).toBe(
        true
      );
      expect(targetElem.classList.contains(CLICK_DISABLED)).toBe(false);
    });

    it('does not add `shepherd-target-click-disabled` when `canClickTarget` is true', () => {
      buildTour({ canClickTarget: true }).start();

      expect(targetElem.classList.contains('my-tour-shepherd-target')).toBe(
        true
      );
      expect(targetElem.classList.contains(CLICK_DISABLED)).toBe(false);
    });

    it('adds `shepherd-target-click-disabled` to `extraHighlights` elements too', () => {
      buildTour({
        canClickTarget: false,
        extraHighlights: ['.click-disabled-extra']
      }).start();

      expect(extraElem.classList.contains(CLICK_DISABLED)).toBe(true);
      expect(extraElem.classList.contains('my-tour-shepherd-target')).toBe(
        true
      );
    });

    it('does not add `shepherd-target-click-disabled` to `extraHighlights` elements when `canClickTarget` is unset', () => {
      buildTour({ extraHighlights: ['.click-disabled-extra'] }).start();

      expect(extraElem.classList.contains('my-tour-shepherd-target')).toBe(
        true
      );
      expect(extraElem.classList.contains(CLICK_DISABLED)).toBe(false);
    });

    it('removes `shepherd-target-click-disabled` from `extraHighlights` elements on `hide()`', () => {
      buildTour({
        canClickTarget: false,
        extraHighlights: ['.click-disabled-extra']
      }).start();
      expect(extraElem.classList.contains(CLICK_DISABLED)).toBe(true);

      instance.getCurrentStep().hide();

      expect(extraElem.classList.contains(CLICK_DISABLED)).toBe(false);
      expect(extraElem.classList.contains('my-tour-shepherd-target')).toBe(
        false
      );
    });

    it('removes `shepherd-target-click-disabled` from `extraHighlights` elements when the tour completes', () => {
      buildTour({
        canClickTarget: false,
        extraHighlights: ['.click-disabled-extra']
      }).start();
      expect(extraElem.classList.contains(CLICK_DISABLED)).toBe(true);

      instance.complete();
      instance = null;

      expect(extraElem.classList.contains(CLICK_DISABLED)).toBe(false);
      expect(targetElem.classList.contains(CLICK_DISABLED)).toBe(false);
    });
  });

  describe('lazy attachTo evaluation', () => {
    // We test this using attachTo.element callback.
    // Note that lazy evaluation largely relies on `parseAttachTo`, however this does
    // not it's implementation, only if the callback is called lazily.
    it('lazily evaluates attachTo.element callback', () => {
      const step1AttachToCallback = vi.fn();
      const step2AttachToCallback = vi.fn();

      const instance = new Shepherd.Tour({
        steps: [
          {
            text: 'step 1',
            attachTo: { element: step1AttachToCallback, on: 'auto' }
          },
          {
            text: 'step 2',
            attachTo: { element: step2AttachToCallback, on: 'auto' }
          }
        ]
      });

      instance.start();

      expect(step1AttachToCallback).toHaveBeenCalled();
      expect(step2AttachToCallback).not.toHaveBeenCalled();

      instance.next();

      expect(step2AttachToCallback).toHaveBeenCalled();
      expect(step1AttachToCallback).toHaveBeenCalledTimes(1);
      expect(step2AttachToCallback).toHaveBeenCalledTimes(1);
    });

    it('lazily evaluates attachTo.element selector', () => {
      const querySelectorSpy = vi.spyOn(document, 'querySelector');

      const instance = new Shepherd.Tour({
        steps: [
          {
            text: 'step 1',
            attachTo: { element: '#step-1-attach-to-element', on: 'auto' }
          },
          {
            text: 'step 2',
            attachTo: { element: '#step-2-attach-to-element', on: 'auto' }
          }
        ]
      });

      instance.start();
      expect(querySelectorSpy).toHaveBeenCalledWith(
        '#step-1-attach-to-element'
      );
      expect(querySelectorSpy).not.toHaveBeenCalledWith(
        '#step-2-attach-to-element'
      );
      instance.next();
      expect(querySelectorSpy).toHaveBeenCalledWith(
        '#step-2-attach-to-element'
      );
    });

    it('evaluates attachTo on subsequent shows', () => {
      const step1AttachToCallback = vi.fn();
      const step2AttachToCallback = vi.fn();

      const instance = new Shepherd.Tour({
        steps: [
          {
            text: 'step 1',
            attachTo: { element: step1AttachToCallback, on: 'auto' }
          },
          {
            text: 'step 2',
            attachTo: { element: step2AttachToCallback, on: 'auto' }
          }
        ]
      });

      instance.start();
      expect(step1AttachToCallback).toHaveBeenCalledTimes(1);
      instance.next();
      instance.back();
      expect(step1AttachToCallback).toHaveBeenCalledTimes(2);
    });

    it('evaluates attachTo only once', () => {
      const instance = new Shepherd.Tour({
        steps: [
          {
            text: 'step 1',
            attachTo: { element: () => {}, on: 'auto' },
            id: 'step1'
          },
          {
            text: 'step 2',
            attachTo: { element: () => {}, on: 'auto' }
          }
        ]
      });

      instance.start();

      expect(instance.getCurrentStep().isOpen()).toBe(true);
      // Subsequent calls to the getter return the same object
      const result1 = instance.getCurrentStep()._getResolvedAttachToOptions();

      expect(result1).not.toBeNull();

      instance.next();

      const result2 = instance.getById('step1')._getResolvedAttachToOptions();

      expect(result1).toEqual(result2);
    });

    it('can evaluate _getResolvedAttachToOptions before step before-show phase', () => {
      const instance = new Shepherd.Tour({
        steps: [
          {
            text: 'step 1',
            attachTo: { element: () => {}, on: 'auto' }
          },
          {
            text: 'step 2',
            attachTo: { element: () => {}, on: 'auto' },
            id: 'step2'
          }
        ]
      });

      instance.start();

      expect(instance.getById('step2')._getResolvedAttachToOptions()).toEqual({
        element: undefined,
        on: 'auto'
      });
    });
  });

  describe('tabIndex preservation', () => {
    let instance;
    let testElement;

    beforeEach(() => {
      // Create a test element
      testElement = document.createElement('div');
      testElement.id = 'tabindex-test-element';
      document.body.appendChild(testElement);

      instance = new Shepherd.Tour({
        steps: [
          {
            id: 'test-step',
            text: 'Test step',
            attachTo: { element: '#tabindex-test-element', on: 'top' }
          }
        ]
      });
    });

    afterEach(() => {
      instance.complete();
      testElement?.remove();
    });

    it('stores and restores original tabIndex when element has no tabindex attribute', () => {
      // Initially, the element should have no tabindex attribute
      expect(testElement.hasAttribute('tabindex')).toBe(false);

      // Start the tour
      instance.start();

      // During the tour, tabIndex should be set to 0
      expect(testElement.tabIndex).toBe(0);
      expect(testElement.getAttribute('tabindex')).toBe('0');

      // Hide the step
      instance.getCurrentStep().hide();

      // After hiding, the tabindex attribute should be removed
      expect(testElement.hasAttribute('tabindex')).toBe(false);
    });

    it('stores and restores original tabIndex when element has tabindex="-1"', () => {
      // Set tabindex to -1 initially
      testElement.setAttribute('tabindex', '-1');
      expect(testElement.getAttribute('tabindex')).toBe('-1');

      // Start the tour
      instance.start();

      // During the tour, tabIndex should be set to 0
      expect(testElement.tabIndex).toBe(0);
      expect(testElement.getAttribute('tabindex')).toBe('0');

      // Hide the step
      instance.getCurrentStep().hide();

      // After hiding, tabIndex should be restored to -1
      expect(testElement.getAttribute('tabindex')).toBe('-1');
    });

    it('stores and restores original tabIndex when element has tabindex="5"', () => {
      // Set tabindex to 5 initially
      testElement.setAttribute('tabindex', '5');
      expect(testElement.getAttribute('tabindex')).toBe('5');

      // Start the tour
      instance.start();

      // During the tour, tabIndex should be set to 0
      expect(testElement.tabIndex).toBe(0);
      expect(testElement.getAttribute('tabindex')).toBe('0');

      // Hide the step
      instance.getCurrentStep().hide();

      // After hiding, tabIndex should be restored to 5
      expect(testElement.getAttribute('tabindex')).toBe('5');
    });

    it('restores tabIndex when step is destroyed', () => {
      // Set tabindex to -1 initially
      testElement.setAttribute('tabindex', '-1');

      // Start the tour
      instance.start();

      // During the tour, tabIndex should be set to 0
      expect(testElement.getAttribute('tabindex')).toBe('0');

      // Destroy the step
      instance.getCurrentStep().destroy();

      // After destroying, tabIndex should be restored to -1
      expect(testElement.getAttribute('tabindex')).toBe('-1');
    });

    it('handles multiple show/hide cycles correctly', () => {
      // Set tabindex to 2 initially
      testElement.setAttribute('tabindex', '2');

      // Start the tour (first show)
      instance.start();
      expect(testElement.getAttribute('tabindex')).toBe('0');

      // Hide the step
      instance.getCurrentStep().hide();
      expect(testElement.getAttribute('tabindex')).toBe('2');

      // Show again
      instance.getCurrentStep().show();
      expect(testElement.getAttribute('tabindex')).toBe('0');

      // Hide again
      instance.getCurrentStep().hide();
      expect(testElement.getAttribute('tabindex')).toBe('2');
    });

    it('only stores the original value once, not intermediate values', () => {
      // Set tabindex to 3 initially
      testElement.setAttribute('tabindex', '3');

      // Start the tour
      instance.start();
      expect(testElement.getAttribute('tabindex')).toBe('0');

      // Manually change tabIndex (simulating some other code changing it)
      testElement.setAttribute('tabindex', '7');

      // Hide the step - should restore to original value (3), not intermediate (7)
      instance.getCurrentStep().hide();
      expect(testElement.getAttribute('tabindex')).toBe('3');
    });
  });

  describe('step lifecycle', () => {
    let instance;
    let testElement;

    beforeEach(() => {
      testElement = document.createElement('div');
      testElement.id = 'lifecycle-test-element';
      document.body.appendChild(testElement);
    });

    afterEach(() => {
      instance?.complete();
      testElement?.remove();
    });

    it('does not trigger `destroy` when a step is shown again', () => {
      instance = new Shepherd.Tour({
        steps: [
          { id: 'first', text: 'First' },
          { id: 'second', text: 'Second' }
        ]
      });

      const destroySpy = vi.fn();
      instance.getById('first').on('destroy', destroySpy);

      instance.start();
      instance.next();
      instance.back();

      expect(
        destroySpy,
        'recreating the element on show does not trigger `destroy`'
      ).not.toHaveBeenCalled();
    });

    it('triggers `destroy` once for each step when the tour completes', () => {
      instance = new Shepherd.Tour({
        steps: [
          { id: 'first', text: 'First' },
          { id: 'second', text: 'Second' }
        ]
      });

      const firstDestroy = vi.fn();
      const secondDestroy = vi.fn();
      instance.getById('first').on('destroy', firstDestroy);
      instance.getById('second').on('destroy', secondDestroy);

      instance.start();
      instance.next();
      instance.complete();

      expect(firstDestroy).toHaveBeenCalledTimes(1);
      expect(secondDestroy).toHaveBeenCalledTimes(1);
    });

    it('does not accumulate `advanceOn` listeners across shows', () => {
      const addSpy = vi.spyOn(testElement, 'addEventListener');
      const removeSpy = vi.spyOn(testElement, 'removeEventListener');

      instance = new Shepherd.Tour({
        steps: [
          {
            id: 'first',
            text: 'First',
            advanceOn: { selector: '#lifecycle-test-element', event: 'click' }
          },
          { id: 'second', text: 'Second' }
        ]
      });

      instance.start(); // binds
      instance.next();
      instance.back(); // unbinds, then binds again
      instance.complete(); // unbinds

      const countFor = (spy) =>
        spy.mock.calls.filter(([event]) => event === 'click').length;

      expect(countFor(addSpy), 'advanceOn bound once per show').toBe(2);
      expect(countFor(removeSpy), 'every bound listener was removed').toBe(2);

      addSpy.mockRestore();
      removeSpy.mockRestore();
    });

    // https://github.com/shipshapecode/shepherd/issues/3443
    it('does not run `destroy` cleanup when re-showing a step whose target is set up in `beforeShowPromise`', async () => {
      // `Tour.show()` does not return the step's show promise, so let the
      // `beforeShowPromise` chain settle before asserting
      const settle = () => new Promise((resolve) => setTimeout(resolve, 0));
      let opened = 0;
      let closed = 0;

      // Stands in for opening/closing a three-dots menu that holds the target
      const openMenu = () => {
        opened++;
        document.querySelector('#menu-item')?.remove();
        const item = document.createElement('button');
        item.id = 'menu-item';
        testElement.appendChild(item);
      };
      const closeMenu = () => {
        closed++;
        document.querySelector('#menu-item')?.remove();
      };

      instance = new Shepherd.Tour({
        steps: [
          { id: 'intro', text: 'Intro' },
          {
            id: 'menu-step',
            text: 'Lives inside the menu',
            attachTo: { element: '#menu-item', on: 'right' },
            beforeShowPromise: () => Promise.resolve(openMenu()),
            when: { destroy: closeMenu }
          }
        ]
      });

      await instance.start();
      instance.next();
      await settle();

      expect(opened, 'menu opened for the step').toBe(1);
      expect(closed, 'no cleanup yet').toBe(0);

      instance.back();
      await settle();
      instance.next();
      await settle();

      expect(opened, 'menu re-opened on re-show').toBe(2);
      expect(closed, 're-showing the step did not run `destroy` cleanup').toBe(
        0
      );
      expect(
        instance.getById('menu-step').getTarget()?.id,
        'step is attached to the live target'
      ).toBe('menu-item');

      instance.complete();

      expect(closed, 'cleanup ran exactly once, at the end of the tour').toBe(
        1
      );
      expect(document.querySelector('#menu-item')).toBeNull();
    });

    it('preserves the original tabindex across `updateStepOptions`', () => {
      testElement.setAttribute('tabindex', '2');

      instance = new Shepherd.Tour({
        steps: [
          {
            id: 'first',
            text: 'First',
            attachTo: { element: '#lifecycle-test-element', on: 'top' }
          }
        ]
      });

      instance.start();
      expect(testElement.getAttribute('tabindex')).toBe('0');

      // Tearing down and rebuilding the element must not lose the stored value
      instance.getById('first').updateStepOptions({ text: 'Updated' });
      instance.getById('first').hide();

      expect(testElement.getAttribute('tabindex')).toBe('2');
    });
  });

  describe('data option', () => {
    it('exposes the data option at step.options.data', () => {
      const data = { foo: 'bar', nested: { a: 1 } };
      const step = tour.addStep({ id: 'data-step', data });

      expect(step.options.data).toEqual(data);
    });

    it('leaves step.options.data undefined when data is not passed', () => {
      const step = tour.addStep({ id: 'no-data-step' });

      expect(step.options.data).toBeUndefined();
    });
  });
});
