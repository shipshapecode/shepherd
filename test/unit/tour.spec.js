import _ from 'lodash';
import { vi } from 'vitest';
import Shepherd from '../../shepherd.js/src/shepherd';
import ResizeObserver from 'resize-observer-polyfill';
import { setupTooltip } from '../../shepherd.js/src/utils/floating-ui';
import { offset } from '@floating-ui/dom';

const { Step } = Shepherd;

// since importing non UMD, needs assignment
window.Shepherd = Shepherd;
window.ResizeObserver = ResizeObserver;

const DEFAULT_STEP_CLASS = 'shepherd-step-tooltip';

describe('Tour | Top-Level Class', function () {
  let instance, shouldShowStep;

  const showOn = () => {
    return true;
  };

  const when = {
    show() {}
  };

  const offsetMiddleware = offset({ crossAxis: 32 });

  const defaultStepOptions = {
    classes: DEFAULT_STEP_CLASS,
    scrollTo: true,
    floatingUIOptions: {
      middleware: [offsetMiddleware]
    },
    showOn,
    when
  };

  afterEach(() => {
    instance.complete();
  });

  describe('constructor', function () {
    it('creates a new tour instance', function () {
      instance = new Shepherd.Tour({ defaultStepOptions });

      expect(instance instanceof Shepherd.Tour).toBe(true);
    });

    it('returns the default options on the instance', function () {
      instance = new Shepherd.Tour({
        defaultStepOptions,
        steps: [
          {
            scrollTo: false
          }
        ]
      });

      expect(instance.options.defaultStepOptions).toEqual({
        classes: DEFAULT_STEP_CLASS,
        scrollTo: true,
        floatingUIOptions: {
          middleware: [offsetMiddleware]
        },
        showOn,
        when
      });
    });

    it('sets the correct bindings', function () {
      instance = new Shepherd.Tour({ defaultStepOptions });

      const bindings = Object.keys(instance.bindings);
      const tourEvents = [
        'complete',
        'cancel',
        'start',
        'show',
        'active',
        'inactive'
      ];
      // Check that all bindings are included
      const difference = _.difference(tourEvents, bindings);
      expect(difference.length, 'all tour events bound').toBe(0);
    });

    it('generates a unique `id` property, optionally based upon the `tourName` option', function () {
      const instance1 = new Shepherd.Tour();
      const instance2 = new Shepherd.Tour({ tourName: 'select-avatar' });

      expect(instance1.id.startsWith('tour--')).toBe(true);
      expect(instance2.id.startsWith('select-avatar--')).toBe(true);

      const [uniqueId1] = instance1.id.split('--')[1];
      const uniqueId2 = instance2.id.split('--')[1];

      expect(uniqueId1).not.toBe(uniqueId2);
    });
  });

  describe('methods', () => {
    beforeEach(() => {
      shouldShowStep = false;

      instance = new Shepherd.Tour({
        defaultStepOptions
      });

      instance.addStep({
        id: 'test',
        title: 'This is a test step for our tour'
      });

      instance.addStep({
        id: 'test2',
        title: 'Another Step'
      });

      instance.addStep({
        classes: 'skipped',
        id: 'skipped-step',
        title: 'This step should be skipped',
        showOn() {
          return shouldShowStep;
        }
      });

      instance.addStep({
        id: 'test3',
        title: 'Yet, another test step'
      });
    });

    describe('.addStep()', function () {
      it('adds tour steps', function () {
        expect(instance.steps.length).toBe(4);
        expect(
          instance.getById('test').options.classes,
          'classes passed to step options'
        ).toBe(DEFAULT_STEP_CLASS);
      });

      it('adds tour steps at specified index', function () {
        expect(instance.steps[1].options.id, 'original step at index 1').toBe(
          'test2'
        );
        instance.addStep(
          {
            id: 'index-test',
            title: 'Test index insertion'
          },
          1
        );
        expect(instance.steps.length).toBe(5);
        expect(instance.steps[1].options.id, 'step inserted at index 1').toBe(
          'index-test'
        );
      });

      it('adds steps with only one arg', function () {
        const step = instance.addStep({
          id: 'one-arg'
        });

        expect(instance.steps.length).toBe(5);
        expect(step.id, 'id applied to step with just one arg').toBe('one-arg');
      });

      it('adds steps that are already Step instances', function () {
        const step = instance.addStep(
          new Step(instance, {
            id: 'already-a-step'
          })
        );

        expect(instance.steps.length).toBe(5);
        expect(step.id, 'id applied to step instance').toBe('already-a-step');
        expect(step.tour, 'tour is set to `this`').toBe(instance);
      });
    });

    describe('.getById()', function () {
      it('returns the step by ID with the right title', function () {
        expect(instance.steps.length).toBe(4);
        expect(instance.getById('test3').options.title).toBe(
          'Yet, another test step'
        );
      });
    });

    describe('.start()', function () {
      it('starts a tour that is the current active', function () {
        instance.start();

        expect(instance).toBe(Shepherd.activeTour);
      });
    });

    describe('.getCurrentStep()', function () {
      it('returns the currently shown step', function () {
        instance.start();
        expect(instance.getCurrentStep().id).toBe('test');
      });
    });

    describe('.hide()', function () {
      it('hides the current step', () => {
        const [firstStep] = instance.steps;
        const hideStepSpy = vi.spyOn(firstStep, 'hide');

        expect(firstStep.isOpen()).toBe(false);

        instance.start();

        expect(firstStep.isOpen()).toBe(true);

        instance.hide();

        expect(firstStep.isOpen()).toBe(false);
        expect(hideStepSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('isActive', function () {
      it('computes whether or not `Shepherd.activeTour` equals the instance', function () {
        Shepherd.activeTour = '';
        expect(instance.isActive()).toBe(false);

        Shepherd.activeTour = instance;
        expect(instance.isActive()).toBe(true);

        Shepherd.activeTour = '';
        expect(instance.isActive()).toBe(false);
      });
    });

    describe('.next()/.back()', function () {
      it('goes to the next/previous steps', function () {
        instance.start();
        instance.next();
        expect(instance.getCurrentStep().id).toBe('test2');
        instance.back();
        expect(instance.getCurrentStep().id).toBe('test');
      });

      it('next completes tour when on last step', function () {
        let completeFired = false;
        instance.on('complete', () => {
          completeFired = true;
        });

        instance.start();
        instance.show('test3');
        expect(instance.getCurrentStep().id).toBe('test3');
        instance.next();
        expect(
          completeFired,
          'complete is called when next is clicked on last step'
        ).toBeTruthy();
      });
    });

    describe('.cancel()', function () {
      it('shows confirm dialog when confirmCancel is true', function () {
        instance = new Shepherd.Tour({
          defaultStepOptions,
          confirmCancel: true,
          confirmCancelMessage: 'Confirm cancel?'
        });

        instance.addStep({
          id: 'test',
          title: 'This is a test step for our tour'
        });

        let inactiveFired = false;
        instance.on('inactive', () => {
          inactiveFired = true;
        });

        window.confirm = vi.fn();
        const windowConfirmStub = vi
          .spyOn(window, 'confirm')
          .mockImplementation(() => false);

        instance.start();

        expect(instance, 'activeTour is set to our tour').toBe(
          Shepherd.activeTour
        );

        instance.cancel();

        expect(windowConfirmStub).toHaveBeenCalled();

        expect(
          inactiveFired,
          'tour still going, since confirm returned false'
        ).toBeFalsy();

        windowConfirmStub.mockImplementation(() => true);

        instance.cancel();

        expect(windowConfirmStub).toHaveBeenCalled();
        expect(
          inactiveFired,
          'tour inactive, since confirm returned true'
        ).toBeTruthy();
      });

      it('tears down tour on cancel', function () {
        let inactiveFired = false;
        instance.on('inactive', () => {
          inactiveFired = true;
        });
        instance.start();
        expect(instance, 'activeTour is set to our tour').toBe(
          Shepherd.activeTour
        );
        instance.cancel();
        expect(Shepherd.activeTour, 'activeTour is torn down').toBeFalsy();
        expect(inactiveFired, 'inactive event fired').toBeTruthy();
      });

      it('triggers cancel event when cancel function is called', function () {
        let cancelFired = false;
        instance.on('cancel', () => {
          cancelFired = true;
        });

        instance.start();
        instance.cancel();
        expect(cancelFired, 'cancel event fired').toBeTruthy();
      });

      [
        {
          status: 'normal',
          title: 'whether cancel depends on function return value'
        },
        {
          status: 'async',
          title:
            'whether cancel will wait for the value returned from the function'
        }
      ].map(({ status, title }) => {
        it('when confirmCancel is function, ' + title, async function () {
          const myMock = vi.fn();
          if (status === 'async') {
            myMock
              .mockImplementationOnce(() => Promise.resolve(false))
              .mockImplementationOnce(() => Promise.resolve(true));
          } else {
            myMock.mockReturnValueOnce(false).mockReturnValueOnce(true);
          }
          instance = new Shepherd.Tour({
            defaultStepOptions,
            confirmCancel: myMock,
            confirmCancelMessage: 'Confirm cancel?'
          });

          instance.addStep({
            id: 'test',
            title: 'This is a test step for our tour'
          });

          let inactiveFired = false;
          instance.on('cancel', () => {
            inactiveFired = true;
          });

          instance.start();
          expect(instance, 'activeTour is set to our tour').toBe(
            Shepherd.activeTour
          );

          await instance.cancel();
          expect(
            myMock.mock.calls.length,
            'confirmCancel callback called once'
          ).toBe(1);
          expect(
            await myMock.mock.results[0].value,
            'confirmCancel callback returns false'
          ).toBe(false);
          expect(
            inactiveFired,
            'tour still going, since confirmCancel callback returned false'
          ).toBeFalsy();

          await instance.cancel();
          expect(
            myMock.mock.calls.length,
            'confirmCancel callback called twice'
          ).toBe(2);
          expect(
            await myMock.mock.results[1].value,
            'confirmCancel callback returns true'
          ).toBe(true);
          expect(
            inactiveFired,
            'tour inactive, since confirm returned true'
          ).toBeTruthy();
        });
      });
    });

    describe('.complete()', function () {
      it('triggers complete event when complete function is called', function () {
        let completeFired = false;

        instance.on('complete', () => {
          completeFired = true;
        });

        instance.start();
        instance.complete();
        expect(completeFired, 'complete event fired').toBeTruthy();
      });

      it('calls `done()`', () => {
        const doneSpy = vi.spyOn(instance, '_done');

        expect(doneSpy).toHaveBeenCalledTimes(0);

        instance.start();
        instance.complete();

        expect(doneSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('._done()', function () {
      it('tears down the active tour', function () {
        instance.start();

        expect(instance, 'activeTour is set to our tour').toBe(
          Shepherd.activeTour
        );

        instance.complete();

        expect(
          Shepherd.activeTour,
          '`activeTour` is torn down and removed from the `Shepherd` global'
        ).toBe(null);
      });

      it('removes any of its `Step` tooltip elements from the DOM', function () {
        const testStep = {
          id: 'element-removal-test',
          classes: 'element-removal-test',
          title: 'This is a test step for our tour'
        };

        instance.addStep(testStep);
        instance.start();
        instance.show('element-removal-test');

        expect(
          document.querySelector('.element-removal-test'),
          'a step is rendered in the DOM after the tour starts'
        ).toBeInTheDocument();

        instance.complete();

        expect(
          document.querySelector('.element-removal-test'),
          'steps are removed from the DOM after the tour completes'
        ).not.toBeInTheDocument();
      });

      it('fires the `inactive` event', function () {
        let inactiveFired = false;

        instance.on('inactive', () => {
          inactiveFired = true;
        });

        instance.start();

        expect(
          inactiveFired,
          'inactive event does not fire before `complete()`'
        ).toBe(false);

        instance.complete();

        expect(inactiveFired, 'inactive event fires after `complete()`').toBe(
          true
        );
      });
    });

    describe('.removeStep()', function () {
      it('removes the step when passed the id', function () {
        instance.start();
        expect(instance.steps.length).toBe(4);
        instance.removeStep('test2');
        expect(instance.steps.length).toBe(3);
      });

      it('hides the step before removing', function () {
        let hideFired = false;
        instance.start();
        expect(instance.steps.length).toBe(4);
        const step = instance.getById('test');
        step.on('hide', () => {
          hideFired = true;
        });
        instance.removeStep('test');
        expect(instance.steps.length).toBe(3);
        expect(
          hideFired,
          'hide is fired before step is destroyed'
        ).toBeTruthy();
      });
    });

    describe('.show()', function () {
      it('show short-circuits if next is not found', function () {
        let showFired = false;
        instance.start();
        instance.on('show', () => {
          showFired = true;
        });
        instance.show('not-a-real-key');
        expect(
          showFired,
          'showFired is false because show short circuits'
        ).toBeFalsy();
      });

      it('showOn determines which steps to skip', function () {
        instance.start();
        expect(instance.getCurrentStep().id).toBe('test');
        instance.next();
        expect(instance.getCurrentStep().id).toBe('test2');
        instance.next();
        expect(instance.getCurrentStep().id).toBe('test3');
        expect(
          instance.getCurrentStep().id,
          'step skipped because `showOn` returns false'
        ).not.toBe('skipped-step');
        instance.back();
        shouldShowStep = true;
        instance.next();
        expect(
          instance.getCurrentStep().id,
          'step shown because `showOn` returns true'
        ).toBe('skipped-step');
      });

      it("sets the instance on `Shepherd.activeTour` if it's not already set", function () {
        const setupFuncSpy = vi.spyOn(instance, '_setupActiveTour');
        Shepherd.activeTour = null;

        expect(setupFuncSpy).toHaveBeenCalledTimes(0);

        instance.start();

        expect(setupFuncSpy).toHaveBeenCalledTimes(1);
        expect(Shepherd.activeTour).toBe(instance);
      });
    });
  });

  describe('floatingUIOptions', () => {
    it('applies the default modifiers from defaultStepOptions', function () {
      instance = new Shepherd.Tour({ defaultStepOptions });

      const step = instance.addStep({
        id: 'test',
        title: 'This is a test step for our tour'
      });

      instance.start();

      const floatingUIOptions = setupTooltip(step);
      expect(floatingUIOptions.middleware.length).toBe(1);
    });

    it('adds a step modifer to default modifiers', function () {
      instance = new Shepherd.Tour({ defaultStepOptions });

      const step = instance.addStep({
        id: 'test',
        title: 'This is a test step for our tour',
        floatingUIOptions: {
          middleware: [{ name: 'foo', options: 'bar', fn: (args) => args }]
        }
      });

      instance.start();

      const floatingUIOptions = setupTooltip(step);
      expect(floatingUIOptions.middleware.length).toBe(2);
    });

    it('correctly changes modifiers when going from centered to attached', function () {
      const div = document.createElement('div');
      div.classList.add('modifiers-test');
      document.body.appendChild(div);
      instance = new Shepherd.Tour({ defaultStepOptions });

      const centeredStep = instance.addStep({
        id: 'centered',
        title: 'This is a centered step for our tour',
        floatingUIOptions: {
          middleware: [{ name: 'foo', options: 'bar', fn: (args) => args }]
        }
      });

      const attachedStep = instance.addStep({
        attachTo: { element: '.modifiers-test', on: 'top' },
        id: 'attached',
        title: 'This is an attached step for our tour',
        floatingUIOptions: {
          middleware: [{ name: 'foo', options: 'bar', fn: (args) => args }]
        }
      });

      instance.start();

      const centeredOptions = setupTooltip(centeredStep);
      const centeredMiddlewareNames = centeredOptions.middleware.map(
        ({ name }) => name
      );
      expect(centeredOptions.middleware.length).toBe(2);
      expect(centeredMiddlewareNames.includes('offset')).toBe(true);
      expect(centeredMiddlewareNames.includes('foo')).toBe(true);
      expect(centeredMiddlewareNames.includes('arrow')).toBe(false);

      instance.next();

      const options = setupTooltip(attachedStep);
      const middlewareNames = options.middleware.map(({ name }) => name);
      expect(options.middleware.length).toBe(5);
      expect(middlewareNames.includes('offset')).toBe(true);
      expect(middlewareNames.includes('foo')).toBe(true);
      expect(middlewareNames.includes('shift')).toBe(true);
      expect(middlewareNames.includes('arrow')).toBe(true);

      document.body.removeChild(div);
    });

    it('renders step in stepsContainer', () => {
      const stepsContainer = document.createElement('div');
      stepsContainer.setAttribute('id', 'customStepTarget');
      document.body.appendChild(stepsContainer);
      expect(stepsContainer).toBeInTheDocument();

      instance = new Shepherd.Tour({
        stepsContainer,
        defaultStepOptions
      });

      const step = instance.addStep({
        title: 'This is a test step for our tour'
      });

      instance.start();

      const stepElement = step.getElement();

      expect(stepsContainer.contains(stepElement)).toBe(true);
    });

    it('adds autoPlacement middleware when attachTo.on is set to auto', () => {
      const div = document.createElement('div');
      div.classList.add('modifiers-test');
      document.body.appendChild(div);
      instance = new Shepherd.Tour();

      const step1 = instance.addStep({
        id: 'test',
        title: 'This is a test step for our tour',
        attachTo: { element: '.modifiers-test', on: 'auto' }
      });

      const step2 = instance.addStep({
        id: 'test',
        title: 'This is a test step for our tour',
        attachTo: { element: '.modifiers-test', on: 'auto-start' }
      });

      const step3 = instance.addStep({
        id: 'test',
        title: 'This is a test step for our tour',
        attachTo: { element: '.modifiers-test', on: 'auto-end' }
      });

      instance.start();

      const step1FloatingUIOptions = setupTooltip(step1);
      const step1MiddlewareNames = step1FloatingUIOptions.middleware.map(
        ({ name }) => name
      );
      const step1PlacementMiddleware = step1FloatingUIOptions.middleware.find(
        ({ name }) => name === 'autoPlacement'
      );
      expect(step1MiddlewareNames.includes('autoPlacement')).toBe(true);
      expect(step1MiddlewareNames.includes('flip')).toBe(false);
      expect(step1PlacementMiddleware.options.alignment).toBe(null);

      instance.next();

      const step2FloatingUIOptions = setupTooltip(step2);
      const step2PlacementMiddleware = step2FloatingUIOptions.middleware.find(
        ({ name }) => name === 'autoPlacement'
      );
      expect(step2PlacementMiddleware.options.alignment).toBe('start');

      instance.next();

      const step3FloatingUIOptions = setupTooltip(step3);
      const step3PlacementMiddleware = step3FloatingUIOptions.middleware.find(
        ({ name }) => name === 'autoPlacement'
      );
      expect(step3PlacementMiddleware.options.alignment).toBe('end');
    });
  });

  describe('shepherdModalOverlayContainer', function () {
    beforeEach(() => {
      instance = new Shepherd.Tour({ useModalOverlay: true });
    });
    it('appends shepherdModalOverlayContainer to DOM when it does not exist', async () => {
      expect(
        document.querySelector('.shepherd-modal-overlay-container')
      ).not.toBeInTheDocument();

      instance.start();

      setTimeout(() => {
        expect(
          document.querySelector('.shepherd-modal-overlay-container')
        ).toBeInTheDocument();
      }, 200);
    });

    it('removes shepherdModalOverlayContainer from DOM when it is complete', () => {
      instance.start();

      setTimeout(() => {
        expect(
          document.querySelector('.shepherd-modal-overlay-container')
        ).toBeInTheDocument();
      }, 200);

      instance.complete();

      expect(
        document.querySelector('.shepherd-modal-overlay-container')
      ).not.toBeInTheDocument();
    });

    it('renders modal in modalContainer', () => {
      const modalContainer = document.createElement('div');
      modalContainer.setAttribute('id', 'customModalTarget');
      document.body.appendChild(modalContainer);
      expect(modalContainer).toBeInTheDocument();

      instance = new Shepherd.Tour({
        modalContainer,
        useModalOverlay: true
      });

      instance.addStep({
        title: 'This is a test step for our tour'
      });

      instance.start();

      const modalElement = instance.modal.getElement();

      expect(modalContainer.contains(modalElement)).toBe(true);
    });
  });
});
