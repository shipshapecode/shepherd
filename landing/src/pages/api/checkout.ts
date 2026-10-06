import { createPolar } from '@polar-sh/sdk/2026-10';
import type { APIRoute } from 'astro';

export const prerender = false;

// The checkout id placeholder is substituted by Polar after payment.
const SUCCESS_URL = 'https://docs.shepherdjs.dev/?checkoutId={CHECKOUT_ID}';

export const GET: APIRoute = async ({ url }) => {
  const products = url.searchParams.getAll('products');

  if (products.length === 0 || products.some((id) => id.trim() === '')) {
    return Response.json(
      { error: 'Missing products in query params' },
      { status: 400 }
    );
  }

  try {
    // Importing from the versioned subpath pins `Polar-Version: 2026-10` on every
    // request. To move to a newer API version, change the import path above.
    const polar = createPolar({
      accessToken: import.meta.env.POLAR_ACCESS_TOKEN ?? ''
    });
    const checkout = await polar.checkouts.create({
      products,
      success_url: SUCCESS_URL
    });

    return Response.redirect(checkout.url);
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
};
