import { vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/svelte';
import ShepherdHeader from '../../../shepherd.js/src/components/shepherd-header.svelte';
import { Tour } from '../../../shepherd.js/src/tour';
import { Step } from '../../../shepherd.js/src/step';

describe('components/ShepherdHeader', () => {
  beforeEach(cleanup);

  it('cancel icon is added when cancelIcon.enabled === true', () => {
    const step = {
      options: {
        cancelIcon: {
          enabled: true
        }
      }
    };

    const { container } = render(ShepherdHeader, {
      props: {
        step
      }
    });

    const cancelIcon = container.querySelector('.shepherd-cancel-icon');
    expect(cancelIcon).toBeInTheDocument();
    expect(cancelIcon).toHaveAttribute('aria-label', 'Close Tour');
    expect(cancelIcon).toHaveAttribute('type', 'button');
  });

  it('cancel icon is not added when cancelIcon.enabled === false', () => {
    const step = {
      options: {
        cancelIcon: {
          enabled: false
        }
      }
    };

    const { container } = render(ShepherdHeader, {
      props: {
        step
      }
    });

    const cancelIcon = container.querySelector('.shepherd-cancel-icon');

    expect(cancelIcon).not.toBeInTheDocument();
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

    const { container } = render(ShepherdHeader, {
      props: {
        step
      }
    });

    expect(container.querySelector('.shepherd-cancel-icon')).toHaveAttribute(
      'aria-label',
      'Test'
    );
  });

  it('cancel icon cancels the tour', async () => {
    const tour = new Tour();
    const step = new Step(tour, {
      cancelIcon: {
        enabled: true
      }
    });
    const stepCancelSpy = vi.spyOn(step, 'cancel');

    const { container } = render(ShepherdHeader, {
      props: {
        step
      }
    });

    fireEvent.click(container.querySelector('.shepherd-cancel-icon'));
    expect(stepCancelSpy).toHaveBeenCalled();
  });

  it('cancel icon renders with data attributes', () => {
    const step = {
      options: {
        cancelIcon: {
          enabled: true,
          dataAttributes: [
            { id: 'test', value: 'testValue' },
            { id: 'other', value: '1234' }
          ]
        }
      }
    };

    const { container } = render(ShepherdHeader, {
      props: {
        step
      }
    });

    const cancelIcon = container.querySelector('.shepherd-cancel-icon');
    expect(cancelIcon).toHaveAttribute('data-test', 'testValue');
    expect(cancelIcon).toHaveAttribute('data-other', '1234');
  });

  it('cancel icon renders with both label and data attributes', () => {
    const step = {
      options: {
        cancelIcon: {
          enabled: true,
          label: 'close the tour',
          dataAttributes: [
            { id: 'foo', value: 'someData' },
            { id: 'bar', value: '1234' }
          ]
        }
      }
    };

    const { container } = render(ShepherdHeader, {
      props: {
        step
      }
    });

    const cancelIcon = container.querySelector('.shepherd-cancel-icon');
    expect(cancelIcon).toHaveAttribute('aria-label', 'close the tour');
    expect(cancelIcon).toHaveAttribute('data-foo', 'someData');
    expect(cancelIcon).toHaveAttribute('data-bar', '1234');
  });

  it('renders title when provided', () => {
    const step = {
      options: {
        title: 'Test Title'
      }
    };

    const { container } = render(ShepherdHeader, {
      props: {
        step,
        labelId: 'test-label'
      }
    });

    const title = container.querySelector('.shepherd-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Test Title');
  });

  it('does not render title when not provided', () => {
    const step = {
      options: {}
    };

    const { container } = render(ShepherdHeader, {
      props: {
        step
      }
    });

    const title = container.querySelector('.shepherd-title');
    expect(title).not.toBeInTheDocument();
  });

  it('renders both title and cancel icon when both provided', () => {
    const step = {
      options: {
        title: 'Test Title',
        cancelIcon: {
          enabled: true
        }
      }
    };

    const { container } = render(ShepherdHeader, {
      props: {
        step,
        labelId: 'test-label'
      }
    });

    const title = container.querySelector('.shepherd-title');
    const cancelIcon = container.querySelector('.shepherd-cancel-icon');

    expect(title).toBeInTheDocument();
    expect(cancelIcon).toBeInTheDocument();
  });

  it('header has correct CSS class', () => {
    const step = {
      options: {
        title: 'Test Title'
      }
    };

    const { container } = render(ShepherdHeader, {
      props: {
        step,
        labelId: 'test-label'
      }
    });

    const header = container.querySelector('.shepherd-header');
    expect(header).toBeInTheDocument();
    expect(header.tagName.toLowerCase()).toBe('header');
  });
});
