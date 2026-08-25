import { describe, expect, it } from 'vitest';

import { TEST_BASE_URL } from './setup/dev-server';

describe('markdown content negotiation', () => {
  it('serves markdown when the client asks for text/markdown', async () => {
    const response = await fetch(`${TEST_BASE_URL}/`, {
      headers: { Accept: 'text/markdown' }
    });
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('text/markdown');
    expect(response.headers.get('vary')).toMatch(/accept/i);
    expect(body).toMatch(/^# Shepherd/);
  });

  it('sends Vary: Accept on the HTML response', async () => {
    const response = await fetch(`${TEST_BASE_URL}/`, {
      headers: { Accept: 'text/html' }
    });

    expect(response.headers.get('content-type')).toContain('text/html');
    expect(response.headers.get('vary')).toMatch(/accept/i);
  });

  it('serves HTML for a typical browser Accept header', async () => {
    const response = await fetch(`${TEST_BASE_URL}/`, {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });

    expect(response.headers.get('content-type')).toContain('text/html');
  });
});

describe('markdown mirror', () => {
  it('serves /index.md as markdown', async () => {
    const response = await fetch(`${TEST_BASE_URL}/index.md`);
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('text/markdown');
    expect(body).toMatch(/^# Shepherd/);
    expect(body).toContain('## When to use Shepherd');
  });
});
