---
title: Styling
---

### Default Styles

Shepherd ships with some default styles, but we try to keep it minimal, so you do not have a ton to override.
You can also opt out of styles entirely, by not including the `shepherd.css` file.

### Custom Classes

If you'd like to change styles within your own CSS, you can pass custom class names to the tour instance &mdash;
or, as part of the options for each step &mdash; and use them as hooks for your own styling rules.

```javascript
let tour = new Shepherd.Tour({
  defaultStepOptions: {
    classes: 'shepherd-theme-custom'
  }
});
```

### Adding a prefix to the default `shepherd-*` classes

If you have a situation where you are running two Shepherd instances on a page, and they need to be styled
differently, you may want to prefix the class names. This is now possible with the `classPrefix` option.

```js
const tour = new Shepherd.Tour({
  classPrefix: 'my-tour-'
});
```

`classPrefix` applies to exactly two things: the `shepherd-enabled` and `shepherd-target` classes Shepherd puts on
the **target** element (and on any `extraHighlights` elements), and the `data-shepherd-step-id` attribute on the popup.
Everything else keeps its unprefixed name &mdash; including the `shepherd-enabled` class on the popup element itself,
and the `shepherd-target-click-disabled` class that `canClickTarget: false` adds to the target. `shepherd.css` keys
rules on those two, and a static stylesheet cannot know your runtime prefix, so prefixing them would break the rules
they drive.
