// Compile-time checks, run by `tsc`, of what `positionOptions` accepts.
import type { StepOptions, StepOptionsPosition } from '../step.ts';

export const everyKey: StepOptionsPosition = {
  offset: { mainAxis: 8, crossAxis: -4 },
  padding: 16,
  strategy: 'fixed',
  flip: false
};

export const onAStep: StepOptions = { positionOptions: { offset: 12 } };

export const removed: StepOptions = {
  // @ts-expect-error `floatingUIOptions` was replaced by `positionOptions`.
  floatingUIOptions: { strategy: 'fixed' }
};

export const badStrategy: StepOptionsPosition = {
  // @ts-expect-error Only `absolute` and `fixed`.
  strategy: 'sticky'
};
