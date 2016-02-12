## Shepherd

[![GitHub
version](https://badge.fury.io/gh/HubSpot%2Fshepherd.svg)](http://badge.fury.io/gh/HubSpot%2Fshepherd)


[![Guide your users through a tour of your app](http://i.imgur.com/LDhfBvd.png)](http://github.hubspot.com/shepherd/docs/welcome)


## Install

__Dependencies__

* __[Tether](https://github.com/HubSpot/tether)__

Installing via `npm` and `bower` will bring in the above dependencies as well.


__npm__
```sh
$ npm install tether-shepherd
```

__bower__
```sh
$ bower install tether-shepherd
```

__Eager__

The easiest way to add a Shepherd tour to your site is with [Eager](http://eager.io).
Click Install to create a tour right on your site with no coding required.

<a href="https://eager.io/app/AalP5veMma6s/install?source=button">
  <img src="https://install.eager.io/install-button.png" border="0" width="126">
</a>


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

[API documentation](http://github.hubspot.com/shepherd/)

[Demo](http://github.hubspot.com/shepherd/docs/welcome/)


## Contributing

We encourage contributions of all kinds. If you would like to contribute in some way, please review our [guidelines for contributing](CONTRIBUTING.md).


## License
Copyright &copy; 2015 HubSpot - [MIT License](LICENSE)
