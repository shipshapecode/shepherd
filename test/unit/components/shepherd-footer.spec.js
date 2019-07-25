import preact from 'preact';
import ShepherdFooter from '../../../src/js/components/shepherd-content/shepherd-footer';
import { expect } from 'chai';
import defaultButtons from '../../cypress/utils/default-buttons';

describe('components/ShepherdFooter', () => {
  const styles = {
    button: ' shepherd-button',
    footer: ' shepherd-footer'
  };

  it('renders no buttons if an empty array is passed to `options.buttons`', () => {
    const step = {
      options: {
        buttons: []
      }
    };

    const footer = <ShepherdFooter step={step} styles={styles}/>;
    expect(footer).to.equal(<footer className="shepherd-footer"></footer>);
  });

  it('renders no buttons if nothing is passed to `options.buttons`', () => {
    const step = { options: {} };

    const footer = <ShepherdFooter step={step} styles={styles}/>;
    expect(footer).to.equal(<footer className="shepherd-footer"></footer>);
  });

  it('renders buttons for each item passed to `options.buttons`', () => {
    const step = {
      options: {
        buttons: [
          defaultButtons.cancel,
          defaultButtons.next
        ]
      }
    };

    const footer = <ShepherdFooter step={step} styles={styles}/>;
    expect(footer).to.contain(<button class="shepherd-button-secondary cancel-button shepherd-button" tabindex="0">Exit</button>);
    expect(footer).to.contain(<button class="shepherd-button-primary next-button shepherd-button" tabindex="0">Next</button>);
  });
});
