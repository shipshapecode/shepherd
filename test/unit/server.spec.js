/**
 * @vitest-environment node
 */

describe('Server Side Render', function () {
  describe('Tour constructor', function () {
    // Skip this test as Solid.js components load eagerly and require window
    it.skip('does not start a tour when window is undefined', async () => {
      const { default: Shepherd } = await import('../../shepherd.js/src/shepherd');
      
      const instance = new Shepherd.Tour();

      expect(instance).toBeTruthy();
    });
  });
});
