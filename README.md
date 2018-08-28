## Shepherd

<a href="https://shipshape.io/"><img src="http://i.imgur.com/KVqNjgO.png" alt="Ship Shape" width="100" height="100"/></a>

**[Shepherd is maintained by Ship Shape. Contact us for Ember.js consulting, development, and training for your project](https://shipshape.io/ember-consulting/)**.

[![npm version](https://badge.fury.io/js/shepherd.js.svg)](http://badge.fury.io/js/shepherd.js)
[![Build Status](https://travis-ci.org/shipshapecode/shepherd.svg?branch=master)](https://travis-ci.org/shipshapecode/shepherd)
[![Maintainability](https://api.codeclimate.com/v1/badges/b295b0cc0d828ccc1b76/maintainability)](https://codeclimate.com/github/shipshapecode/shepherd/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b295b0cc0d828ccc1b76/test_coverage)](https://codeclimate.com/github/shipshapecode/shepherd/test_coverage)

[![Guide your users through a tour of your app](http://i.imgur.com/LDhfBvd.png)](https://shipshapecode.github.io/shepherd/docs/welcome/)


## Install

__Dependencies__

* __[Popper.js](https://github.com/FezVrasta/popper.js)__

Installing via `npm` will bring in the above dependencies as well.

__npm__
```bash
npm install shepherd.js --save
```

__yarn__
```bash
yarn add shepherd.js
```

## Usage

```javascript
let tour = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-arrows'
  }
});

tour.addStep('example', {
  title: 'Example Shepherd',
  text: 'Creating a Shepherd is easy too! Just create ...',
  attachTo: '.hero-example bottom',
  advanceOn: '.docs-link click'
});

tour.start();
```

[API documentation](https://shipshapecode.github.io/shepherd/)

[Demo](https://shipshapecode.github.io/shepherd/docs/welcome/)

## Using Themes
We deliver some predefined themes (e.g. shepherd-theme-default or shepherd-theme-square). You are welcome to use them and embed them into your page as additional stylesheets.

```html
<head>
  <link rel="stylesheet" href="shepherd-theme-default.css">
</head>
```

Individual customizations to the standard themes must be made within the CSS file. Furthermore, individual CSS classes can be passed via the tour instance or for each step individually, to overwritte or supplement  existing style properties.

```javascript
let tour = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-custom'
  }
});
```

### Custom Themeing
We use [SASS](https://sass-lang.com/) as pre-processor for CSS. In connection with SASS there are extensive possibilities to generate CSS. For example, SASS can calculate or increase the saturation of color values. In addition, variables can be defined (similar to a scripting language), which ultimately end up as values in the CSS result. We make use of these extended possibilities by extracting themeing-relevant values as variables (__variables.scss_). This makes it easy to individualise colors and shapes.

Basically, there are only a handful of variables that need to be adjusted. A distinction is made between color settings and other options.

**Color Settings**

| Variable | Purpose | Default
|---|---|---
| $shepherd-theme-primary | Primary or brand color. Primary button gets this color. | #3288e6
| $shepherd-theme-secondary | Secondary color. If it is not set explicitly, it is calculated using the primary color. | desaturate(lighten($shepherd-theme-primary, 40), 70)
| $shepherd-text-background | Background color of the text area. | #ffffff
| $shepherd-header-background | Background color of the header element. If it is not set explicitly, it is calculated using the text background color. | darken($shepherd-text-background, 10) 

**Options**

| Variable | Purpose | Default
|---|---|---
| $shepherd-element-width | Width of the step element | 400px
| $shepherd-element-border-radius | Set radius of rounded corners. 0 means (sharp) pointed corners. | 5px
| $shepherd-element-max-height | Maximum height of the element | 100%
| $shepherd-element-max-width | Maximum width of the element | 100%
| $shepherd-text-line-height | Determine the line height of the body text | 1.3em
| $shepherd-element-z-index | Move the element forward or backward | 9999
| $use-drop-shadow | The element casts a shadow | true

The example below is intended to illustrate the individual customizations. Please make sure that the values are set before the import of the _base-theme_.

```scss
$shepherd-theme-primary: #9b59b6 !default;
$shepherd-theme-secondary: desaturate(lighten($shepherd-theme-primary, 30), 70) !default;
$shepherd-header-background: #eeeeee !default;
$shepherd-element-border-radius: 0 !default;
$use-drop-shadow: true !default;

@import 'base';
```

As a result you get a squared theme with a purple primary button. The individual steps cast a shadow on the underlying elements. The header is colored in a light gray tone.

## Contributing

We encourage contributions of all kinds. If you would like to contribute in some way, please review our [guidelines for contributing](CONTRIBUTING.md).


## License
[MIT License](LICENSE)
