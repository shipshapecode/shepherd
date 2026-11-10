import { afterEach, describe, expect, it, vi } from 'vitest';
import { makeOverlayPath } from '../../../src/utils/overlay-path.ts';

describe('makeOverlayPath', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  function viewport({ inner, client }) {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(inner[0]);
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(inner[1]);
    const html = document.documentElement;
    vi.spyOn(html, 'clientWidth', 'get').mockReturnValue(client[0]);
    vi.spyOn(html, 'clientHeight', 'get').mockReturnValue(client[1]);
  }

  it('covers the window', () => {
    viewport({ inner: [1024, 768], client: [1009, 768] });

    expect(makeOverlayPath([])).toBe('M1024,768H0V0H1024V768Z');
  });

  it('covers the layout viewport while pinch zoom shrinks the window size', () => {
    viewport({ inner: [160, 280], client: [400, 700] });

    expect(makeOverlayPath([])).toBe('M400,700H0V0H400V700Z');
  });
});
