### Disable Scroll

Previously, disabling scrolling was built into Shepherd, but it was buggy
and bulky, so we opted to remove [body-scroll-lock](https://github.com/willmcpo/body-scroll-lock) 
as a dependency, in favor of users installing it directly in their apps. To disable scrolling, 
you can install `body-scroll-lock` and run `bodyScrollLock.disableBodyScroll();` before
starting the tour, then `bodyScrollLock.clearAllBodyScrollLocks();` after stopping the tour.

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
    const header = document.querySelector('.shepherd-header');
    const progress = document.createElement('span');
    progress.style['margin-right'] = '315px';

    progress.innerText = `${shepherd.steps.indexOf(shepherd.currentStep) + 1}/${shepherd.steps.length}`;
    header.insertBefore(progress, document.querySelector('.shepherd-cancel-icon'));        
  }
}
```
