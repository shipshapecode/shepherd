import { cleanup, render } from '@testing-library/svelte';
import ShepherdFooter from '../../../shepherd.js/src/components/shepherd-footer.svelte';
import defaultButtons from '../../cypress/utils/default-buttons.js';

describe('components/ShepherdFooter', () => {
  beforeEach(cleanup);

  it('renders no buttons if an empty array is passed to `options.buttons`', () => {
    const step = {
      options: {
        buttons: []
      }
    };

    const { container } = render(ShepherdFooter, {
      props: {
        step
      }
    });

    const buttons = container.querySelectorAll('.shepherd-footer .shepherd-button');
    expect(buttons.length).toBe(0);
  });

  it('renders no buttons if nothing is passed to `options.buttons`', () => {
    const step = { options: {} };

    const { container } = render(ShepherdFooter, {
      props: {
        step
      }
    });

    const buttons = container.querySelectorAll('.shepherd-footer .shepherd-button');
    expect(buttons.length).toBe(0);
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

    const { container } = render(ShepherdFooter, {
      props: {
        step
      }
    });

    const buttons = container.querySelectorAll('.shepherd-footer .shepherd-button');
    expect(buttons.length).toBe(2);

    const cancelButton = container.querySelector('footer .cancel-button');
    expect(cancelButton).toHaveAttribute('tabindex', '0');
    expect(cancelButton).toHaveClass('shepherd-button-secondary cancel-button shepherd-button');
    expect(cancelButton).toHaveTextContent('Exit');

    const nextButton = container.querySelector('footer .next-button');
    expect(nextButton).toHaveAttribute('tabindex', '0');
    expect(nextButton).toHaveClass('shepherd-button-primary next-button shepherd-button');
    expect(nextButton).toHaveTextContent('Next');
  });
});
