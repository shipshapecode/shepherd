import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { glideSteps, stepProgress } from '../../src/motion.ts';
import { Tour } from '../../src/tour';

describe('motion', () => {
  let tour;
  let reduced;

  beforeEach(() => {
    reduced = false;
    vi.stubGlobal('matchMedia', () => ({ matches: reduced }));
    vi.stubGlobal('requestAnimationFrame', (callback) => {
      callback(0);
      return 1;
    });
    Element.prototype.animate = vi.fn();
    tour = new Tour();
    tour.addStep({ id: 'one', text: 'one' });
    tour.addStep({ id: 'two', text: 'two' });
  });

  afterEach(() => {
    if (tour.isActive()) {
      tour.complete();
    }
    vi.unstubAllGlobals();
    delete Element.prototype.animate;
  });

  describe('glideSteps', () => {
    function rectEachElement() {
      const original = Element.prototype.getBoundingClientRect;
      let left = 0;
      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(
        function () {
          if (!this.classList?.contains('shepherd-element')) {
            return original.call(this);
          }
          // Each element sits 100px right of the one created before it.
          this.left ??= left++ * 100;
          return { left: this.left, top: 0, width: 50, height: 50 };
        }
      );
    }

    afterEach(() => vi.restoreAllMocks());

    it('leaves the first step alone', () => {
      rectEachElement();
      glideSteps(tour);
      tour.start();

      expect(Element.prototype.animate).not.toHaveBeenCalled();
    });

    it('animates translate from the previous dialog to the new one', () => {
      rectEachElement();
      glideSteps(tour, 300);
      tour.start();
      tour.next();

      expect(Element.prototype.animate).toHaveBeenCalledTimes(1);
      const [keyframes, options] = Element.prototype.animate.mock.calls[0];
      expect(keyframes.translate[0]).toMatch(/^-?\d+(\.\d+)?px 0px$/);
      expect(keyframes.translate[1]).toBe('0 0');
      expect(options.duration).toBe(300);
    });

    it('does nothing under reduced motion', () => {
      rectEachElement();
      reduced = true;
      glideSteps(tour);
      tour.start();
      tour.next();

      expect(Element.prototype.animate).not.toHaveBeenCalled();
    });

    it('does not glide from the last run when the tour restarts', () => {
      rectEachElement();
      glideSteps(tour);
      tour.start();
      tour.complete();
      tour.start();

      expect(Element.prototype.animate).not.toHaveBeenCalled();
    });

    it('stops when disposed', () => {
      rectEachElement();
      const stop = glideSteps(tour);
      stop();
      tour.start();
      tour.next();

      expect(Element.prototype.animate).not.toHaveBeenCalled();
    });
  });

  describe('stepProgress', () => {
    it('exposes the position and count on each dialog', () => {
      stepProgress(tour);
      tour.start();
      tour.next();

      const { style } = tour.getCurrentStep().getElement();
      expect(style.getPropertyValue('--shepherd-step')).toBe('2');
      expect(style.getPropertyValue('--shepherd-steps')).toBe('2');
    });

    it('does nothing for a step still waiting when it is stopped', async () => {
      let release;
      tour.steps[0].options.beforeShowPromise = () =>
        new Promise((resolve) => (release = resolve));
      const stop = stepProgress(tour);
      const shown = tour.start();

      stop();
      release();
      await shown;

      const { style } = tour.getCurrentStep().getElement();
      expect(style.getPropertyValue('--shepherd-step')).toBe('');
    });
  });
});
