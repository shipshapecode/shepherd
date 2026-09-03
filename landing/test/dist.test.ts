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

  it('keeps the root free of static index files that would shadow negotiation', () => {
    // Vercel's filesystem handler runs before the `/` function route. A
    // static index.html would bypass negotiation entirely, and with no
    // index.html present a static index.md becomes the directory index for
    // `/`, serving raw markdown to every visitor. Both routes must be
    // rendered on demand.
    expect(existsSync(join(staticDir!, 'index.html'))).toBe(false);
    expect(existsSync(join(staticDir!, 'index.md'))).toBe(false);
  });

  it('routes / and /index.md to the render function', () => {
    const configPath = join(landingDir, '.vercel/output/config.json');

    if (!existsSync(configPath)) {
      return; // Older build layout without a deployment config.
    }

    const config = JSON.parse(readFileSync(configPath, 'utf-8'));
    const functionRoutes = config.routes
      .filter((route: { dest?: string }) => route.dest === '_render')
      .map((route: { src: string }) => route.src);

    expect(functionRoutes).toContain('^/$');
    // Since Astro 6, endpoints with a file extension are not served with a
    // trailing slash, so the emitted route pattern has no trailing `/?`.
    expect(functionRoutes).toContain('^/index\\.md$');
  });
});
