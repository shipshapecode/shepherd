import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { loadEnv } from 'vite';

const { STORYBLOK_TOKEN } = loadEnv(process.env.NODE_ENV, process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.shepherdpro.com',
  integrations: [
    mdx(),
    sitemap(),
    tailwind()
  ],
});
