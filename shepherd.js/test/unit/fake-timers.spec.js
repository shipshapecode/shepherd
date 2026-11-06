import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Tour } from '../../src/shepherd';

// A consumer's test suite runs in a DOM with no layout and often calls
// `runAllTimers`, which throws if a timer keeps rescheduling itself.
describe('under fake timers', () => {
  let tour;

  beforeEach(() => {
    vi.useFakeTimers();
    const target = document.createElement('div');
    target.id = 'fake-timers-target';
    document.body.append(target);
  });

  afterEach(() => {
    tour.complete();
    vi.useRealTimers();
    document.getElementById('fake-timers-target').remove();
  });

  it('lets runAllTimers finish while a step is showing', () => {
    tour = new Tour();
    tour.addStep({
      text: 'hi',
      attachTo: { element: '#fake-timers-target', on: 'bottom' }
    });
    tour.start();

    expect(() => vi.runAllTimers()).not.toThrow();
  });
});
