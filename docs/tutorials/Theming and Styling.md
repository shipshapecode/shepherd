We deliver some [predefined themes](/docs/themes.md) (e.g., `shepherd-theme-default` or `shepherd-theme-square`). You are welcome to use one of them by embedding its stylesheet into your app.

```html
<head>
  <link rel="stylesheet" href="shepherd-theme-default.css">
</head>
```

If you'd like to extend a theme within your own CSS, you can pass custom class names to the tour instance &mdash; or, as part of the options for each step &mdash; and use them as hooks for your own styling rules.

```javascript
let tour = new Shepherd.Tour({
  defaultStepOptions: {
    classes: 'shepherd-theme-custom'
  }
});
```

### Leveraging Sass Variables

We use [SASS](https://sass-lang.com/) as pre-processor for CSS. This allows us to extend the CSS language with various syntax techniques &mdash; including variables and color functions that can be used to control theming.

These values and variables can be found in [**_variables.scss**](/src/scss/_variables.scss), and the ones that can be adjusted for theming are listed below.

**🎨 Color Settings**

| Variable | Purpose | Default
|---|---|---
| $shepherd-theme-primary | Primary or brand color. The primary button gets this color. | #3288e6
| $shepherd-theme-secondary | Secondary color. If it is not set explicitly, it is calculated using the primary color. | desaturate(lighten($shepherd-theme-primary, 40), 70)
| $shepherd-text-background | Background color of the text area. | #ffffff
| $shepherd-header-background | Background color of the header element. If it is not set explicitly, it is calculated using the text background color. | darken($shepherd-text-background, 10)

**⚙️ Options**

| Variable | Purpose | Default
|---|---|---
| $shepherd-element-width | Width of the step element | 400px
| $shepherd-element-border-radius | Set radius of rounded corners. 0 means (sharp) pointed corners. | 5px
| $shepherd-element-max-height | Maximum height of the element | 100%
| $shepherd-element-max-width | Maximum width of the element | 100%
| $shepherd-element-z-index | Move the element forward or backward | 9999
| $shepherd-text-line-height | Determine the line height of the body text | 1.3em
| $shepherd-button-border-radius | Decide whether the buttons should have rounded or pointed corners. 0 means (sharp) pointed corners. | 3px
| $use-drop-shadow | The element casts a shadow | true

The example below is intended to illustrate the individual customizations. Please make sure that the values are set before the import of the _base-theme_.

```scss
$shepherd-theme-primary: #9b59b6 !default;
$shepherd-theme-secondary: desaturate(lighten($shepherd-theme-primary, 30), 70) !default;
$shepherd-header-background: #eeeeee !default;
$shepherd-element-border-radius: 0 !default;
$shepherd-button-border-radius: 0 !default;
$use-drop-shadow: true !default;

@import 'base';
```

As a result you get a squared theme with a purple primary button. The individual steps cast a shadow on the underlying elements. The header is colored in a light gray tone.
