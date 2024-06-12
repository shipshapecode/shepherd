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
import Shepherd from 'shepherd.js';

global.fetch = vi.fn();

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

  it.skip('adds the event listeners expected', () => {
    ShepherdPro.init('api_123');

    expect(ShepherdPro.trigger).to.be.a('function');

    ShepherdPro.trigger('show');

    expect(consoleMock).toHaveBeenCalledOnce();
    expect(consoleMock).toHaveBeenLastCalledWith('Event triggered: show');
  });

  it('creates a Tour instance', () => {
    const defaultStepOptions = {
      classes: 'class-1 class-2'
    };
    ShepherdPro.init('api_123');
    const tourInstance = new ShepherdPro.Tour({ defaultStepOptions });

    expect(tourInstance instanceof Shepherd.Tour).toBe(true);
  });

  it('can use the dataRequester to sendEvents()', async () => {
    ShepherdPro.init('api_123');

    expect(ShepherdPro.dataRequester?.sendEvents).to.be.a('function');
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: () => new Promise((resolve) => resolve(null))
    });

    const data = await ShepherdPro.dataRequester?.sendEvents({});

    expect(data).toMatchObject({});
  });
});
