---
title: Styling
---

### Default Styles

Shepherd ships with some default styles, but we try to keep it minimal, so you
do not have a ton to override. You can also opt out of styles entirely, by not
including the `shepherd.css` file.

### Optional theme

`shepherd.js/dist/css/theme.css` is a second stylesheet, with dark mode and
entry motion. Import it after `shepherd.css`. Every color and dimension in it is
a custom property, so you restyle it by overriding `--shepherd-accent` and its
neighbors rather than selectors.

```js
import 'shepherd.js/dist/css/shepherd.css';
import 'shepherd.js/dist/css/theme.css';
```

It pairs with `shepherd.js/motion`, which ships separately and only costs bytes
if you import it. `glideSteps(tour)` moves the dialog between steps, and
`stepProgress(tour)` feeds the theme's step counter and progress bar. Each
returns a function that stops it.

```js
import { glideSteps, stepProgress } from 'shepherd.js/motion';

glideSteps(tour);
stepProgress(tour);
```

### Overlay motion

With `useModalOverlay`, the opening glides from one target to the next. Its
length comes from `transition-duration` on the overlay's path, 0.42s by default,
and it cuts straight to the target under `prefers-reduced-motion: reduce`. To
turn it off:

```css
.shepherd-modal-overlay-container path {
  transition-duration: 0s;
}
```

### Focus ring on the dialog

Each step's dialog takes focus when it shows, so keyboard users start inside the
tour. Shepherd hides the dialog's focus ring, which keeps tours that start on
page load clean, but leaves keyboard users without a cue for where focus is
until they tab to a button. To show a ring only when the browser thinks focus
should be visible, for example after a keyboard starts the tour:

```css
.shepherd-element:focus-visible {
  outline: auto;
}
```

Browsers count focus before any input as possibly keyboard driven, so a tour
that starts on page load shows this ring too.

### Custom Classes

If you'd like to change styles within your own CSS, you can pass custom class
names to the tour instance &mdash; or, as part of the options for each step
&mdash; and use them as hooks for your own styling rules.

```javascript
let tour = new Shepherd.Tour({
  defaultStepOptions: {
    classes: 'shepherd-theme-custom'
  }
});
```

### Adding a prefix to the default `shepherd-*` classes

If you have a situation where you are running two Shepherd instances on a page,
and they need to be styled differently, you may want to prefix the class names.
This is now possible with the `classPrefix` option.

```js
const tour = new Shepherd.Tour({
  classPrefix: 'my-tour-'
});
```

`classPrefix` applies to exactly two things: the `shepherd-enabled` and
`shepherd-target` classes Shepherd puts on the **target** element (and on any
`extraHighlights` elements), and the `data-shepherd-step-id` attribute on the
popup. Everything else keeps its unprefixed name &mdash; including the
`shepherd-enabled` class on the popup element itself, and the
`shepherd-target-click-disabled` class that `canClickTarget: false` adds to the
target. `shepherd.css` keys rules on those two, and a static stylesheet cannot
know your runtime prefix, so prefixing them would break the rules they drive.
