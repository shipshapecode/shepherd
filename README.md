## Shepherd

[![npm version](https://badge.fury.io/js/shepherd.js.svg)](http://badge.fury.io/js/shepherd.js)
[![Build Status](https://travis-ci.org/shipshapecode/shepherd.svg?branch=master)](https://travis-ci.org/shipshapecode/shepherd)


[![Guide your users through a tour of your app](http://i.imgur.com/LDhfBvd.png)](https://shipshapecode.github.io/shepherd/docs/welcome/)


## Install

__Dependencies__

* __[Popper.js](https://github.com/FezVrasta/popper.js)__

Installing via `npm` will bring in the above dependencies as well.


__npm__
```sh
$ npm install shepherd.js
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


## Contributing

We encourage contributions of all kinds. If you would like to contribute in some way, please review our [guidelines for contributing](CONTRIBUTING.md).


## License
[MIT License](LICENSE)
