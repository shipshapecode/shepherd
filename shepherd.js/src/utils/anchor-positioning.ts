import type { Step, StepOptionsAttachTo } from '../step.ts';
import { shouldCenterStep } from './general.ts';
import { isHTMLElement } from './type-check.ts';

// Extend CSSStyleDeclaration to include CSS Anchor Positioning properties
declare global {
  interface CSSStyleDeclaration {
    anchorName: string;
    positionAnchor: string;
    positionArea: string;
    positionTryOptions: string;
  }
}

export type AnchorPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'auto'
  | 'auto-start'
  | 'auto-end';

export interface AnchorPositionConfig {
  placement: AnchorPlacement;
  offset?: number;
  arrow?: boolean | { padding?: number };
}

/**
 * Sets up tooltip positioning using CSS Anchor Positioning API
 */
export function setupAnchorTooltip(step: Step): AnchorPositionConfig {
  if (step.cleanup) {
    step.cleanup();
  }

  const attachToOptions = step._getResolvedAttachToOptions();
  const shouldCenter = shouldCenterStep(attachToOptions);

  if (shouldCenter) {
    // For centered steps, use CSS transform positioning
    setupCenteredPosition(step);
    return {
      placement: 'bottom',
      offset: 8,
      arrow: step.options.arrow || false
    }; // Default value for centered
  }

  const config = getAnchorPositionConfig(attachToOptions, step);
  setupAnchorPosition(step, attachToOptions, config);

  step.target = attachToOptions.element as HTMLElement;
  return config;
}

/**
 * Sets up centered positioning without anchors
 */
function setupCenteredPosition(step: Step) {
  if (!step.el) return;

  // @ts-expect-error TODO: fix this type error when we type Svelte
  const content = step.shepherdElementComponent.getElement();
  content.classList.add('shepherd-centered');

  Object.assign(step.el.style, {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    anchorName: 'none'
  });
}

/**
 * Sets up CSS anchor positioning
 */
function setupAnchorPosition(
  step: Step,
  attachToOptions: StepOptionsAttachTo,
  config: AnchorPositionConfig
) {
  if (!step.el || !attachToOptions.element) return;

  const anchorElement = attachToOptions.element as HTMLElement;
  const tooltipElement = step.el as HTMLElement;

  // Generate unique anchor name
  const anchorName = `--shepherd-anchor-${step.id || Math.random().toString(36).substr(2, 9)}`;

  // Set anchor name on the target element
  anchorElement.style.anchorName = anchorName;

  // Apply positioning to tooltip
  setupTooltipAnchorStyles(tooltipElement, anchorName, config);

  // Setup arrow positioning if needed
  if (config.arrow) {
    setupArrowPosition(step, config.placement);
  }

  // Set data attribute for CSS styling
  tooltipElement.dataset['anchorPlacement'] = config.placement;
}

/**
 * Applies CSS anchor positioning styles to tooltip
 */
