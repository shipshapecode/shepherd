import type { APIRoute } from 'astro';

import { homepageMarkdown } from '../lib/homepage-markdown';

export const GET: APIRoute = () => {
  return new Response(homepageMarkdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8'
    }
  });
};
