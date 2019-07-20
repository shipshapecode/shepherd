We deliver some [predefined themes](/docs/themes.md) (e.g., `dark` or `square`). 
You are welcome to use one of them by passing the `theme` option in the Shepherd config.

```js
const tour = new Shepherd.Tour({
  ...
  theme: 'light'
});
```

If you'd like to extend a theme within your own CSS, you can pass custom class names to the tour instance &mdash; 
or, as part of the options for each step &mdash; and use them as hooks for your own styling rules.

```javascript
let tour = new Shepherd.Tour({
  defaultStepOptions: {
    classes: 'shepherd-theme-custom'
  }
});
```

### Leveraging Style Variables

We use [nano-css](https://github.com/streamich/nano-css) to automatically ship all the styles as part of the JS bundle.
We have a default set of variables, which can be overridden to achieve whatever look and feel you would like.

These values and variables can be found in [**variables.js**](/src/js/styles/variables.js), and the ones that can be adjusted for theming are listed below.

**🎨 Color Settings**

| Variable                 | Purpose                                                     | Default
|--------------------------|-------------------------------------------------------------|--------
| shepherdThemePrimary     | Primary or brand color. The primary button gets this color. | #3288e6
| shepherdThemeSecondary   | Secondary color. If it is not set explicitly, it is calculated using the primary color. | desaturate(lighten($shepherd-theme-primary, 40), 70)
| shepherdTextBackground   | Background color of the text area.                          | #ffffff
| shepherdHeaderBackground | Background color of the header element. If it is not set explicitly, it is calculated using the text background color. | darken($shepherd-text-background, 10)

**⚙️ Options**

| Variable                    | Purpose | Default
|-----------------------------|---------|--------
| shepherdElementWidth        | Width of the step element | 400px
| shepherdElementBorderRadius | Set radius of rounded corners. 0 means (sharp) pointed corners. | 5px
| shepherdElementMaxHeight    | Maximum height of the element | 100%
| shepherdElementMaxWidth     | Maximum width of the element | 100%
| shepherdElementZIndex       | Move the element forward or backward | 9999
| shepherdTextLineHeight      | Determine the line height of the body text | 1.3em
| shepherdButtonBorderRadius  | Decide whether the buttons should have rounded or pointed corners. 0 means (sharp) pointed corners. | 3px
| useDropShadow               | The element casts a shadow | true

The example below is intended to illustrate the individual customizations. Please make sure that the values are set before the import of the _base-theme_.

```js
const tour = new Shepherd.Tour({
  styleVariables: {
    shepherdButtonBorderRadius: 0,
    shepherdElementBorderRadius: 0,
    shepherdHeaderBackground: '#eeeeee',
    shepherdThemePrimary: '#9b59b6',
    shepherdThemeSecondary: 'desaturate(lighten($shepherd-theme-primary, 30), 70)',
    useDropShadow: true
  }
});
```

As a result you get a squared theme with a purple primary button. The individual steps cast a shadow on the underlying elements. The header is colored in a light gray tone.

### Adding a prefix to the `shepherd-*` classes

If you have a situation where you are running two Shepherd instances on a page, and they need to be styled
differently, you may want to prefix the class names. This is now possible with the `classPrefix` option.

```js
const tour = new Shepherd.Tour({
  classPrefix: 'my-tour-'
});
```
