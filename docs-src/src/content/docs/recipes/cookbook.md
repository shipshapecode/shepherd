---
title: Cookbook
---

### Disable Scroll

Previously, disabling scrolling was built into Shepherd, but it was buggy
and bulky, so we opted to remove [body-scroll-lock](https://github.com/willmcpo/body-scroll-lock)
as a dependency, in favor of users installing it directly in their apps. To disable scrolling,
you can install `body-scroll-lock` and run `bodyScrollLock.disableBodyScroll();` before
starting the tour, then `bodyScrollLock.clearAllBodyScrollLocks();` after stopping the tour.

### Highlighting multiple elements

Highlighting multiple elements is supported by Shepherd out of the box. You can pass an array of selectors to the `extraHighlights` option in the step configuration. This will highlight all the elements in the array as well as the target element defined in the `attachTo` option.

```javascript
const tour = new Shepherd.Tour({
  steps: [
    {
      text: 'This is a step with multiple highlights',
      attachTo: {
        element: '.target-element',
        on: 'bottom'
      },
      extraHighlights: ['.example-selector', '.example-selector-2']
    }
  ]
});
```

If an element to be highlighted is contained by another element that is also being highlighted, the contained element will not be highlighted. This is to prevent the contained element from being obscured by the containing element.

Highlighted elements do not have to share a scroll container with the `attachTo` target. Each one is clipped vertically by the scroll containers that actually crop it, so only the part of it that is scrolled into view is cut out of the overlay. An element whose position takes it outside those containers — `fixed`, or `absolute` against a containing block above them, as a dropdown usually is — is cut out in full, wherever it is painted. Clipping is vertical only: an element scrolled out of view horizontally is still cut out in full.

### Offsets

By default, steps are placed directly next to their target, with the arrow
making up the gap. Set `positionOptions.offset` to add more space:

```js
const tour = new Shepherd.Tour({
  steps: [
    {
      ...
      positionOptions: { offset: 12 }
      ...
    }
  ]
});
```

A number moves the step away from its target. `{ mainAxis, crossAxis }` also
slides it along the side it sits on. `padding` keeps the step that far from the
edges of the viewport and of scrolling containers. See
[`StepOptionsPosition`](https://docs.shepherdjs.dev/api/step/interfaces/stepoptionsposition/)
for every field.

### Positioning strategy

Steps are positioned with `position: absolute` by default. Shepherd keeps
comparing a step's position with its target's, so the default already keeps a
step locked to its target while the page — or any scrolling ancestor of the
target — scrolls.

Use `strategy: 'fixed'` when the target is itself `position: fixed`, such as a
sticky header, so the step stays with it without being repositioned on every
scroll:

```js
const tour = new Shepherd.Tour({
  steps: [
    {
      ...
      positionOptions: { strategy: 'fixed' }
      ...
    }
  ]
});
```

You can also set this once for every step via `defaultStepOptions`. A step's own
`positionOptions` change only the keys it sets:

```js
const tour = new Shepherd.Tour({
  defaultStepOptions: {
    positionOptions: { strategy: 'fixed', offset: 8 }
  }
});
```

Centered steps are always positioned in the viewport with `position: fixed`, so
`positionOptions` has no effect on them. A step is centered when it has no
`attachTo` at all, or when its `attachTo` is missing either `element` or `on`.

### Keeping a placement

A step flips to the opposite side when `attachTo.on` would not fit. Set
`positionOptions: { flip: false }` to keep the side you chose, for example when
the opposite side would cover something the user needs to see.

### Progress Indicator

Using the already exposed API, you could add a progress indicator of your choosing
for each step to let your users know how far into a tour they may be.

The example below uses the [Step](https://docs.shepherdjs.dev/api/step/classes/step/) `options`
object and adds to `when` on the `show` event. Within that, we create an element
to render in the header with text of what step out of all potential steps is now
being show.

```javascript
when: {
  show() {
    const currentStep = Shepherd.activeTour?.getCurrentStep();
    const currentStepElement = currentStep?.getElement();
    const header = currentStepElement?.querySelector('.shepherd-header');
    const progress = document.createElement('span');
    progress.style['margin-right'] = '315px';
    progress.innerText = `${Shepherd.activeTour?.steps.indexOf(currentStep) + 1}/${Shepherd.activeTour?.steps.length}`;
    header?.insertBefore(progress, currentStepElement.querySelector('.shepherd-cancel-icon'));
  }
}
```

Another example, for anyone who wants to add progress indicators to the footer. Add the `shepherd-progress` className and some extra styles.

```javascript
when: {
  show() {
    const currentStep = Shepherd.activeTour?.getCurrentStep();
    const currentStepElement = currentStep?.getElement();
    const footer = currentStepElement?.querySelector('.shepherd-footer');
    const progress = document.createElement('span');
    progress.className = 'shepherd-progress';
    progress.innerText = `${Shepherd.activeTour?.steps.indexOf(currentStep) + 1} of ${Shepherd.activeTour?.steps.length}`;
    footer?.insertBefore(progress, currentStepElement.querySelector('.shepherd-button:last-child'));
  }
}
```

```scss
.shepherd-footer {
  align-items: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  justify-content: space-between;
  padding: 0 0.75rem 0.75rem;

  .shepherd-button:last-child {
    margin-right: 0;
  }

  .shepherd-progress {
    font-size: 0.8rem;
  }
}
```
