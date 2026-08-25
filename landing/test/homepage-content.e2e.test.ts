import { describe, expect, it } from 'vitest';

import { visibleText } from './helpers';
import { TEST_BASE_URL } from './setup/dev-server';

describe('homepage content without JavaScript', () => {
  it('serves HTML with an H1 naming the brand', async () => {
    const response = await fetch(`${TEST_BASE_URL}/`, {
      headers: { Accept: 'text/html' }
    });
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(html).toMatch(/<h1[\s>]/);

    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    expect(visibleText(h1![1]!)).toContain('Shepherd');
  });

  it('has 500+ chars of visible text in the raw HTML', async () => {
    const response = await fetch(`${TEST_BASE_URL}/`, {
      headers: { Accept: 'text/html' }
    });
    const html = await response.text();

    expect(visibleText(html).length).toBeGreaterThan(500);
  });
});
