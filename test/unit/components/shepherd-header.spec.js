// eslint-disable-next-line no-unused-vars
import preact from 'preact';
import { expect } from 'chai';
import { shallow } from 'preact-render-spy';
import { spy } from 'sinon';
import ShepherdHeader from '../../../src/js/components/shepherd-content/shepherd-header';
import { Tour } from '../../../src/js/tour';
import { Step } from '../../../src/js/step';

describe('components/ShepherdHeader', () => {
  const styles = {
    'cancel-icon': ' shepherd-cancel-icon',
    header: ' shepherd-header'
  };

  it('cancel icon is added when cancelIcon.enabled === true', () => {
    const step = {
      options: {
        cancelIcon: {
          enabled: true
        }
      }
    };

    const header = <ShepherdHeader step={step} styles={styles} />;
    expect(header).to.include(<button aria-label='Close Tour' class='shepherd-cancel-icon' type='button'><span aria-hidden='true'>×</span></button>);
  });

  it('cancel icon is not added when cancelIcon.enabled === false', () => {
    const step = {
      options: {
        cancelIcon: {
          enabled: false
        }
      }
    };

    const header = <ShepherdHeader step={step} styles={styles} />;
    expect(header).to.not.include(<button aria-label='Close Tour' className='shepherd-cancel-icon' type='button'><span aria-hidden='true'>×</span></button>);
  });

  it('cancel icon aria-label overridden when cancelIcon.label is set', () => {
    const step = {
      options: {
        cancelIcon: {
          enabled: true,
          label: 'Test'
        }
      }
    };

    const header = <ShepherdHeader step={step} styles={styles} />;
    expect(header).to.include(<button aria-label='Test' class='shepherd-cancel-icon' type='button'><span aria-hidden='true'>×</span></button>);
  });

  it('cancel icon cancels the tour', async () => {
    const tour = new Tour();
    const step = new Step(tour, {
      cancelIcon: {
        enabled: true
      }
    });
    const stepCancelSpy = spy(step, 'cancel');

    const header = shallow(<ShepherdHeader step={step} styles={styles} />);
    await header.find('[onClick]').simulate('click', { preventDefault() {} });
    expect(stepCancelSpy.called).to.be.true;
  });
});
