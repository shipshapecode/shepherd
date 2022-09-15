
import Shepherd from '../../src/js/shepherd';

describe('Server Side Render', function() {
  let windowSpy;

  beforeAll(() => {
    windowSpy = jest.spyOn(window, "window", "get");
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  describe('Tour constructor', function() {
    it('does not start a tour when window is undefined', () => {
      windowSpy.mockImplementation(() => undefined);
      
      const instance = new Shepherd.Tour();
      
      expect(instance).toBeUndefined();
    });
  });
});
