import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createShepherdHeader } from '../../../src/components/shepherd-header.ts';
import { Tour } from '../../../src/tour';
import { Step } from '../../../src/step';

describe('components/ShepherdHeader', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it('cancel icon is added when cancelIcon.enabled === true', () => {
    const step = {
      options: {
        cancelIcon: {
          enabled: true
        }
      }
    };

    const el = createShepherdHeader('test-label', step);
    container.appendChild(el);

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

    const el = createShepherdHeader('test-label', step);
    container.appendChild(el);

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

    const el = createShepherdHeader('test-label', step);
    container.appendChild(el);

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

    const el = createShepherdHeader('test-label', step);
    container.appendChild(el);

    container.querySelector('.shepherd-cancel-icon').click();
    expect(stepCancelSpy).toHaveBeenCalled();
  });
});
