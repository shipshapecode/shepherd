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

The most obvious use case for this, is around a group of elements, or more specifically the column in a TABLE. This can be achieved using CSS to absolutely position the element and give it the width and height you need. e.g.,

```html
<colgroup class="shepherd-step-highlight"></colgroup>
```

and setting your CSS to something like:

```css
colgroup.shepherd-step-highlight {
  display: block;
  height: 100px;
  position: absolute;
  width: 200px;
}
```

Similar results could be had by adding elements purely for the purpose of exposing more than one element in the overlay and positioning the element absolutely.

### Offsets

By default, FloatingUI instances are placed directly next to their target. However, if you need to apply some margin
between them or if you need to fine tune the position according to some custom logic, you can use an offset middleware.

For example:

```js
import { offset } from '@floating-ui/dom';

const tour = new Shepherd.Tour({
  steps: [
    {
      ...
      floatingUIOptions: {
        middleware: [offset({ mainAxis: 0, crossAxis: 12 })]
      }
      ...
    }
  ]
});
```

### Progress Indicator

Using the already exposed API, you could add a progress indicator of your choosing
for each step to let your users know how far into a tour they may be.

The example below uses the [Step](https://docs.shepherdpro.com/api/step/classes/step/) `options`
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
