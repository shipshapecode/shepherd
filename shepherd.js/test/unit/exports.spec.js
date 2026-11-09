import { describe, expect, it } from 'vitest';
import Shepherd, { Step, Tour } from '../../src/shepherd';

describe('package exports', () => {
  it('exposes Tour and Step as named exports, the same classes as on the default', () => {
    expect(Tour).toBe(Shepherd.Tour);
    expect(Step).toBe(Shepherd.Step);
  });

  it('builds a working tour from the named export', () => {
    const tour = new Tour();
    tour.addStep({ id: 'only', text: 'hi' });
    expect(tour.getById('only')).toBeInstanceOf(Step);
  });
});
