// Deliberately broken variants of the real source. Each one removes a line that
// guards the verified properties, and the explorer must notice. They are applied
// in memory by the vitest config, so nothing on disk changes. A `from` that no
// longer matches the source fails loudly, which means this list needs updating.
export const MUTANTS = {
  'wait-ignores-newer-show': {
    file: 'src/tour.ts',
    from: 'if (generation !== this._showGeneration) {',
    to: 'if (false) {'
  },
  'navigate-keeps-old-popup': {
    file: 'src/tour.ts',
    from: 'this.currentStep.hide();',
    to: ''
  },
  'done-keeps-popups': {
    file: 'src/tour.ts',
    from: 'this.steps.forEach((step) => step.destroy());',
    to: ''
  },
  'done-keeps-overlay': {
    file: 'src/tour.ts',
    from: 'this.modal.destroy();',
    to: ''
  },
  'done-stays-active': {
    file: 'src/tour.ts',
    from: 'Shepherd.activeTour = null;',
    to: ''
  },
  'cancel-ignores-confirm-answer': {
    file: 'src/tour.ts',
    from: 'if (stopTour) {',
    to: 'if (true) {'
  },
  'cancel-rejects': {
    file: 'src/tour.ts',
    from: 'async cancel() {',
    to: "async cancel() { throw new Error('mutant');"
  },
  'gated-show-ignores-supersede': {
    file: 'src/step.ts',
    from: 'generation === this.tour._showGeneration &&',
    to: ''
  },
  'done-keeps-pending-shows': {
    file: 'src/tour.ts',
    from: `this._showGeneration++;
    this._runGeneration++;`,
    to: 'this._runGeneration++;'
  },
  'restart-keeps-old-popup': {
    file: 'src/tour.ts',
    from: 'this.currentStep?.hide();',
    to: ''
  },
  'restart-keeps-old-overlay': {
    file: 'src/tour.ts',
    from: 'this.modal?.destroy();',
    to: ''
  },
  'confirm-ignores-run': {
    file: 'src/tour.ts',
    from: 'if (run !== this._runGeneration) {',
    to: 'if (false) {'
  },
  'done-keeps-run': {
    file: 'src/tour.ts',
    from: `this._showGeneration++;
    this._runGeneration++;`,
    to: 'this._showGeneration++;'
  },
  'restart-keeps-run': {
    file: 'src/tour.ts',
    from: `_setupActiveTour() {
    this._runGeneration++;`,
    to: '_setupActiveTour() {'
  },
  'start-skips-overlay': {
    file: 'src/tour.ts',
    from: `this.setupModal();

    this._setupActiveTour();`,
    to: 'this._setupActiveTour();'
  },
  'teardown-keeps-target-classes': {
    file: 'src/step.ts',
    from: `    this._updateStepTargetOnHide();
    this._originalTabIndexes.clear();`,
    to: '    this._originalTabIndexes.clear();'
  }
};
