import _ from 'lodash';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Shepherd from '../../src/shepherd';
import ResizeObserver from 'resize-observer-polyfill';
import { setupTooltip } from '../../src/utils/floating-ui';
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

      describe('on a tour that is already running', function () {
        const overlays = () =>
          document.querySelectorAll('.shepherd-modal-overlay-container');
        const visiblePopups = () =>
          Array.from(
            document.querySelectorAll('.shepherd-element:not([hidden])')
          ).map((el) => el.getAttribute('data-shepherd-step-id'));

        it('leaves one overlay, and none once the tour ends', function () {
          instance.start();
          instance.start();

          expect(overlays().length).toBe(1);
          expect(overlays()[0]).toBe(instance.modal.getElement());

          instance.cancel();

          expect(overlays().length).toBe(0);
        });

        it('restarts from the first step, hiding the current one', function () {
          instance.start();
          instance.next();

          expect(visiblePopups()).toEqual(['test2']);

          instance.start();

          expect(instance.getCurrentStep().id).toBe('test');
          expect(visiblePopups()).toEqual(['test']);
          expect(overlays().length).toBe(1);
        });

        it('shows the first step with no previous step', function () {
          const previous = [];

          instance.on('show', (event) => previous.push(event.previous));
          instance.start();
          instance.next();
          previous.length = 0;
          instance.start();

          expect(previous).toEqual([null]);
        });

        it('fires `start` and `active` again', function () {
          const events = [];

          instance.start();
          instance.on('start', () => events.push('start'));
          instance.on('active', () => events.push('active'));
          instance.start();

          expect(events).toEqual(['start', 'active']);
        });

        it('restores focus to where it was before the original start', function () {
          const button = document.createElement('button');
          document.body.appendChild(button);
          button.focus();

          instance.start();

          const popupButton = document.createElement('button');
          instance.getCurrentStep().getElement().appendChild(popupButton);
          popupButton.focus();

          instance.start();

          expect(instance.focusedElBeforeOpen).toBe(button);

          instance.cancel();

          expect(document.activeElement).toBe(button);

          button.remove();
        });
      });

      describe('on a tour that has ended', function () {
        it('saves the newly focused element', function () {
          const first = document.createElement('button');
          const second = document.createElement('button');
          document.body.append(first, second);
          first.focus();

          instance.start();
          instance.complete();

          second.focus();

          instance.start();
          instance.complete();

          expect(document.activeElement).toBe(second);

          first.remove();
          second.remove();
        });

        it('fires `start` and `active` without hiding any step', function () {
          const events = [];

          instance.start();
          instance.next();
          instance.complete();

          instance.steps.forEach((step) =>
            step.on('hide', () => events.push('hide'))
          );
          instance.on('start', () => events.push('start'));
          instance.on('active', () => events.push('active'));
          instance.start();

          expect(events).toEqual(['start', 'active']);
          expect(instance.getCurrentStep().id).toBe('test');
        });
      });

      it('recreates a missing modal when a step shows', function () {
        instance.start();
        instance.modal.destroy();
        instance.modal = null;

        instance.next();

        expect(
          document.querySelectorAll('.shepherd-modal-overlay-container').length
        ).toBe(1);
        expect(instance.modal.getElement()).toBeInTheDocument();
      });
    });

    describe('.setupModal()', function () {
      it('replaces an existing modal rather than leaking it', function () {
        instance.setupModal();
        instance.setupModal();

        expect(
          document.querySelectorAll('.shepherd-modal-overlay-container').length
        ).toBe(1);
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

      describe('when the confirmCancel function answers later', function () {
        let answers, cancelFired, completeFired;

        beforeEach(() => {
          answers = [];
          cancelFired = 0;
          completeFired = 0;

          instance = new Shepherd.Tour({
            defaultStepOptions,
            confirmCancel: () =>
              new Promise((resolve) => {
                answers.push(resolve);
              })
          });

          instance.addStep({ id: 'first', title: 'First' });
          instance.addStep({ id: 'second', title: 'Second' });

          instance.on('cancel', () => {
            cancelFired++;
          });
          instance.on('complete', () => {
            completeFired++;
          });
        });

        it('ends the run that asked when the answer is yes', async function () {
          instance.start();
          const cancelling = instance.cancel();

          answers[0](true);
          await cancelling;

          expect(cancelFired).toBe(1);
          expect(instance.isActive()).toBe(false);
        });

        it('keeps the run going when the answer is no', async function () {
          instance.start();
          const cancelling = instance.cancel();

          answers[0](false);
          await cancelling;

          expect(cancelFired).toBe(0);
          expect(instance.isActive()).toBe(true);
        });

        it('still cancels after moving to another step during the wait', async function () {
          instance.start();
          const cancelling = instance.cancel();
          instance.next();
          expect(instance.getCurrentStep().id).toBe('second');

          answers[0](true);
          await cancelling;

          expect(cancelFired).toBe(1);
          expect(instance.isActive()).toBe(false);
        });

        it('ignores a yes when the run has already completed', async function () {
          instance.start();
          const cancelling = instance.cancel();
          instance.complete();

          answers[0](true);
          await cancelling;

          expect(completeFired).toBe(1);
          expect(cancelFired).toBe(0);
        });

        it('does not let a yes from an ended run end a new run', async function () {
          instance.start();
          const cancelling = instance.cancel();
          instance.complete();
          instance.start();

          answers[0](true);
          await cancelling;

          expect(cancelFired).toBe(0);
          expect(instance.isActive()).toBe(true);
          expect(instance.getCurrentStep().id).toBe('first');
        });

        it('does not let a yes end a run that restarted without ending', async function () {
          instance.start();
          const cancelling = instance.cancel();
          instance.start();

          answers[0](true);
          await cancelling;

          expect(cancelFired).toBe(0);
          expect(instance.isActive()).toBe(true);
        });

        it('cancels once when two pending answers are both yes', async function () {
          instance.start();
          const first = instance.cancel();
          const second = instance.cancel();

          answers[0](true);
          answers[1](true);
          await Promise.all([first, second]);

          expect(cancelFired).toBe(1);
        });

        it('still fires cancel for a yes on a tour that was never started', async function () {
          const cancelling = instance.cancel();

          answers[0](true);
          await cancelling;

          expect(cancelFired).toBe(1);
        });

        it('does not let a yes asked while idle end a run started during the wait', async function () {
          const cancelling = instance.cancel();
          instance.start();

          answers[0](true);
          await cancelling;

          expect(cancelFired).toBe(0);
          expect(instance.isActive()).toBe(true);
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

      it('triggers show with the step that was showing before as `previous`', function () {
        const shows = [];
        instance.on('show', ({ step, previous }) =>
          shows.push({ step, previous })
        );

        instance.start();
        instance.next();

        const [firstShow, secondShow] = shows;

        expect(firstShow.step.id).toBe('test');
        expect(
          firstShow.previous,
          'there is no previous step on the first show'
        ).toBeNull();

        expect(secondShow.step.id).toBe('test2');
        expect(
          secondShow.previous.id,
          '`previous` is the step that was showing before'
        ).toBe('test');
        expect(
          secondShow.previous,
          '`previous` is not the same object as `step`'
        ).not.toBe(secondShow.step);
      });

      it('reports `previous` as null when no step was showing before', function () {
        // `removeStep` clears `currentStep` to `undefined` before showing the
        // next step, so `previous` has to be normalized on that path too
        instance.start();

        let previousStep;
        instance.on('show', ({ previous }) => (previousStep = previous));

        instance.removeStep('test');

        expect(instance.getCurrentStep().id).toBe('test2');
        expect(
          previousStep,
          '`previous` is null rather than undefined when nothing was showing'
        ).toBeNull();
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

      it('fires cancel when going back past first step with showOn returning false', function () {
        let cancelFired = false;
        const tourInstance = new Shepherd.Tour();

        tourInstance.addStep({
          id: 'first-hidden',
          title: 'This step is always hidden',
          showOn() {
            return false;
          }
        });

        tourInstance.addStep({
          id: 'second',
          title: 'Second step'
        });

        tourInstance.on('cancel', () => {
          cancelFired = true;
        });

        tourInstance.start();
        expect(
          tourInstance.getCurrentStep().id,
          'first hidden step is skipped on start'
        ).toBe('second');

        tourInstance.back();
        expect(
          cancelFired,
          'cancel is fired when going back past all shown steps'
        ).toBeTruthy();
        expect(
          Shepherd.activeTour,
          'activeTour is null after cancel'
        ).toBeNull();
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

    describe('strategy', () => {
      let target;

      beforeEach(() => {
        target = document.createElement('div');
        target.classList.add('strategy-test');
        document.body.appendChild(target);
      });

      afterEach(() => {
        document.body.removeChild(target);
      });

      it('writes the default `absolute` strategy to an attached step', async () => {
        instance = new Shepherd.Tour();

        const step = instance.addStep({
          id: 'test',
          title: 'This is a test step for our tour',
          attachTo: { element: '.strategy-test', on: 'top' }
        });

        instance.start();

        await vi.waitFor(() => expect(step.el.style.position).toBe('absolute'));
      });

      it('honors `strategy: fixed` from step floatingUIOptions', async () => {
        instance = new Shepherd.Tour();

        const step = instance.addStep({
          id: 'test',
          title: 'This is a test step for our tour',
          attachTo: { element: '.strategy-test', on: 'top' },
          floatingUIOptions: { strategy: 'fixed' }
        });

        instance.start();

        await vi.waitFor(() => expect(step.el.style.position).toBe('fixed'));
      });

      it('honors `strategy: fixed` from defaultStepOptions floatingUIOptions', async () => {
        instance = new Shepherd.Tour({
          defaultStepOptions: {
            floatingUIOptions: { strategy: 'fixed' }
          }
        });

        const step = instance.addStep({
          id: 'test',
          title: 'This is a test step for our tour',
          attachTo: { element: '.strategy-test', on: 'top' }
        });

        instance.start();

        await vi.waitFor(() => expect(step.el.style.position).toBe('fixed'));
      });

      // Centered steps are modal dialogs positioned with `left`/`top: 50%` and
      // a `translate(-50%, -50%)`. Those percentages must resolve against the
      // viewport, so the centered branch stays `fixed` no matter what strategy
      // is configured. This test locks that in deliberately.
      it.each([undefined, 'absolute', 'fixed'])(
        'always centers with `position: fixed` when strategy is %s',
        async (strategy) => {
          instance = new Shepherd.Tour();

          const step = instance.addStep({
            id: 'test',
            title: 'This is a test step for our tour',
            floatingUIOptions: strategy ? { strategy } : {}
          });

          instance.start();

          await vi.waitFor(() => expect(step.el.style.position).toBe('fixed'));

          expect(step.el.style.left).toBe('50%');
          expect(step.el.style.top).toBe('50%');
        }
      );
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

  describe('superseded beforeShowPromise', () => {
    let resolvers, gated;

    const flush = () => new Promise((resolve) => setTimeout(resolve));
    const overlays = () =>
      document.querySelectorAll('.shepherd-modal-overlay-container');

    beforeEach(() => {
      resolvers = [];
      instance = new Shepherd.Tour({ useModalOverlay: true });

      instance.addStep({ id: 'first', text: 'first' });
      gated = instance.addStep({
        id: 'gated',
        text: 'gated',
        beforeShowPromise: () =>
          new Promise((resolve) => resolvers.push(resolve))
      });
      instance.addStep({ id: 'last', text: 'last' });
    });

    it('renders the step when nothing superseded the show', async () => {
      instance.start();
      instance.next();

      resolvers[0]();
      await flush();

      expect(gated.isOpen()).toBe(true);
      expect(instance.getCurrentStep().id).toBe('gated');
    });

    it('does not bring back an ended tour', async () => {
      instance.start();
      instance.next();
      instance.cancel();

      resolvers[0]();
      await flush();

      expect(gated.getElement()).toBeFalsy();
      expect(instance.modal).toBeFalsy();
      expect(overlays().length).toBe(0);
      expect(document.body.classList.contains('shepherd-target')).toBe(false);
    });

    it('does not show the step after going back', async () => {
      instance.start();
      instance.next();
      instance.back();

      resolvers[0]();
      await flush();

      expect(gated.isOpen()).toBe(false);
      expect(instance.getById('first').isOpen()).toBe(true);
    });

    it('does not show the step after moving on', async () => {
      instance.start();
      instance.next();
      instance.next();

      resolvers[0]();
      await flush();

      expect(gated.isOpen()).toBe(false);
      expect(instance.getById('last').isOpen()).toBe(true);
    });

    it('does not show the step in a restarted run', async () => {
      instance.start();
      instance.next();
      instance.cancel();
      instance.start();

      resolvers[0]();
      await flush();

      expect(gated.isOpen()).toBe(false);
      expect(instance.getById('first').isOpen()).toBe(true);
      expect(overlays().length).toBe(1);
    });

    it('renders once, for the latest show, when shown twice', async () => {
      const beforeShow = vi.fn();
      gated.on('before-show', beforeShow);

      instance.start();
      instance.show('gated');
      instance.show('gated');

      resolvers[0]();
      await flush();

      expect(beforeShow).not.toHaveBeenCalled();
      expect(gated.isOpen()).toBe(false);

      resolvers[1]();
      await flush();

      expect(beforeShow).toHaveBeenCalledTimes(1);
      expect(gated.isOpen()).toBe(true);
    });

    it('does not bring back an ended tour from a direct step.show()', async () => {
      instance.start();
      gated.show();
      instance.cancel();

      resolvers[0]();
      await flush();

      expect(gated.getElement()).toBeFalsy();
      expect(instance.modal).toBeFalsy();
    });

    it('still renders a direct step.show() on a tour that never started', async () => {
      gated.show();

      resolvers[0]();
      await flush();

      expect(gated.isOpen()).toBe(true);
    });
  });

  describe('skipMissingElement / waitForElement', () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    it('skips a step whose attachTo element is missing when skipMissingElement is true', () => {
      instance = new Shepherd.Tour();

      instance.addStep({
        id: 'first',
        attachTo: { element: 'body', on: 'top' }
      });

      instance.addStep({
        id: 'missing',
        attachTo: { element: '.does-not-exist-xyz', on: 'top' },
        skipMissingElement: true
      });

      instance.addStep({
        id: 'third',
        attachTo: { element: 'body', on: 'top' }
      });

      instance.start();
      expect(instance.getCurrentStep().id, 'first step is shown').toBe('first');

      instance.next();
      expect(
        instance.getCurrentStep().id,
        'missing step is skipped, advancing to the third step'
      ).toBe('third');
    });

    it('applies skipMissingElement from defaultStepOptions', () => {
      instance = new Shepherd.Tour({
        defaultStepOptions: { skipMissingElement: true }
      });

      instance.addStep({
        id: 'first',
        attachTo: { element: 'body', on: 'top' }
      });

      instance.addStep({
        id: 'missing',
        attachTo: { element: '.does-not-exist-xyz', on: 'top' }
      });

      instance.addStep({
        id: 'third',
        attachTo: { element: 'body', on: 'top' }
      });

      instance.start();
      expect(instance.getCurrentStep().id, 'first step is shown').toBe('first');

      instance.next();
      expect(
        instance.getCurrentStep().id,
        'missing step is skipped via defaultStepOptions'
      ).toBe('third');
    });

    it('completes the tour when all trailing steps are skipped', () => {
      instance = new Shepherd.Tour();

      instance.addStep({
        id: 'first',
        attachTo: { element: 'body', on: 'top' }
      });

      instance.addStep({
        id: 'missing-1',
        attachTo: { element: '.does-not-exist-xyz', on: 'top' },
        skipMissingElement: true
      });

      instance.addStep({
        id: 'missing-2',
        attachTo: { element: '.does-not-exist-abc', on: 'top' },
        skipMissingElement: true
      });

      let completeFired = false;
      instance.on('complete', () => {
        completeFired = true;
      });

      instance.start();
      expect(instance.getCurrentStep().id, 'first step is shown').toBe('first');

      instance.next();

      expect(
        completeFired,
        'complete fires when all trailing steps are skipped'
      ).toBe(true);
      expect(
        Shepherd.activeTour,
        'activeTour is null after the tour completes'
      ).toBeNull();
    });

    it('cancels when going back past a skipped first step', () => {
      instance = new Shepherd.Tour();

      instance.addStep({
        id: 'missing',
        attachTo: { element: '.does-not-exist-xyz', on: 'top' },
        skipMissingElement: true
      });

      instance.addStep({
        id: 'second',
        attachTo: { element: 'body', on: 'top' }
      });

      let cancelFired = false;
      instance.on('cancel', () => {
        cancelFired = true;
      });

      instance.start();
      expect(
        instance.getCurrentStep().id,
        'missing first step is skipped on start'
      ).toBe('second');

      instance.back();

      expect(
        cancelFired,
        'cancel fires when going back past a skipped first step'
      ).toBe(true);
      expect(Shepherd.activeTour, 'activeTour is null after cancel').toBeNull();
    });

    it('still shows centered steps that have no attachTo', () => {
      instance = new Shepherd.Tour();

      instance.addStep({
        id: 'centered',
        skipMissingElement: true
      });

      instance.start();

      expect(
        instance.getCurrentStep().id,
        'a step with no attachTo is shown centered, not skipped'
      ).toBe('centered');
    });

    it('shows a step normally when its element exists even with skipMissingElement', () => {
      instance = new Shepherd.Tour();

      instance.addStep({
        id: 'exists',
        attachTo: { element: 'body', on: 'top' },
        skipMissingElement: true
      });

      instance.start();

      expect(
        instance.getCurrentStep().id,
        'a step whose element exists is shown normally'
      ).toBe('exists');
    });

    it('waitForElement waits for the element to appear and then attaches', async () => {
      instance = new Shepherd.Tour();

      instance.addStep({
        id: 'first',
        attachTo: { element: 'body', on: 'top' }
      });

      instance.addStep({
        id: 'second',
        attachTo: { element: '.appears-later-xyz', on: 'top' },
        waitForElement: 1000
      });

      instance.start();
      expect(instance.getCurrentStep().id, 'first step is shown').toBe('first');

      const promise = instance.next();

      let appearedElement;
      setTimeout(() => {
        appearedElement = document.createElement('div');
        appearedElement.classList.add('appears-later-xyz');
        document.body.appendChild(appearedElement);
      }, 30);

      await promise;

      expect(
        instance.getCurrentStep().id,
        'second step is shown once its element appears'
      ).toBe('second');
      expect(
        instance.getCurrentStep().target,
        'resolved target is the element that appeared'
      ).toBe(appearedElement);

      document.body.removeChild(appearedElement);
    });

    it('falls back to a centered step when waitForElement times out', async () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

      instance = new Shepherd.Tour();

      instance.addStep({
        id: 'first',
        attachTo: { element: 'body', on: 'top' }
      });

      instance.addStep({
        id: 'second',
        attachTo: { element: '.does-not-exist-xyz', on: 'top' },
        waitForElement: 50
      });

      instance.start();

      await instance.next();

      expect(
        instance.getCurrentStep().id,
        'step is shown centered once the wait times out'
      ).toBe('second');
      expect(
        spy,
        'console.error is logged for the still-missing element'
      ).toHaveBeenCalled();
      expect(
        instance.getCurrentStep().target,
        'target is falsy since the element never resolved'
      ).toBeFalsy();

      spy.mockRestore();
    });

    it('skips the step when waitForElement times out and skipMissingElement is true', async () => {
      instance = new Shepherd.Tour();

      instance.addStep({
        id: 'first',
        attachTo: { element: 'body', on: 'top' }
      });

      instance.addStep({
        id: 'second',
        attachTo: { element: '.does-not-exist-xyz', on: 'top' },
        waitForElement: 50,
        skipMissingElement: true
      });

      instance.addStep({
        id: 'third',
        attachTo: { element: 'body', on: 'top' }
      });

      instance.start();

      await instance.next();

      expect(
        instance.getCurrentStep().id,
        'second step is skipped once the wait times out'
      ).toBe('third');
    });

    it('completes after waiting when trailing steps are skipped', async () => {
      instance = new Shepherd.Tour();

      instance.addStep({
        id: 'first',
        attachTo: { element: 'body', on: 'top' }
      });

      instance.addStep({
        id: 'second',
        attachTo: { element: '.does-not-exist-xyz', on: 'top' },
        waitForElement: 50,
        skipMissingElement: true
      });

      let completeFired = false;
      instance.on('complete', () => {
        completeFired = true;
      });

      instance.start();

      await instance.next();

      expect(
        completeFired,
        'complete fires once the trailing step finishes waiting and is skipped'
      ).toBe(true);
    });

    it('a newer show() supersedes a pending waitForElement wait', async () => {
      instance = new Shepherd.Tour();

      instance.addStep({
        id: 'first',
        attachTo: { element: 'body', on: 'top' }
      });

      instance.addStep({
        id: 'second',
        attachTo: { element: '.does-not-exist-xyz', on: 'top' },
        waitForElement: 200
      });

      instance.addStep({
        id: 'third',
        attachTo: { element: 'body', on: 'top' }
      });

      instance.start();

      const shownStepIds = [];
      instance.on('show', ({ step }) => {
        shownStepIds.push(step.id);
      });

      const promise = instance.show(1);
      instance.show(2);

      expect(
        instance.getCurrentStep().id,
        'show(2) synchronously supersedes the pending wait from show(1)'
      ).toBe('third');

      await promise;
      await sleep(250);

      expect(
        instance.getCurrentStep().id,
        'currentStep is still the third step after the superseded wait settles'
      ).toBe('third');
      expect(
        shownStepIds.includes('second'),
        'the show event never fires for the superseded second step'
      ).toBe(false);
    });

    it('cancelling during a waitForElement wait does not resurrect the tour', async () => {
      instance = new Shepherd.Tour();

      instance.addStep({
        id: 'first',
        attachTo: { element: 'body', on: 'top' }
      });

      instance.addStep({
        id: 'second',
        attachTo: { element: '.does-not-exist-xyz', on: 'top' },
        waitForElement: 100,
        skipMissingElement: true
      });

      instance.start();

      let showFiredAfterCancel = false;
      let completeFiredAfterCancel = false;
      instance.on('show', () => {
        showFiredAfterCancel = true;
      });
      instance.on('complete', () => {
        completeFiredAfterCancel = true;
      });

      const promise = instance.next();
      instance.cancel();

      await promise;
      await sleep(150);

      expect(
        Shepherd.activeTour,
        'activeTour stays null after cancel'
      ).toBeNull();
      expect(showFiredAfterCancel, 'no show event fires after cancel').toBe(
        false
      );
      expect(
        completeFiredAfterCancel,
        'no complete event fires after cancel'
      ).toBe(false);
    });

    it('awaits a wait on the step skipped to by skipMissingElement', async () => {
      instance = new Shepherd.Tour();

      instance.addStep({
        id: 'first',
        attachTo: { element: 'body', on: 'top' }
      });

      instance.addStep({
        id: 'skipped',
        attachTo: { element: '.does-not-exist-xyz', on: 'top' },
        skipMissingElement: true
      });

      instance.addStep({
        id: 'waits',
        attachTo: { element: '.appears-after-skip-xyz', on: 'top' },
        waitForElement: 1000
      });

      instance.start();

      const promise = instance.next();

      let appearedElement;
      setTimeout(() => {
        appearedElement = document.createElement('div');
        appearedElement.classList.add('appears-after-skip-xyz');
        document.body.appendChild(appearedElement);
      }, 30);

      await promise;

      expect(
        instance.getCurrentStep().id,
        'next() resolves only once the step skipped to has finished waiting'
      ).toBe('waits');
      expect(
        instance.getCurrentStep().target,
        'the waited-for element is the resolved target'
      ).toBe(appearedElement);

      document.body.removeChild(appearedElement);
    });

    it('awaits a wait on the step skipped to by showOn', async () => {
      instance = new Shepherd.Tour();

      instance.addStep({
        id: 'first',
        attachTo: { element: 'body', on: 'top' }
      });

      instance.addStep({
        id: 'skipped',
        showOn: () => false
      });

      instance.addStep({
        id: 'waits',
        attachTo: { element: '.appears-after-show-on-xyz', on: 'top' },
        waitForElement: 1000
      });

      instance.start();

      const promise = instance.next();

      let appearedElement;
      setTimeout(() => {
        appearedElement = document.createElement('div');
        appearedElement.classList.add('appears-after-show-on-xyz');
        document.body.appendChild(appearedElement);
      }, 30);

      await promise;

      expect(
        instance.getCurrentStep().id,
        'next() resolves only once the step skipped to has finished waiting'
      ).toBe('waits');

      document.body.removeChild(appearedElement);
    });
  });

  describe('lifecycle edge cases', () => {
    const tours = [];
    const flush = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));
    const overlays = () =>
      document.querySelectorAll('.shepherd-modal-overlay-container');
    const visiblePopups = () =>
      [...document.querySelectorAll('.shepherd-element')].filter(
        (popup) => !popup.hidden
      );
    const makeTour = (options = {}) => {
      const tour = new Shepherd.Tour({ useModalOverlay: true, ...options });
      tours.push(tour);
      return tour;
    };
    const gatedStep = (resolvers) => ({
      id: 'gated',
      text: 'gated',
      beforeShowPromise: () => new Promise((resolve) => resolvers.push(resolve))
    });

    beforeEach(() => {
      // The file's outer `afterEach` completes `instance`.
      instance = makeTour();
    });

    afterEach(() => {
      tours.splice(0).forEach((tour) => {
        tour.options.confirmCancel = undefined;
        tour.complete();
      });
    });

    it('stays ended when a hide handler ends the tour during a restart', () => {
      const tour = makeTour();
      const first = tour.addStep({ id: 'first', text: 'first' });
      tour.start();
      first.on('hide', () => tour.complete());

      tour.start();

      expect(tour.isActive()).toBe(false);
      expect(overlays()).toHaveLength(0);
      expect(visiblePopups()).toHaveLength(0);
    });

    it('keeps the open step dimmed when setupModal replaces the modal', () => {
      const tour = makeTour();
      tour.addStep({ id: 'first', text: 'first' });
      tour.start();

      tour.setupModal();

      expect(overlays()).toHaveLength(1);
      expect(overlays()[0]).toHaveClass('shepherd-modal-is-visible');
    });

    it('leaves a replacement modal hidden when the current step is hidden', () => {
      const tour = makeTour();
      tour.addStep({ id: 'first', text: 'first' });
      tour.start();
      tour.hide();

      tour.setupModal();

      expect(overlays()).toHaveLength(1);
      expect(overlays()[0]).not.toHaveClass('shepherd-modal-is-visible');
    });

    it('does not render a removed step whose beforeShowPromise was pending', async () => {
      const resolvers = [];
      const tour = makeTour({ confirmCancel: () => Promise.resolve(false) });
      tour.addStep(gatedStep(resolvers));
      tour.start();

      tour.removeStep('gated');
      await flush();
      resolvers[0]();
      await flush();

      expect(visiblePopups()).toHaveLength(0);
    });

    it('does not render a pending step after tour.hide(), and can show it again', async () => {
      const resolvers = [];
      const tour = makeTour();
      tour.addStep({ id: 'first', text: 'first' });
      const gated = tour.addStep(gatedStep(resolvers));
      tour.start();
      tour.next();

      tour.hide();
      resolvers[0]();
      await flush();
      expect(gated.isOpen()).toBe(false);

      tour.show('gated');
      resolvers[1]();
      await flush();
      expect(gated.isOpen()).toBe(true);
    });

    it('renders once, for the latest call, when step.show() is called twice', async () => {
      const resolvers = [];
      const tour = makeTour();
      const gated = tour.addStep(gatedStep(resolvers));
      const shown = vi.fn();
      gated.on('before-show', shown);

      gated.show();
      gated.show();
      resolvers[0]();
      await flush();
      expect(shown).not.toHaveBeenCalled();

      resolvers[1]();
      await flush();
      expect(shown).toHaveBeenCalledTimes(1);
      expect(gated.isOpen()).toBe(true);
    });

    it('does not render a pending beforeShowPromise step after another tour starts', async () => {
      const resolvers = [];
      const first = makeTour();
      const gated = first.addStep(gatedStep(resolvers));
      const second = makeTour();
      second.addStep({ id: 'other', text: 'other' });

      first.start();
      second.start();
      resolvers[0]();
      await flush();

      expect(gated.isOpen()).toBe(false);
      expect(second.isActive()).toBe(true);
    });

    it('does not render a pending waitForElement step after another tour starts', async () => {
      const first = makeTour();
      const waiting = first.addStep({
        id: 'waiting',
        text: 'waiting',
        attachTo: { element: '#never-there', on: 'bottom' },
        waitForElement: 10
      });
      const second = makeTour();
      second.addStep({ id: 'other', text: 'other' });

      first.start();
      second.start();
      await flush(30);

      expect(waiting.isOpen()).toBe(false);
    });

    it('does not clear another tour when a late confirmCancel ends this one', async () => {
      const answers = [];
      const first = makeTour({
        confirmCancel: () => new Promise((resolve) => answers.push(resolve))
      });
      first.addStep({ id: 'first', text: 'first' });
      const second = makeTour();
      second.addStep({ id: 'other', text: 'other' });

      first.start();
      const cancelling = first.cancel();
      second.start();
      answers[0](true);
      await cancelling;

      expect(second.isActive()).toBe(true);
    });
  });
});
