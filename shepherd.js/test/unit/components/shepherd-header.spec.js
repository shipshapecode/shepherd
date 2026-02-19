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

  describe('cancel icon attrs', () => {
    it('applies custom attributes to cancel icon', () => {
      const step = {
        options: {
          cancelIcon: {
            enabled: true,
            attrs: {
              'data-test': 'close-tour',
              'data-analytics': 'tour-cancel'
            }
          }
        }
      };

      const el = createShepherdHeader('test-label', step);
      container.appendChild(el);

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      expect(cancelIcon).toHaveAttribute('data-test', 'close-tour');
      expect(cancelIcon).toHaveAttribute('data-analytics', 'tour-cancel');
    });

    it('cancel icon attrs work with custom label', () => {
      const step = {
        options: {
          cancelIcon: {
            enabled: true,
            label: 'Custom Close',
            attrs: {
              'data-test': 'custom-close',
              id: 'tour-close-btn'
            }
          }
        }
      };

      const el = createShepherdHeader('test-label', step);
      container.appendChild(el);

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      expect(cancelIcon).toHaveAttribute('aria-label', 'Custom Close');
      expect(cancelIcon).toHaveAttribute('data-test', 'custom-close');
      expect(cancelIcon).toHaveAttribute('id', 'tour-close-btn');
    });

    it('cancel icon does not override core attributes via attrs', () => {
      const step = {
        options: {
          cancelIcon: {
            enabled: true,
            label: 'Close',
            attrs: {
              type: 'submit', // Should NOT override
              class: 'wrong-class', // Should NOT override
              'aria-label': 'Wrong Label', // Should NOT override
              'data-test': 'close-btn' // SHOULD apply
            }
          }
        }
      };

      const el = createShepherdHeader('test-label', step);
      container.appendChild(el);

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      expect(cancelIcon).toHaveAttribute('type', 'button');
      expect(cancelIcon).toHaveClass('shepherd-cancel-icon');
      expect(cancelIcon).toHaveAttribute('aria-label', 'Close');
      expect(cancelIcon).toHaveAttribute('data-test', 'close-btn');
    });

    it('cancel icon works with empty attrs', () => {
      const step = {
        options: {
          cancelIcon: {
            enabled: true,
            attrs: {}
          }
        }
      };

      const el = createShepherdHeader('test-label', step);
      container.appendChild(el);

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      expect(cancelIcon).toBeInTheDocument();
      expect(cancelIcon).toHaveAttribute('type', 'button');
    });

    it('cancel icon handles numeric and boolean attrs values', () => {
      const step = {
        options: {
          cancelIcon: {
            enabled: true,
            attrs: {
              'data-count': 5,
              'data-active': true
            }
          }
        }
      };

      const el = createShepherdHeader('test-label', step);
      container.appendChild(el);

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      expect(cancelIcon).toHaveAttribute('data-count', '5');
      expect(cancelIcon).toHaveAttribute('data-active', 'true');
    });
  });
});
