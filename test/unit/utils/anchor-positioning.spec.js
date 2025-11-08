import { beforeEach, describe, expect, it, vi } from 'vitest';
import { 
  setupAnchorTooltip, 
  destroyAnchorTooltip
} from '../../../shepherd.js/src/utils/anchor-positioning.ts';
import { Tour } from '../../../shepherd.js/src/tour.ts';
import { setupAnchorPolyfill } from '../setupTests.js';

describe('Anchor Positioning Utils', () => {
  let mockStep;
  let mockTour;
  let mockElement;
  let mockTarget;

  beforeEach(async () => {
    // Setup CSS anchor positioning polyfill
    await setupAnchorPolyfill();
    // Mock DOM elements
    mockTarget = document.createElement('div');
    mockTarget.id = 'test-target';
    document.body.appendChild(mockTarget);

    mockElement = document.createElement('div');
    mockElement.classList.add('shepherd-element');
    
    // Add arrow element for arrow tests
    const arrow = document.createElement('div');
    arrow.classList.add('shepherd-arrow');
    mockElement.appendChild(arrow);
    
    document.body.appendChild(mockElement);

    // Mock tour
    mockTour = new Tour();
    
    // Mock step with minimal required properties
    mockStep = {
      id: 'test-step',
      el: mockElement,
      tour: mockTour,
      options: {
        attachTo: {
          element: mockTarget,
          on: 'bottom'
        },
        arrow: true
      },
      cleanup: null,
      target: null,
      _getResolvedAttachToOptions: vi.fn(() => ({
        element: mockTarget,
        on: 'bottom'
      })),
      shepherdElementComponent: {
        getElement: vi.fn(() => mockElement)
      }
    };
  });

  afterEach(() => {
    // Clean up DOM
    document.body.innerHTML = '';
    
    // Clean up any dynamically added styles
    const shepherdStyles = document.getElementById('shepherd-anchor-positioning');
    if (shepherdStyles) {
      shepherdStyles.remove();
    }
  });

  describe('setupAnchorTooltip', () => {
    it('should return anchor position config for basic positioning', () => {
      const config = setupAnchorTooltip(mockStep);
      
      expect(config).toEqual({
        placement: 'bottom',
        offset: 8,
        arrow: true
      });
    });

    it('should set anchor name on target element', () => {
      setupAnchorTooltip(mockStep);
      
      const anchorName = mockTarget.style.anchorName;
      expect(anchorName).toBeTruthy();
      expect(anchorName).toMatch(/^--shepherd-anchor-/);
    });

    it('should apply CSS positioning properties to tooltip', () => {
      setupAnchorTooltip(mockStep);
      
      expect(mockElement.style.position).toBe('fixed');
      expect(mockElement.style.positionAnchor).toBeTruthy();
      expect(mockElement.style.positionArea).toBeTruthy();
    });

    it('should set data attribute for placement', () => {
      setupAnchorTooltip(mockStep);
      
      expect(mockElement.dataset.anchorPlacement).toBe('bottom');
    });

    it('should handle different placements correctly', () => {
      const placements = [
        { placement: 'top', expectedArea: 'block-start span-inline', expectedMargin: 'marginBottom' },
        { placement: 'bottom', expectedArea: 'block-end span-inline', expectedMargin: 'marginTop' },
        { placement: 'left', expectedArea: 'inline-start span-block', expectedMargin: 'marginRight' },
        { placement: 'right', expectedArea: 'inline-end span-block', expectedMargin: 'marginLeft' }
      ];

      placements.forEach(({ placement, expectedArea }) => {
        mockStep.options.attachTo.on = placement;
        mockStep._getResolvedAttachToOptions = vi.fn(() => ({
          element: mockTarget,
          on: placement
        }));
        
        setupAnchorTooltip(mockStep);
        
        expect(mockElement.style.positionArea).toBe(expectedArea);
        expect(mockElement.dataset.anchorPlacement).toBe(placement);
      });
    });

    it('should handle edge-aligned placements', () => {
      const edgePlacements = [
        { placement: 'top-start', expectedArea: 'block-start inline-start' },
        { placement: 'top-end', expectedArea: 'block-start inline-end' },
        { placement: 'bottom-start', expectedArea: 'block-end inline-start' },
        { placement: 'bottom-end', expectedArea: 'block-end inline-end' }
      ];

      edgePlacements.forEach(({ placement, expectedArea }) => {
        mockStep.options.attachTo.on = placement;
        mockStep._getResolvedAttachToOptions = vi.fn(() => ({
          element: mockTarget,
          on: placement
        }));
        
        setupAnchorTooltip(mockStep);
        
        expect(mockElement.style.positionArea).toBe(expectedArea);
      });
    });

    it('should setup arrow positioning when arrow option is enabled', () => {
      setupAnchorTooltip(mockStep);
      
      const arrowEl = mockElement.querySelector('.shepherd-arrow');
      expect(arrowEl.style.position).toBe('absolute');
      expect(arrowEl.style.width).toBe('16px');
      expect(arrowEl.style.height).toBe('16px');
    });

    it('should position arrow on correct side based on tooltip placement', () => {
      const placements = [
        { placement: 'top', expectedSide: 'bottom', expectedProperty: 'bottom' },
        { placement: 'bottom', expectedSide: 'top', expectedProperty: 'top' },
        { placement: 'left', expectedSide: 'right', expectedProperty: 'right' },
        { placement: 'right', expectedSide: 'left', expectedProperty: 'left' }
      ];

      placements.forEach(({ placement, expectedProperty }) => {
        mockStep.options.attachTo.on = placement;
        mockStep._getResolvedAttachToOptions = vi.fn(() => ({
          element: mockTarget,
          on: placement
        }));
        
        setupAnchorTooltip(mockStep);
        
        const arrowEl = mockElement.querySelector('.shepherd-arrow');
        expect(arrowEl.style[expectedProperty]).toBe('-8px');
      });
    });

    it('should handle centered steps without anchor positioning', () => {
      // Mock step without attachTo (centered step)
      mockStep.options.attachTo = undefined;
      mockStep._getResolvedAttachToOptions = vi.fn(() => ({}));
      
      const config = setupAnchorTooltip(mockStep);
      
      expect(config.placement).toBe('bottom'); // Default for centered
      expect(mockElement.style.position).toBe('fixed');
      expect(mockElement.style.left).toBe('50%');
      expect(mockElement.style.top).toBe('50%');
      expect(mockElement.style.transform).toBe('translate(-50%, -50%)');
    });

    it('should create stylesheet for auto placement with @position-try rules', () => {
      mockStep.options.attachTo.on = 'auto';
      mockStep._getResolvedAttachToOptions = vi.fn(() => ({
        element: mockTarget,
        on: 'auto'
      }));
      
      setupAnchorTooltip(mockStep);
      
      // Check that stylesheet was created
      const stylesheet = document.getElementById('shepherd-anchor-positioning');
      expect(stylesheet).toBeTruthy();
      expect(stylesheet.tagName).toBe('STYLE');
    });

    it('should clean up previous positioning before setting up new', () => {
      mockStep.cleanup = vi.fn();
      
      setupAnchorTooltip(mockStep);
      
      expect(mockStep.cleanup).toHaveBeenCalled();
    });

    it('should not setup arrow if arrow option is disabled', () => {
      mockStep.options.arrow = false;
      
      setupAnchorTooltip(mockStep);
      
      const arrowEl = mockElement.querySelector('.shepherd-arrow');
      // Arrow element exists but shouldn't be styled for positioning
      expect(arrowEl.style.position).toBe('');
    });

    it('should handle arrow option as object with padding', () => {
      mockStep.options.arrow = { padding: 12 };
      
      const config = setupAnchorTooltip(mockStep);
      
      expect(config.arrow).toEqual({ padding: 12 });
      
      const arrowEl = mockElement.querySelector('.shepherd-arrow');
      expect(arrowEl.style.position).toBe('absolute');
    });
  });

  describe('destroyAnchorTooltip', () => {
    it('should clean up anchor name from target element', () => {
      setupAnchorTooltip(mockStep);
      
      // Verify anchor name is set
      expect(mockStep.target.style.anchorName).toBeTruthy();
      
      destroyAnchorTooltip(mockStep);
      
      expect(mockStep.target.style.anchorName).toBe('');
    });

    it('should reset tooltip positioning styles', () => {
      setupAnchorTooltip(mockStep);
      
      // Verify styles are set
      expect(mockElement.style.positionAnchor).toBeTruthy();
      expect(mockElement.style.positionArea).toBeTruthy();
      
      destroyAnchorTooltip(mockStep);
      
      expect(mockElement.style.positionAnchor).toBe('');
      expect(mockElement.style.positionArea).toBe('');
      expect(mockElement.style.positionTryOptions).toBe('');
      expect(mockElement.style.marginTop).toBe('');
      expect(mockElement.style.marginBottom).toBe('');
      expect(mockElement.style.marginLeft).toBe('');
      expect(mockElement.style.marginRight).toBe('');
    });

    it('should clear data attributes', () => {
      setupAnchorTooltip(mockStep);
      
      expect(mockElement.dataset.anchorPlacement).toBeTruthy();
      
      destroyAnchorTooltip(mockStep);
      
      expect(mockElement.dataset.anchorPlacement).toBeUndefined();
    });

    it('should handle missing elements gracefully', () => {
      mockStep.el = null;
      mockStep.target = null;
      
      expect(() => destroyAnchorTooltip(mockStep)).not.toThrow();
    });
  });

  describe('Arrow positioning logic', () => {
    it('should calculate correct arrow side for each placement', () => {
      const testCases = [
        { placement: 'top', expectedSide: 'bottom' },
        { placement: 'top-start', expectedSide: 'bottom' },
        { placement: 'top-end', expectedSide: 'bottom' },
        { placement: 'bottom', expectedSide: 'top' },
        { placement: 'bottom-start', expectedSide: 'top' },
        { placement: 'bottom-end', expectedSide: 'top' },
        { placement: 'left', expectedSide: 'right' },
        { placement: 'left-start', expectedSide: 'right' },
        { placement: 'left-end', expectedSide: 'right' },
        { placement: 'right', expectedSide: 'left' },
        { placement: 'right-start', expectedSide: 'left' },
        { placement: 'right-end', expectedSide: 'left' },
        { placement: 'auto', expectedSide: 'top' },
        { placement: 'auto-start', expectedSide: 'top' },
        { placement: 'auto-end', expectedSide: 'top' }
      ];

      testCases.forEach(({ placement, expectedSide }) => {
        mockStep.options.attachTo.on = placement;
        mockStep._getResolvedAttachToOptions = vi.fn(() => ({
          element: mockTarget,
          on: placement
        }));
        
        setupAnchorTooltip(mockStep);
        
        const arrowEl = mockElement.querySelector('.shepherd-arrow');
        
        // Check that the correct side is positioned
        switch (expectedSide) {
          case 'top':
            expect(arrowEl.style.top).toBe('-8px');
            break;
          case 'bottom':
            expect(arrowEl.style.bottom).toBe('-8px');
            break;
          case 'left':
            expect(arrowEl.style.left).toBe('-8px');
            break;
          case 'right':
            expect(arrowEl.style.right).toBe('-8px');
            break;
        }
      });
    });

    it('should center arrow on the appropriate axis', () => {
      setupAnchorTooltip(mockStep); // bottom placement
      
      const arrowEl = mockElement.querySelector('.shepherd-arrow');
      
      // For bottom placement, arrow should be on top and centered horizontally
      expect(arrowEl.style.top).toBe('-8px');
      expect(arrowEl.style.left).toBe('50%');
      expect(arrowEl.style.transform).toBe('translateX(-50%)');
    });
  });

  describe('CSS @position-try handling', () => {
    it('should handle missing @position-try support gracefully', () => {
      // Mock a stylesheet that throws on insertRule
      const originalCreateElement = document.createElement;
      document.createElement = vi.fn((tagName) => {
        if (tagName === 'style') {
          const mockStyle = originalCreateElement.call(document, 'style');
          const mockSheet = {
            cssRules: [],
            insertRule: vi.fn(() => {
              throw new Error('CSS @position-try not supported');
            })
          };
          Object.defineProperty(mockStyle, 'sheet', {
            get: () => mockSheet
          });
          return mockStyle;
        }
        return originalCreateElement.call(document, tagName);
      });

      mockStep.options.attachTo.on = 'auto';
      mockStep._getResolvedAttachToOptions = vi.fn(() => ({
        element: mockTarget,
        on: 'auto'
      }));
      
      // Should not throw, just log warning
      expect(() => setupAnchorTooltip(mockStep)).not.toThrow();
      
      // Restore original
      document.createElement = originalCreateElement;
    });
  });
});