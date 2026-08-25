import type { APIRoute } from 'astro';

import { homepageMarkdown } from '../lib/homepage-markdown';

// Rendered on demand rather than prerendered: a static index.md file would
// be picked up by Vercel's filesystem handler as the directory index for `/`
// (there is no static index.html — the homepage is content negotiated), which
// would serve raw markdown to every visitor before the negotiation route runs.
export const prerender = false;

export const GET: APIRoute = () => {
  return new Response(homepageMarkdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    }
  });
};
