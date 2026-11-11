import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Must match the host actually served in production; the apex
  // shepherdjs.dev 308-redirects to www, so canonical URLs and the
  // sitemap need to use www to avoid redirect chains.
  site: 'https://www.shepherdjs.dev',

  integrations: [
    mdx(),
    sitemap({
      // The homepage is rendered on demand (for markdown content
      // negotiation), so the sitemap integration cannot discover it
      // at build time.
      customPages: ['https://www.shepherdjs.dev/']
    })
  ],

  // Astro 7's compressor drops the space between text and an inline
  // element on the next line ("visit<a>"), so keep source whitespace.
  compressHTML: false,
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  }
});
