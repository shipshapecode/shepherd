import { Checkout } from '@polar-sh/astro';

export const prerender = false;

export const GET = Checkout({
  accessToken: import.meta.env.POLAR_ACCESS_TOKEN ?? '',
  successUrl: 'https://docs.shepherdjs.dev'
});
