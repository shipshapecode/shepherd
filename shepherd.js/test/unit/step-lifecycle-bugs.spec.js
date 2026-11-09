import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Tour } from '../../src/tour';

describe('step and tour behavior found in review', () => {
  let tour;
  let targets;

  const target = (id) => {
    const el = document.createElement('div');
    el.id = id;
    document.body.append(el);
    targets.push(el);
    return el;
  };

  beforeEach(() => {
    targets = [];
  });

  afterEach(() => {
    if (tour?.isActive()) tour.complete();
    targets.forEach((el) => el.remove());
    vi.restoreAllMocks();
  });

  describe('updateStepOptions on an open step', () => {
    it('keeps the step visible and its target marked', () => {
      const a = target('a');
      tour = new Tour();
      tour.addStep({
        id: 'one',
        text: 'one',
        attachTo: { element: a, on: 'bottom' }
      });
      tour.start();
      const step = tour.getCurrentStep();

      step.updateStepOptions({ text: 'changed' });

      expect(step.isOpen()).toBe(true);
      expect(step.getElement().classList).toContain('shepherd-enabled');
      expect(a.classList).toContain('shepherd-target');
      expect(a.classList).toContain('shepherd-enabled');
    });

    it('moves to a new attachTo target', () => {
      const a = target('a');
      const b = target('b');
      tour = new Tour();
      tour.addStep({
        id: 'one',
        text: 'one',
        attachTo: { element: a, on: 'bottom' }
      });
      tour.start();
      const step = tour.getCurrentStep();

      step.updateStepOptions({ attachTo: { element: b, on: 'top' } });

      expect(step.getTarget()).toBe(b);
      expect(b.classList).toContain('shepherd-target');
      expect(a.classList).not.toContain('shepherd-target');
    });

    it('swaps the highlight class on the target', () => {
      const a = target('a');
      tour = new Tour();
      tour.addStep({
        id: 'one',
        text: 'one',
        attachTo: { element: a, on: 'bottom' },
        highlightClass: 'old'
      });
      tour.start();

      tour.getCurrentStep().updateStepOptions({ highlightClass: 'new' });
      expect(a.classList).not.toContain('old');
      expect(a.classList).toContain('new');

      tour.complete();
      expect(a.classList).not.toContain('new');
    });
  });

  it('leaves a tabindex the app set after the step was hidden', () => {
    const a = target('a');
    const b = target('b');
    tour = new Tour();
    tour.addStep({
      id: 'one',
      text: 'one',
      attachTo: { element: a, on: 'bottom' }
    });
    tour.addStep({
      id: 'two',
      text: 'two',
      attachTo: { element: b, on: 'bottom' }
    });
    tour.start();
    tour.next();
    expect(a.hasAttribute('tabindex'), 'restored on hide').toBe(false);

    a.setAttribute('tabindex', '5');
    tour.complete();

    expect(a.getAttribute('tabindex')).toBe('5');
  });

  it('advances once on an arrow key when steps share a target', () => {
    const a = target('a');
    tour = new Tour();
    for (const id of ['one', 'two', 'three', 'four']) {
      tour.addStep({ id, text: id, attachTo: { element: a, on: 'bottom' } });
    }
    tour.start();
    tour.next();

    a.dispatchEvent(
      new KeyboardEvent('keydown', { keyCode: 39, bubbles: true })
    );

    expect(tour.getCurrentStep().id).toBe('three');
  });

  it('renders text given as an array without separators', () => {
    tour = new Tour();
    tour.addStep({ id: 'one', text: ['<p>a</p>', '<p>b</p>'] });
    tour.start();

    expect(
      tour.getCurrentStep().getElement().querySelector('.shepherd-text')
        .innerHTML
    ).toBe('<p>a</p><p>b</p>');
  });

  it('moves Tab focus from the target to a dialog with no controls', () => {
    const a = target('a');
    tour = new Tour();
    tour.addStep({
      id: 'one',
      text: 'one',
      attachTo: { element: a, on: 'bottom' }
    });
    tour.start();
    a.focus();

    const event = new KeyboardEvent('keydown', {
      keyCode: 9,
      bubbles: true,
      cancelable: true
    });
    a.dispatchEvent(event);

    expect(document.activeElement).toBe(tour.getCurrentStep().getElement());
  });

  it('uses a promise given as confirmCancel instead of asking the browser', async () => {
    const confirm = vi.fn(() => true);
    window.confirm = confirm;
    tour = new Tour({ confirmCancel: Promise.resolve(false) });
    tour.addStep({ id: 'one', text: 'one' });
    tour.start();

    await tour.cancel();

    expect(confirm).not.toHaveBeenCalled();
    expect(tour.isActive()).toBe(true);
    delete window.confirm;
  });
});