function setupTooltipAnchorStyles(
  tooltipElement: HTMLElement,
  anchorName: string,
  config: AnchorPositionConfig
) {
  const styles: Partial<CSSStyleDeclaration> = {
    position: 'fixed',
    positionAnchor: anchorName
  };

  // Apply positioning based on placement
  switch (config.placement) {
    case 'top':
      styles.positionArea = 'block-start span-inline';
      styles.marginBottom = config.offset ? `${config.offset}px` : '8px';
      break;
    case 'top-start':
      styles.positionArea = 'block-start inline-start';
      styles.marginBottom = config.offset ? `${config.offset}px` : '8px';
      break;
    case 'top-end':
      styles.positionArea = 'block-start inline-end';
      styles.marginBottom = config.offset ? `${config.offset}px` : '8px';
      break;
    case 'bottom':
      styles.positionArea = 'block-end span-inline';
      styles.marginTop = config.offset ? `${config.offset}px` : '8px';
      break;
    case 'bottom-start':
      styles.positionArea = 'block-end inline-start';
      styles.marginTop = config.offset ? `${config.offset}px` : '8px';
      break;
    case 'bottom-end':
      styles.positionArea = 'block-end inline-end';
      styles.marginTop = config.offset ? `${config.offset}px` : '8px';
      break;
    case 'left':
      styles.positionArea = 'inline-start span-block';
      styles.marginRight = config.offset ? `${config.offset}px` : '8px';
      break;
    case 'left-start':
      styles.positionArea = 'block-start inline-start';
      styles.marginRight = config.offset ? `${config.offset}px` : '8px';
      break;
    case 'left-end':
      styles.positionArea = 'block-end inline-start';
      styles.marginRight = config.offset ? `${config.offset}px` : '8px';
      break;
    case 'right':
      styles.positionArea = 'inline-end span-block';
      styles.marginLeft = config.offset ? `${config.offset}px` : '8px';
      break;
    case 'right-start':
      styles.positionArea = 'block-start inline-end';
      styles.marginLeft = config.offset ? `${config.offset}px` : '8px';
      break;
    case 'right-end':
      styles.positionArea = 'block-end inline-end';
      styles.marginLeft = config.offset ? `${config.offset}px` : '8px';
      break;
    case 'auto':
    case 'auto-start':
    case 'auto-end':
      // For auto placements, use @position-try fallbacks
      setupAutoPlacement(tooltipElement, anchorName, config);
      return;
  }

  Object.assign(tooltipElement.style, styles);
}

/**
 * Sets up auto-placement with CSS @position-try fallbacks
 */
function setupAutoPlacement(
  tooltipElement: HTMLElement,
  anchorName: string,
  config: AnchorPositionConfig
) {
  const tryOptionNames = [
    `--shepherd-try-top-${config.placement}`,
    `--shepherd-try-bottom-${config.placement}`,
    `--shepherd-try-left-${config.placement}`,
    `--shepherd-try-right-${config.placement}`
  ];

  // Create @position-try rules dynamically
  const styleSheet = getOrCreateStyleSheet();

  // Clear existing try options for this step
  clearExistingTryOptions(styleSheet, tryOptionNames);

  // Add new try options
  addPositionTryOptions(styleSheet, tryOptionNames, config);

  // Apply to tooltip
  Object.assign(tooltipElement.style, {
    position: 'fixed',
    positionAnchor: anchorName,
    positionArea: 'block-end span-inline', // Default: bottom
    marginTop: config.offset ? `${config.offset}px` : '8px',
    positionTryOptions: tryOptionNames.join(', ')
  });
}

/**
 * Sets up arrow positioning using JavaScript calculations
 */
function setupArrowPosition(step: Step, placement: AnchorPlacement) {
  if (!step.el) return;

  const arrowEl = step.el.querySelector('.shepherd-arrow');
  if (!isHTMLElement(arrowEl)) return;

  // Calculate arrow position based on placement
  const arrowSide = getArrowSide(placement);
  const arrowStyles = getArrowStyles(arrowSide);

  Object.assign(arrowEl.style, arrowStyles);
}

/**
 * Determines which side of the tooltip the arrow should be on
 */
function getArrowSide(
  placement: AnchorPlacement
): 'top' | 'bottom' | 'left' | 'right' {
  if (placement.startsWith('top')) return 'bottom';
  if (placement.startsWith('bottom')) return 'top';
  if (placement.startsWith('left')) return 'right';
  if (placement.startsWith('right')) return 'left';
  if (placement.startsWith('auto')) return 'top'; // Default for auto
  return 'bottom'; // Default fallback
}

/**
 * Gets CSS styles for arrow based on its side
 */
