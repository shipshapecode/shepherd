import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const landingDir = fileURLToPath(new URL('..', import.meta.url));

// The @astrojs/vercel adapter emits static assets into .vercel/output/static;
// older layouts used dist/client. These assertions only run after a build.
const staticDir = [
  join(landingDir, '.vercel/output/static'),
  join(landingDir, 'dist/client'),
  join(landingDir, 'dist')
].find((dir) => existsSync(join(dir, 'sitemap-index.xml')));

describe.skipIf(!staticDir)('build output', () => {
  it('includes the homepage in the sitemap, on the www domain only', () => {
    const sitemap = readFileSync(join(staticDir!, 'sitemap-0.xml'), 'utf-8');

    expect(sitemap).toContain('<loc>https://www.shepherdjs.dev/</loc>');
    expect(sitemap).not.toContain('<loc>https://shepherdjs.dev/');
  });

  it('emits index.md and does not prerender the negotiated homepage', () => {
    expect(existsSync(join(staticDir!, 'index.md'))).toBe(true);
    expect(existsSync(join(staticDir!, 'index.html'))).toBe(false);
  });
});
