import { describe, expect, it } from 'vitest';

import { TEST_BASE_URL } from './setup/dev-server';

describe('smoke', () => {
  it('serves the homepage', async () => {
    const response = await fetch(`${TEST_BASE_URL}/`);
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(html).toContain('Shepherd');
  });
});
