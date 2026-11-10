import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ResizeObserver from 'resize-observer-polyfill';

// happy-dom has no layout engine: every `getBoundingClientRect()` is 0x0 at the
// origin, so a real `computePosition` call always returns `{ x: 0, y: 0 }` and
// no assertion about coordinates can fail. These tests therefore stub the
// positioning engine's boundary and assert what Shepherd writes to
// `step.el.style` for a given resolved position payload.
const positionMock = vi.hoisted(() => ({
  // Overwritten per test to control exactly what the positioning callback gets.
  position: {
    x: 0,
    y: 0,
    strategy: 'absolute',
    placement: 'top',
    middlewareData: {}
  }
}));

vi.mock('../../../src/utils/position.ts', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    computePosition: vi.fn(() => ({ ...positionMock.position })),
    // Run the position callback once, synchronously, rather than wiring up the
    // scroll/resize observers that happy-dom cannot drive.
    autoUpdate: vi.fn((_target, _element, update) => {
      update();
      return () => {};
    })
  };
});

const Shepherd = (await import('../../../src/shepherd')).default;
const { destroyTooltip, setupTooltip } =
  await import('../../../src/utils/tooltip');

window.Shepherd = Shepherd;
window.ResizeObserver = ResizeObserver;

describe('utils/tooltip | position writing', function () {
  let instance, target;

  beforeEach(() => {
    target = document.createElement('div');
    target.classList.add('position-test');
    document.body.appendChild(target);
  });

  afterEach(() => {
    instance?.complete();
    target.remove();
    window.scrollTo(0, 0);
    positionMock.position = {
      x: 0,
      y: 0,
      strategy: 'absolute',
      placement: 'top',
      middlewareData: {}
    };
  });

  /**
   * Re-runs positioning with a caller-supplied engine payload and waits
   * for it to land on the element. The payload is swapped in *after*
   * `tour.start()` has already positioned the step once, so an assertion on
   * these values can only be satisfied by this `setupTooltip` call.
   */
  async function positionWith(step, position) {
    positionMock.position = { ...positionMock.position, ...position };

    setupTooltip(step);

    await vi.waitFor(() =>
      expect(step.el.dataset['popperPlacement']).toBe(
        positionMock.position.placement
      )
    );
  }

  it('writes the resolved coordinates to the step element', async () => {
    instance = new Shepherd.Tour();

    const step = instance.addStep({
      id: 'test',
      attachTo: { element: '.position-test', on: 'top' }
    });

    instance.start();

    await positionWith(step, { x: 13, y: 42, placement: 'bottom' });

    // `x` is horizontal and `y` is vertical. Transposing them puts every step
    // on the wrong side of its target.
    expect(step.el.style.left).toBe('13px');
    expect(step.el.style.top).toBe('42px');

    destroyTooltip(step);
  });

  it('stops repositioning a step once it is hidden', () => {
    instance = new Shepherd.Tour();

    const step = instance.addStep({
      id: 'test',
      attachTo: { element: '.position-test', on: 'top' }
    });

    instance.start();

    const stopRepositioning = vi.fn();
    step.cleanup = stopRepositioning;

    step.hide();

    expect(stopRepositioning).toHaveBeenCalledTimes(1);
    expect(step.cleanup).toBeNull();
  });

  it('writes coordinates unmodified while the page is scrolled', async () => {
    instance = new Shepherd.Tour();

    const step = instance.addStep({
      id: 'test',
      attachTo: { element: '.position-test', on: 'top' },
      positionOptions: { strategy: 'fixed' }
    });

    instance.start();

    window.scrollTo(120, 340);

    await positionWith(step, {
      x: 13,
      y: 42,
      strategy: 'fixed',
      placement: 'bottom'
    });

    // This is the shape of #3269: the engine's payload is already in the
    // coordinate space its own `strategy` implies, so adding (or subtracting)
    // the scroll offset here re-separates the step from its target by exactly
    // the scroll delta.
    expect(step.el.style.left).toBe('13px');
    expect(step.el.style.top).toBe('42px');
    expect(step.el.style.position).toBe('fixed');

    destroyTooltip(step);
  });

  it('takes the strategy from the resolved payload rather than the step options', async () => {
    instance = new Shepherd.Tour();

    // No `positionOptions.strategy` on the step at all. The CSS `position` still
    // has to follow what `computePosition` reports it used, because that payload
    // — not the raw user option — is what the returned coordinates are relative
    // to. Reading `step.options.positionOptions.strategy` instead would write
    // `absolute` here and reintroduce the coordinate-space mismatch.
    const step = instance.addStep({
      id: 'test',
      attachTo: { element: '.position-test', on: 'top' }
    });

    instance.start();

    expect(step.options.positionOptions?.strategy).toBeUndefined();

    await positionWith(step, {
      x: 13,
      y: 42,
      strategy: 'fixed',
      placement: 'bottom'
    });

    expect(step.el.style.position).toBe('fixed');

    destroyTooltip(step);
  });

  it('keeps centered steps viewport-centered whatever the payload says', async () => {
    instance = new Shepherd.Tour();

    // No `attachTo`, so this step is centered. Centering uses `left`/`top: 50%`
    // with a `translate(-50%, -50%)`, and those percentages have to resolve
    // against the viewport, so this branch must not follow the strategy.
    const step = instance.addStep({ id: 'test' });

    instance.start();

    await positionWith(step, {
      x: 13,
      y: 42,
      strategy: 'absolute',
      placement: 'bottom'
    });

    expect(step.el.style.position).toBe('fixed');
    expect(step.el.style.left).toBe('50%');
    expect(step.el.style.top).toBe('50%');
    expect(step.el.style.transform).toBe('translate(-50%, -50%)');

    destroyTooltip(step);
  });
});
