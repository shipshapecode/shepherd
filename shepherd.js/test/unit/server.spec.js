/**
 * @jest-environment node
 */

import { describe, expect, it } from 'vitest';
import Shepherd from '../../src/shepherd';
import { TourNoOp } from '../../src/utils/general';

describe('TourNoOp', function () {
  it('accepts module-level tour setup without doing anything', async () => {
    const tour = new TourNoOp();

    tour.addStep({ text: 'hi' }).on('complete', () => {});

    expect(await tour.start()).toBe(tour);
  });
});

describe('Server Side Render', function () {
  describe('Tour constructor', function () {
    it('does not start a tour when window is undefined', () => {
      const instance = new Shepherd.Tour();

      expect(instance).toBeTruthy();
    });
  });
});
