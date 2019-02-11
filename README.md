## Shepherd

<a href="https://shipshape.io/"><img src="http://i.imgur.com/DWHQjA5.png" alt="Ship Shape" width="100" height="100"/></a>

**[Shepherd is maintained by Ship Shape. Contact us for Ember.js consulting, development, and training for your project](https://shipshape.io/ember-consulting/)**.

[![npm version](https://badge.fury.io/js/shepherd.js.svg)](http://badge.fury.io/js/shepherd.js)
![Download count all time](https://img.shields.io/npm/dt/shepherd.js.svg)
[![npm](https://img.shields.io/npm/dm/shepherd.js.svg)]()
[![Build Status](https://travis-ci.org/shipshapecode/shepherd.svg?branch=master)](https://travis-ci.org/shipshapecode/shepherd)
[![Maintainability](https://api.codeclimate.com/v1/badges/b295b0cc0d828ccc1b76/maintainability)](https://codeclimate.com/github/shipshapecode/shepherd/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b295b0cc0d828ccc1b76/test_coverage)](https://codeclimate.com/github/shipshapecode/shepherd/test_coverage)
[![Greenkeeper badge](https://badges.greenkeeper.io/shipshapecode/shepherd.svg)](https://greenkeeper.io/)

[![Guide your users through a tour of your app](/docs/assets/img/intro-step.png)](https://shipshapecode.github.io/shepherd/docs/welcome/)

## Install

### JS Framework Wrappers

We strive to make it easy to use Shepherd in all the major frameworks, and have written wrappers to facilitate this.

* [angular-shepherd](https://github.com/shipshapecode/angular-shepherd)
* [ember-shepherd](https://github.com/shipshapecode/ember-shepherd)
* [react-shepherd](https://github.com/shipshapecode/react-shepherd)
* [vue-shepherd](https://github.com/shipshapecode/vue-shepherd)


### Install Directly

__Dependencies__

* __[Tippy.js](https://atomiks.github.io/tippyjs/)__

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
  defaultStepOptions: {
    classes: 'shadow-md bg-purple-dark',
    scrollTo: true
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

## Contributing

We encourage contributions of all kinds. If you would like to contribute in some way, please review our [guidelines for contributing](CONTRIBUTING.md).


## License
[MIT License](LICENSE)
