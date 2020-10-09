### Disable Scroll

Previously, disabling scrolling was built into Shepherd, but it was buggy
and bulky, so we opted to remove [body-scroll-lock](https://github.com/willmcpo/body-scroll-lock) 
as a dependency, in favor of users installing it directly in their apps. To disable scrolling, 
you can install `body-scroll-lock` and run `bodyScrollLock.disableBodyScroll();` before
starting the tour, then `bodyScrollLock.clearAllBodyScrollLocks();` after stopping the tour.

### Highlighting multiple elements

The most obvious use case for this, is around a group of elements, or more specifically the column in a TABLE. This can be achieved using CSS to absolutely position the element and give it the width and height you need. e.g., 

```html
<colgroup class="shepherd-step-highlight">
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

By default, Popper instances are placed directly next to their target. However, if you need to apply some margin 
between them or if you need to fine tune the position according to some custom logic, you can use Popper's 
[offset modifier](https://popper.js.org/docs/v2/modifiers/offset/) to do so.

For example:

```js
popperOptions: {
  modifiers: [{ name: 'offset', options: { offset: [0, 12] } }]
}
```


### Progress Indicator

Using the already exposed API, you could add a progress indicator of your chosing 
for each step to let your users know how far into a tour they may be.

The example below uses the [Step](https://shepherdjs.dev/docs/Step.html) `options` 
object and adds to `when` on the `show` event. Within that, we create an element 
to render in the header with text of what step out of all potential steps is now 
being show.

```javascript
when: {
  show() {
    const currentStepElement = shepherd.currentStep.el;
    const header = currentStepElement.querySelector('.shepherd-header');
    const progress = document.createElement('span');
    progress.style['margin-right'] = '315px';
    progress.innerText = `${shepherd.steps.indexOf(shepherd.currentStep) + 1}/${shepherd.steps.length}`;
    header.insertBefore(progress, currentStepElement.querySelector('.shepherd-cancel-icon'));        
  }
}
```
