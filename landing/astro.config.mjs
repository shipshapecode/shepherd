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

  integrations: [mdx(), sitemap()],

  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  }
});
