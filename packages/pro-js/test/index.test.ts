import {
  type Mock,
  afterAll,
  describe,
  expect,
  it,
  vi,
  beforeAll
} from 'vitest';
import ShepherdPro from '../src/index.ts';
import DataRequest from '../src/DataRequest';

global.fetch = vi.fn();

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
  const dataRequesterMock = vi
    .spyOn(DataRequest.prototype, 'sendEvents')
    .mockImplementation(() => Promise.resolve({}));

  beforeAll(() => {
    localStorage.setItem('shepherdPro:userId', JSON.stringify(true));
  });

  afterAll(() => {
    dataRequesterMock.mockReset();
  });
  it('exists and creates an instance', () => {
    const proInstance = new ShepherdPro.Tour();

    expect(ShepherdPro).toBeTruthy();
    expect(proInstance).to.be.an.instanceOf(ShepherdPro.Tour);
  });

  it('returns an error if no apiKey is passed', () => {
    // @ts-ignore - This is a test to make sure that the error is thrown
    expect(() => ShepherdPro.init()).toThrowError(
      'Shepherd Pro: Missing required apiKey option.'
    );
  });

  // it.skip('adds the event listeners expected', () => {
  //   ShepherdPro.init('api_123');

  //   expect(ShepherdPro.trigger).to.be.a('function');

  //   ShepherdPro.trigger('show');

  //   expect(consoleMock).toHaveBeenCalledOnce();
  //   expect(consoleMock).toHaveBeenLastCalledWith('Event triggered: show');
  // });

  it('sets the userId', async () => {
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
    const defaultStepOptions = {
      classes: 'class-1 class-2'
    };

    await ShepherdPro.init('api_123');

    new ShepherdPro.Tour({ defaultStepOptions, id: 'tour-1' });

    expect(await ShepherdPro.isTourEnabled('tour-1')).toBe(true);
  });

  it('Shepherd.isTourEnabled is false when isActive is false', async () => {
    (fetch as Mock).mockResolvedValue((req) => {
      if (req.url === 'https://shepherdpro.com/api/v1/state') {
        return Promise.resolve(
          JSON.stringify({
            data: [{ uniqueId: 'tour-1', isActive: false }]
          })
        );
      }
    });

    const defaultStepOptions = {
      classes: 'class-1 class-2'
    };

    await ShepherdPro.init('api_123');

    new ShepherdPro.Tour({ defaultStepOptions, id: 'tour-1' });

    expect(await ShepherdPro.isTourEnabled('tour-1')).toBe(false);
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

    expect(dataRequesterMock).toHaveBeenCalled();

    windowSpy.mockRestore();
  });
});
