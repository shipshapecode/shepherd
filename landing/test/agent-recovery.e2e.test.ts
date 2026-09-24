import { describe, expect, it } from 'vitest';

import { TEST_BASE_URL } from './setup/dev-server';

describe('404 handling', () => {
  it('returns HTTP 404 with recovery links for nonexistent paths', async () => {
    const response = await fetch(
      `${TEST_BASE_URL}/some-path-that-does-not-exist`
    );
    const html = await response.text();

    expect(response.status).toBe(404);
    expect(html).toContain('/llms.txt');
    expect(html).toContain('/sitemap-index.xml');
    expect(html).toContain('https://docs.shepherdjs.dev');
  });
});

describe('llms.txt', () => {
  it('serves /llms.txt with when-to-use guidance', async () => {
    const response = await fetch(`${TEST_BASE_URL}/llms.txt`);
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toMatch(/^# Shepherd\.js/);
    expect(body).toContain('## When to use Shepherd');
    expect(body).toContain('https://docs.shepherdjs.dev/');
  });
});
