/**
 * @jest-environment node
 */

import { describe, expect, it } from 'vitest';
import Shepherd from '../../src/shepherd';

describe('Server Side Render', function () {
  describe('Tour constructor', function () {
    it('does not start a tour when window is undefined', () => {
      const instance = new Shepherd.Tour();

      expect(instance).toBeTruthy();
    });
  });
});
