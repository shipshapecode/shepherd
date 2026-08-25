import { describe, expect, it } from 'vitest';

import { TEST_BASE_URL } from './setup/dev-server';

describe('homepage metadata', () => {
  it('has a canonical URL on the www domain', async () => {
    const response = await fetch(`${TEST_BASE_URL}/`, {
      headers: { Accept: 'text/html' }
    });
    const html = await response.text();

    expect(html).toContain(
      '<link rel="canonical" href="https://www.shepherdjs.dev/"'
    );
  });

  it('has og:image, og:type, and twitter card metadata', async () => {
    const response = await fetch(`${TEST_BASE_URL}/`, {
      headers: { Accept: 'text/html' }
    });
    const html = await response.text();

    expect(html).toContain('property="og:type"');
    expect(html).toContain('property="og:image"');
    expect(html).toContain('property="og:title"');
    expect(html).toContain('property="og:url"');
    expect(html).toContain('name="twitter:card"');
  });

  it('serves the og:image asset', async () => {
    const response = await fetch(`${TEST_BASE_URL}/img/og-image.png`);

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('image/png');
  });

  it('has valid JSON-LD structured data describing the software', async () => {
    const response = await fetch(`${TEST_BASE_URL}/`, {
      headers: { Accept: 'text/html' }
    });
    const html = await response.text();

    const match = html.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
    );
    expect(match).not.toBeNull();

    const data = JSON.parse(match![1]!);
    expect(data['@context']).toBe('https://schema.org');

    const types = data['@graph'].map(
      (node: { '@type': string }) => node['@type']
    );
    expect(types).toContain('SoftwareApplication');
    expect(types).toContain('Organization');
    expect(types).toContain('WebSite');

    const software = data['@graph'].find(
      (node: { '@type': string }) => node['@type'] === 'SoftwareApplication'
    );
    expect(software.name).toBe('Shepherd.js');
    expect(software.description).toBeTruthy();
    expect(software.url).toBe('https://www.shepherdjs.dev/');
    expect(software.offers).toBeTruthy();
    expect(software.sameAs).toContain(
      'https://github.com/shipshapecode/shepherd'
    );
  });
});

describe('robots.txt', () => {
  it('points at the sitemap on the www domain', async () => {
    const response = await fetch(`${TEST_BASE_URL}/robots.txt`);
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toContain(
      'Sitemap: https://www.shepherdjs.dev/sitemap-index.xml'
    );
  });
});