function getArrowStyles(
  side: 'top' | 'bottom' | 'left' | 'right'
): Partial<CSSStyleDeclaration> {
  const baseStyles: Partial<CSSStyleDeclaration> = {
    position: 'absolute',
    width: '16px',
    height: '16px',
    zIndex: '-1'
  };

  switch (side) {
    case 'top':
      return {
        ...baseStyles,
        top: '-8px',
        left: '50%',
        transform: 'translateX(-50%)'
      };
    case 'bottom':
      return {
        ...baseStyles,
        bottom: '-8px',
        left: '50%',
        transform: 'translateX(-50%)'
      };
    case 'left':
      return {
        ...baseStyles,
        left: '-8px',
        top: '50%',
        transform: 'translateY(-50%)'
      };
    case 'right':
      return {
        ...baseStyles,
        right: '-8px',
        top: '50%',
        transform: 'translateY(-50%)'
      };
  }
}

/**
 * Gets the anchor position configuration from step options
 */
function getAnchorPositionConfig(
  attachToOptions: StepOptionsAttachTo,
  step: Step
): AnchorPositionConfig {
  const placement = (attachToOptions.on as AnchorPlacement) || 'bottom';

  // Merge with step-specific anchorOptions
  const stepAnchorOptions = (step.options.anchorOptions ||
    {}) as Partial<AnchorPositionConfig>;

  return {
    placement: stepAnchorOptions.placement || placement,
    offset: stepAnchorOptions.offset || 8,
    arrow:
      stepAnchorOptions.arrow !== undefined
        ? stepAnchorOptions.arrow
        : step.options.arrow || false
  };
}

/**
 * Utility functions for dynamic CSS @position-try rules
 */
let shepherdStyleSheet: CSSStyleSheet | null = null;

function getOrCreateStyleSheet(): CSSStyleSheet {
  if (shepherdStyleSheet) return shepherdStyleSheet;

  const style = document.createElement('style');
  style.id = 'shepherd-anchor-positioning';
  document.head.appendChild(style);
  shepherdStyleSheet = style.sheet as CSSStyleSheet;

  return shepherdStyleSheet;
}

function clearExistingTryOptions(
  _styleSheet: CSSStyleSheet,
  _tryOptionNames: string[]
) {
  // In a real implementation, you'd need to track and remove existing rules
  // For now, we'll just add new ones (CSS will use the last defined rule)
}

function addPositionTryOptions(
  styleSheet: CSSStyleSheet,
  tryOptionNames: string[],
  config: AnchorPositionConfig
) {
  const tryConfigs = [
    {
      name: tryOptionNames[0],
      area: 'block-start span-inline',
      margin: 'marginBottom'
    },
    {
      name: tryOptionNames[1],
      area: 'block-end span-inline',
      margin: 'marginTop'
    },
    {
      name: tryOptionNames[2],
      area: 'inline-start span-block',
      margin: 'marginRight'
    },
    {
      name: tryOptionNames[3],
      area: 'inline-end span-block',
      margin: 'marginLeft'
    }
  ];

  tryConfigs.forEach(({ name, area, margin }) => {
    const rule = `
      @position-try ${name} {
        position-area: ${area};
        ${margin}: ${config.offset || 8}px;
      }
    `;

    try {
      styleSheet.insertRule(rule, styleSheet.cssRules.length);
    } catch (e) {
      // Fallback for browsers that don't support @position-try yet
      console.warn('CSS @position-try not supported:', e);
    }
  });
}

/**
 * Cleanup function for anchor positioning
 */
export function destroyAnchorTooltip(step: Step) {
  if (!step.el || !step.target) return;

  // Remove anchor name from target
  const target = step.target as HTMLElement;
  target.style.anchorName = '';

  // Reset tooltip styles
  const tooltip = step.el as HTMLElement;
  tooltip.style.positionAnchor = '';
  tooltip.style.positionArea = '';
  tooltip.style.positionTryOptions = '';
  tooltip.style.marginTop = '';
  tooltip.style.marginBottom = '';
  tooltip.style.marginLeft = '';
  tooltip.style.marginRight = '';

  // Clear dataset
  delete tooltip.dataset['anchorPlacement'];
}
