import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('missing stylesheet warning', () => {
  let warn;

  const showTwoSteps = async () => {
    vi.resetModules();
    const { default: Shepherd } = await import('../../src/shepherd');
    const tour = new Shepherd.Tour();
    tour.addStep({ id: 'one', text: 'one' });
    tour.addStep({ id: 'two', text: 'two' });
    await tour.start();
    await tour.next();
    tour.complete();
  };

  const stubZIndex = (zIndex) =>
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({ zIndex });

  beforeEach(() => {
    warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('names the import, once per page, when the stylesheet is absent', async () => {
    stubZIndex('auto');

    await showTwoSteps();

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain(
      'shepherd.js/dist/css/shepherd.css'
    );
  });

  it('stays quiet when the stylesheet is applied', async () => {
    stubZIndex('9999');

    await showTwoSteps();

    expect(warn).not.toHaveBeenCalled();
  });
});
