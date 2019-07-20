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

| Variable                   | Purpose                                                     | Default
|----------------------------|-------------------------------------------------------------|--------
| shepherdThemePrimary       | Primary or brand color: The primary button gets this color. | #3288e6
| shepherdThemeSecondary     | Secondary color                                             | desaturate(lighten($shepherd-theme-primary, 40), 70)
| shepherdTextBackground     | Background color of the text area                           | #ffffff
| shepherdHeaderBackground   | Background color of the header                              | shader(shepherdTextBackground, -0.1)
| shepherdThemeTextPrimary   | The text color for the primary button                       | getContrastingColor(shepherdThemePrimary)
| shepherdThemeTextSecondary | The text color for the secondary button                     | getContrastingColor(shepherdThemeSecondary)
| shepherdThemeTextHeader    | The text color for the header                               | getContrastingColor(shepherdHeaderBackground)
| shepherdThemeTextColor     | The text color for the step content                         | getContrastingColor(shepherdTextBackground)

* `shepherdThemeSecondary` is derived from the primary color, if not explicitly set.
* `shepherdHeaderBackground` is calculated using the text background color, if not explicitly set.
* The text colors are calculated to contrast the background colors by default, unless explicitly set.

**⚙️ Options**

| Variable                    | Purpose                                                            | Default
|-----------------------------|--------------------------------------------------------------------|--------
| shepherdElementWidth        | Width of the step element                                          | 400px
| shepherdElementBorderRadius | Sets the border-radius of the shepherd-element.                    | 5px
| shepherdElementMaxHeight    | Maximum height of the element                                      | 100%
| shepherdElementMaxWidth     | Maximum width of the element                                       | 100%
| shepherdElementZIndex       | Move the element forward or backward                               | 9999
| shepherdTextLineHeight      | Sets the line height of the body text                              | 1.3em
| shepherdButtonBorderRadius  | Decide whether the buttons should have rounded or pointed corners. | 3px
| useDropShadow               | The element casts a shadow                                         | true

The example below is intended to illustrate the individual customizations.

```js
const tour = new Shepherd.Tour({
  styleVariables: {
    shepherdButtonBorderRadius: 0,
    shepherdElementBorderRadius: 0,
    shepherdHeaderBackground: '#eeeeee',
    shepherdThemePrimary: '#9b59b6',
    useDropShadow: true
  }
});
```

As a result you get a squared theme with a purple primary button. The individual steps cast a shadow on the underlying elements, and 
the header is colored in a light gray tone.

### Adding a prefix to the `shepherd-*` classes

If you have a situation where you are running two Shepherd instances on a page, and they need to be styled
differently, you may want to prefix the class names. This is now possible with the `classPrefix` option.

```js
const tour = new Shepherd.Tour({
  classPrefix: 'my-tour-'
});
```
