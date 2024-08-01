import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import storyblok from '@storyblok/astro';
import tailwind from '@astrojs/tailwind';
import { loadEnv } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

const { STORYBLOK_TOKEN } = loadEnv(process.env.NODE_ENV, process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.shepherdpro.com',
  integrations: [
    mdx(),
    sitemap(),
    storyblok({
      accessToken: STORYBLOK_TOKEN,
      apiOptions: {
        region: 'us'
      },
      components: {
        'all-articles': 'storyblok/AllArticles',
        article: 'storyblok/Article'
      }
    }),
    tailwind()
  ],
  // vite: {
  //   plugins: [basicSsl()],
  //   server: {
  //     https: true
  //   }
  // }
  // redirects: {
  //   '/blog': '/'
  // }
});
