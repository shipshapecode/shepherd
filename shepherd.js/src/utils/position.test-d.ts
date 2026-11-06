// Compile-time proof, checked by `tsc`, that a consumer's own Floating UI
// middleware and config satisfy `floatingUIOptions` with no dependency on it.
import {
  arrow,
  autoPlacement,
  flip,
  hide,
  inline,
  limitShift,
  offset,
  shift,
  size,
  type ComputePositionConfig as FloatingUIConfig
} from '@floating-ui/dom';
import type { StepOptions } from '../step.ts';

export const fromMiddleware: StepOptions['floatingUIOptions'] = {
  strategy: 'fixed',
  placement: 'left-start',
  middleware: [
    offset(8),
    flip({ padding: 4 }),
    shift({ limiter: limitShift() }),
    arrow({ element: document.body }),
    autoPlacement(),
    hide(),
    inline(),
    size(),
    false,
    null,
    undefined
  ]
};

export const fromConfig = (
  config: FloatingUIConfig
): StepOptions['floatingUIOptions'] => config;
