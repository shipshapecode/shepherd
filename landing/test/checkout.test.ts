import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { GET } from '../src/pages/api/checkout';

type Context = Parameters<typeof GET>[0];

const callGet = (search: string) =>
  GET({
    url: new URL(`http://localhost/api/checkout${search}`)
  } as Context) as Promise<Response>;

const polarCheckoutResponse = () =>
  new Response(JSON.stringify({ url: 'https://polar.sh/checkout/abc' }), {
    status: 200,
    headers: { 'content-type': 'application/json' }
  });

describe('GET /api/checkout', () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn(async () => polarCheckoutResponse());
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('POLAR_ACCESS_TOKEN', 'test-token');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('creates a checkout with a pinned Polar API version and redirects to it', async () => {
    const response = await callGet('?products=prod_123');

    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toBe(
      'https://polar.sh/checkout/abc'
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [requestUrl, init] = fetchMock.mock.calls[0] as [
      string | URL,
      RequestInit
    ];
    expect(String(requestUrl)).toContain('https://api.polar.sh/v1/checkouts/');

    const headers = new Headers(init.headers);
    expect(headers.get('Polar-Version')).toBe('2026-10');
    expect(headers.get('Authorization')).toBe('Bearer test-token');

    const body = JSON.parse(init.body as string);
    expect(body.products).toEqual(['prod_123']);
    expect(body.success_url).toBe(
      'https://docs.shepherdjs.dev/?checkoutId={CHECKOUT_ID}'
    );
  });

  it('passes through multiple products', async () => {
    await callGet('?products=a&products=b');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, init] = fetchMock.mock.calls[0] as [string | URL, RequestInit];
    expect(JSON.parse(init.body as string).products).toEqual(['a', 'b']);
  });

  it('returns 400 without calling Polar when products are missing', async () => {
    const response = await callGet('');

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: 'Missing products in query params'
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns 500 when Polar responds with an error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    fetchMock.mockResolvedValue(
      new Response('{"detail":"boom"}', { status: 500 })
    );

    const response = await callGet('?products=prod_123');

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: 'Internal server error' });
  });

  it('returns 500 when the request to Polar fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    fetchMock.mockRejectedValue(new Error('network down'));

    const response = await callGet('?products=prod_123');

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: 'Internal server error' });
  });
});
