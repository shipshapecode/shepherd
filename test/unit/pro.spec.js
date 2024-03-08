import Shepherd from '../../shepherd.js/src/shepherd';
import DataRequest from '../../shepherd.js/src/utils/datarequest';

describe('Shepherd Pro', function () {
  const dataRequesterMock = jest
    .spyOn(DataRequest.prototype, 'sendEvents')
    .mockImplementation(() => Promise.resolve({ actorId: 1 }));

  afterAll(() => {
    dataRequesterMock.mockReset();
  });
  it('exists and creates an instance', () => {
    const proInstance = new Shepherd.Tour();

    expect(Shepherd).toBeTruthy();
    expect(proInstance).toBeInstanceOf(Shepherd.Tour);
  });

  it('returns an error if no apiKey is passed', () => {
    expect(() => Shepherd.init()).toThrow(
      'Shepherd Pro: Missing required apiKey option.'
    );
  });

  it('adds the event listeners expected', () => {
    Shepherd.init('api_123');

    expect(typeof Shepherd.trigger).toBe('function');

    Shepherd.trigger('show');

    expect(dataRequesterMock).toHaveBeenCalled();
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
