import { jest } from '@jest/globals';

import Shepherd from '../../shepherd.js/src/shepherd';
import DataRequest from '../../shepherd.js/src/utils/datarequest';

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
};

describe('Shepherd Pro', function () {
  const sendEventsMock = jest
    .spyOn(DataRequest.prototype, 'sendEvents')
    .mockImplementation(() => Promise.resolve({ actorId: 1 }));

  const getTourStateMock = jest
    .spyOn(DataRequest.prototype, 'getTourState')
    .mockImplementation(() => Promise.resolve([{ accountId: 1, uniqueId: 'tour-1', isActive: true }]));

  afterAll(() => {
    sendEventsMock.mockReset();
  });

  it('exists and creates an instance', () => {
    const proInstance = new Shepherd.Tour();

    expect(Shepherd).toBeTruthy();
    expect(proInstance).toBeInstanceOf(Shepherd.Tour);
  });

  it('returns an error if no apiKey is passed', async () => {
    await expect(() => Shepherd.init()).rejects.toThrow(
      'Shepherd Pro: Missing required apiKey option.'
    );
  });

  it('sends events and passes properties and context', () => {
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => windowProps);

    Shepherd.init('api_123', 'https://api.shepherdpro.com', { extra: 'stuff' });

    expect(typeof Shepherd.trigger).toBe('function');
    expect(Shepherd.dataRequester.properties).toMatchObject({
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

    Shepherd.trigger('show');

    expect(sendEventsMock).toHaveBeenCalled();

    windowSpy.mockRestore();
  });

  it('creates a Tour instance', () => {
    const defaultStepOptions = {
      classes: 'class-1 class-2'
    };
    Shepherd.init('api_123');
    const tourInstance = new Shepherd.Tour({ defaultStepOptions });

    expect(tourInstance instanceof Shepherd.Tour).toBe(true);
  });

  it('sets the userId', () => {
    Shepherd.init('api_123');

    const userStored = window.localStorage.getItem('shepherdPro:userId');
    expect(userStored).toBe('1');
  });
});
