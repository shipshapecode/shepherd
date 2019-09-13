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
