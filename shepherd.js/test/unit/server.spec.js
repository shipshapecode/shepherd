/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest';
import Shepherd, { Step, Tour } from '../../src/shepherd';

describe('Server Side Render', function () {
  it('accepts module-level tour setup without doing anything', async () => {
    const tour = new Tour();

    tour.addStep({ text: 'hi' }).on('complete', () => {});

    expect(await tour.start()).toBe(tour);
    expect(new Step(tour, {}).show()).toBeTruthy();
  });

  it('reports an inactive tour and a closed step, as a browser would', () => {
    const tour = new Tour();

    expect(tour.isActive()).toBe(false);
    expect(tour.steps).toEqual([]);
    expect(new Step(tour, {}).isOpen()).toBe(false);
  });

  it('exposes the same no-op on the default export', () => {
    expect(Shepherd.Tour).toBe(Tour);
    expect(Shepherd.Step).toBe(Step);
  });
});
