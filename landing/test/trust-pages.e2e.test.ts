import { describe, expect, it } from 'vitest';

import { visibleText } from './helpers';
import { TEST_BASE_URL } from './setup/dev-server';

describe('trust anchor pages', () => {
  for (const path of ['/about', '/contact', '/privacy']) {
    it(`serves ${path} with at least 500 characters of content`, async () => {
      const response = await fetch(`${TEST_BASE_URL}${path}`);
      const html = await response.text();

      expect(response.status).toBe(200);
      expect(html).toMatch(/<h1[\s>]/);
      expect(visibleText(html).length).toBeGreaterThan(500);
    });
  }

  it('links the trust pages from the footer', async () => {
    const response = await fetch(`${TEST_BASE_URL}/`, {
      headers: { Accept: 'text/html' }
    });
    const html = await response.text();

    expect(html).toContain('href="/about"');
    expect(html).toContain('href="/contact"');
    expect(html).toContain('href="/privacy"');
  });
});
