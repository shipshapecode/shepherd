import preact from 'preact';
import { expect } from 'chai';
import { shallow } from 'preact-render-spy';
import { spy } from 'sinon';
import ShepherdHeader from '../../../src/js/components/shepherd-content/shepherd-header';
import { Tour } from '../../../src/js/tour';
import { Step } from '../../../src/js/step';

describe('components/ShepherdHeader', () => {
  const styles = {
    'cancel-link': ' shepherd-cancel-link',
    header: ' shepherd-header'
  };

  it('cancel link is added when showCancelLink === true', () => {
    const step = {
      options: {
        showCancelLink: true
      }
    };

    const header = <ShepherdHeader step={step} styles={styles}/>;
    expect(header).to.include(<button aria-label="Close Tour" class="shepherd-cancel-link" type="button"><span aria-hidden="true">×</span></button>);
  });

  it('cancel link is not added when showCancelLink === false', () => {
    const step = {
      options: {
        showCancelLink: false
      }
    };

    const header = <ShepherdHeader step={step} styles={styles}/>;
    expect(header).to.not.include(<button aria-label="Close Tour" className="shepherd-cancel-link" type="button"><span aria-hidden="true">×</span></button>);
  });

  it('cancel link cancels the tour', async () => {
    const tour = new Tour();
    const step = new Step(tour, {
      showCancelLink: true
    });
    const stepCancelSpy = spy(step, 'cancel');

    const header = shallow(<ShepherdHeader step={step} styles={styles}/>);
    await header.find('[onClick]').simulate('click', { preventDefault() {} });
    expect(stepCancelSpy.called).to.be.true;
  });
});
