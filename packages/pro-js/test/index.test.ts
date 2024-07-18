import { type Mock, afterAll, describe, expect, it, vi } from 'vitest';
import ShepherdPro from '../src/index.ts';
import DataRequest from '../src/DataRequest';

global.fetch = vi.fn();

const tourData = {
  confirmCancel: false,
  exitOnEsc: true,
  id: 'clxw6cez30005qheo5w7s3gph',
  isActive: true,
  isAutoStart: false,
  keyboardNavigation: true,
  rules: [],
  steps: [],
  uniqueId: 'tour-1',
  useModalOverlay: true
};

const windowProps = {
  document: {
    referrer: ''
  },
  location: {
    ancestorOrigins: {},
    href: 'https://shepherdjs.dev/',
    origin: 'https://shepherdjs.dev',
    protocol: 'https:',
    host: 'shepherdjs.dev',
    hostname: 'shepherdjs.dev',
    port: '',
    pathname: '/',
    search: '',
    hash: ''
  },
  navigator: {
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    vendor: 'Google Inc.'
  },
  screen: {
    height: 1080,
    width: 1920
  }
} as Window & typeof globalThis;

describe('ShepherdPro', () => {
  const dataRequesterEventMock = vi
    .spyOn(DataRequest.prototype, 'sendEvents')
    .mockImplementation(() => Promise.resolve({ actorId: 1 }));

  afterAll(() => {
    dataRequesterEventMock.mockReset();
  });
  it('exists and creates an instance', () => {
    const proInstance = new ShepherdPro.Tour();

    expect(ShepherdPro).toBeTruthy();
    expect(proInstance).to.be.an.instanceOf(ShepherdPro.Tour);
  });

  it('returns an error if no apiKey is passed', () => {
    expect(() => ShepherdPro.init()).rejects.toThrowError(
      'Shepherd Pro: Missing required apiKey option.'
    );
  });

  it('adds the event listeners expected', () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: () =>
        new Promise((resolve) =>
          resolve({
            data: [tourData]
          })
        )
    });
    const tourShowMock = vi.spyOn(ShepherdPro.Tour.prototype, 'on');
    ShepherdPro.init('api_123');

    const journey = new ShepherdPro.Tour({});
    journey.trigger('show', journey);

    expect(journey.trigger).to.be.a('function');
    expect(tourShowMock).toHaveBeenCalled();
  });

  it('sets the userId', async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: () =>
        new Promise((resolve) =>
          resolve({
            data: [tourData]
          })
        )
    });
    await ShepherdPro.init('api_123');

    const userStored = localStorage.getItem('shepherdPro:userId');
    expect(userStored).toBe('1');
  });

  it('creates a Tour instance', () => {
    const defaultStepOptions = {
      classes: 'class-1 class-2'
    };
    ShepherdPro.init('api_123');
    const tourInstance = new ShepherdPro.Tour({ defaultStepOptions });

    expect(tourInstance instanceof ShepherdPro.Tour).toBe(true);
  });

  it('Shepherd.isTourEnabled is true when isActive is true', async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: () =>
        new Promise((resolve) =>
          resolve({
            data: [tourData]
          })
        )
    });
    const defaultStepOptions = {
      classes: 'class-1 class-2'
    };

    await ShepherdPro.init('api_123');

    new ShepherdPro.Tour({ defaultStepOptions, id: tourData.id });

    expect(await ShepherdPro.isTourEnabled(tourData.id)).toBe(true);
  });

  it('Shepherd.isTourEnabled is false when isActive is false', async () => {
    const tourDataFalse = {
      ...tourData,
      isActive: false
    };
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: () =>
        new Promise((resolve) =>
          resolve({
            data: [tourDataFalse]
          })
        )
    });
    const defaultStepOptions = {
      classes: 'class-1 class-2'
    };

    await ShepherdPro.init('api_123');

    new ShepherdPro.Tour({ defaultStepOptions, id: tourData.id });

    expect(await ShepherdPro.isTourEnabled(tourData.id)).toBe(false);
  });

  it('sends events and passes properties and context', async () => {
    const windowSpy = vi.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => windowProps);

    await ShepherdPro.init('api_123', 'https://shepherdpro.com', {
      extra: 'stuff'
    });

    expect(typeof ShepherdPro.trigger).toBe('function');
    expect(ShepherdPro.dataRequester?.getConfig().properties).toMatchObject({
      context: {
        $browser: 'Chrome',
        $browser_version: 123,
        $current_url: 'https://shepherdjs.dev/',
        $device: '',
        $host: 'shepherdjs.dev',
        $lib: 'js',
        $os: 'Mac OS X',
        $pathname: '/',
        $referrer: '',
        $referring_domain: '',
        $screen_height: 1080,
        $screen_width: 1920
      },
      extra: 'stuff'
    });

    ShepherdPro.trigger('show');

    expect(dataRequesterEventMock).toHaveBeenCalled();

    windowSpy.mockRestore();
  });

  it('converts button type strings to methods', async () => {
    const tourWithButtons = {
      ...tourData,
      steps: [
        {
          buttons: [
            {
              action: 'next'
            }
          ]
        }
      ]
    };
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: () =>
        new Promise((resolve) =>
          resolve({
            data: [tourWithButtons]
          })
        )
    });

    await ShepherdPro.init('api_123');
    const journey = await ShepherdPro.startJourney('clxw6cez30005qheo5w7s3gph');
    const button = journey?.steps[0].options.buttons?.[0];
    expect(button?.action).to.be.a('function');
  });

  it('starts a journey in indexDB by passed ID', async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: () =>
        new Promise((resolve) =>
          resolve({
            data: [tourData]
          })
        )
    });

    await ShepherdPro.init('api_123');
    await ShepherdPro.startJourney('clxw6cez30005qheo5w7s3gph');
    const proId = ShepherdPro.activeTour?.id?.split('--')[1];

    expect(proId).toEqual(tourData.id);
  });
});
