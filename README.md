<p align="center">
  <img 
    alt="Shepherd.js Logo"
    src="https://i.imgur.com/cowwtSX.png"/>
</p>
  

[![npm version](https://badge.fury.io/js/shepherd.js.svg)](http://badge.fury.io/js/shepherd.js)
![Download count all time](https://img.shields.io/npm/dt/shepherd.js.svg)
![npm](https://img.shields.io/npm/dm/shepherd.js.svg)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fshipshapecode%2Fshepherd.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%shipshapecode%2Fshepherd?ref=badge_shield)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/shepherd.js.svg)
[![Test](https://github.com/shipshapecode/shepherd/actions/workflows/test.yml/badge.svg)](https://github.com/shipshapecode/shepherd/actions/workflows/test.yml)
[![Maintainability](https://qlty.sh/gh/shipshapecode/projects/shepherd/maintainability.svg)](https://qlty.sh/gh/shipshapecode/projects/shepherd)
[![Code Coverage](https://qlty.sh/gh/shipshapecode/projects/shepherd/coverage.svg)](https://qlty.sh/gh/shipshapecode/projects/shepherd)
[![StackShare](https://img.shields.io/badge/Follow%20on-StackShare-blue.svg?logo=stackshare&style=flat)](https://stackshare.io/shepherd-js)  

[Shepherd](https://shepherdjs.dev/) is a source-available, fully featured, digital adoption platform (DAP) and user on-boarding service.

Supported Browsers
----------------------------------------------------------

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| Edge| last 2 versions| last 2 versions| last 2 versions

# Shepherd

Shepherd makes it simple to create custom user on-boarding tours, trainings and announcements to drive user adoption. 

Shepherd enables you to guide users through a custom tour or journey within your app or website. Highly customizable with minimal styles, Shepherd allows for powerful customization while being easy to use. Various frameworks supported including React, Ember, Angular, Vue.js, ES Modules, or plain JavaScript. 

# Demo
See Shepherd Live on our website by clicking on the image:
<a href="https://shepherdjs.dev">
  <img 
    src="https://shepherdjs.dev/img/demo.png" 
    alt="Guide your users through a tour of your app" 
    style="height: auto; max-width: 800px; width: 100%;"/>
</a>

# Using Shepherd

```bash
npm install shepherd.js
```

```js
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const tour = new Shepherd.Tour({ useModalOverlay: true });

tour.addStep({
  title: 'Welcome',
  text: 'This step points at the save button.',
  attachTo: { element: '#save', on: 'bottom' },
  buttons: [{ text: 'Done', action: 'complete' }]
});

tour.start();
```

Steps position themselves with a small built-in engine. Tune the gap, edge distance and flipping with `positionOptions: { offset, padding, strategy, flip }`. Upgrading from Shepherd 15, which took Floating UI middleware in `floatingUIOptions`? See [the upgrade notes](https://docs.shepherdjs.dev/guides/install/#upgrading-from-shepherd-15).

Coding agents: read [`shepherd.js/AGENTS.md`](shepherd.js/AGENTS.md), which is also in the npm package.

### Shepherd Standalone Library

The Shepherd Standalone Library has been free for noncommercial use since the very beginning. Check out our tutorials here:

#### [React Shepherd Wrapper](packages/react)
#### [Angular Shepherd Wrapper](https://github.com/shipshapecode/angular-shepherd)
#### [Vue Shepherd Wrapper](https://github.com/shipshapecode/vue-shepherd)
#### [Ember Shepherd Wrapper](https://github.com/RobbieTheWagner/ember-shepherd)


# White Glove Services

If you have an idea or project in mind and would like to engage our team to build a custom tour, training or on-boarding experience, [get in touch](mailto:ahoy@shipshape.io)! 


## Resources

- [Website](https://shepherdjs.dev/)
- [Documentation](https://docs.shepherdjs.dev/)
- [Demo](https://shepherdjs.dev/)
- [Discord](https://discord.gg/EGcDW5NSud)


## Contributing

We encourage contributions of all kinds. If you would like to contribute in some way, please review our [guidelines for contributing](CONTRIBUTING.md).
Our release process is mostly automated. For more details, see [RELEASE.md](RELEASE.md).


## Projects Already Using Shepherd

### Rails gems

### [abraham](https://github.com/actmd/abraham)

Rails engine that generates and tracks Shepherd tours within an application

### Websites and Apps

### [SimplePlanner](https://simpleplanner.io)

[SimplePlanner](https://simpleplanner.io) uses Shepherd to help new users get familiar with its collaborative scheduling approach. 
You do need to sign up via OAuth or email to see the scheduling tour. 
Check out the [Envato Tuts+ Startup Series on its codebase](https://code.tutsplus.com/series/building-your-startup-with-php--cms-742) which describes how Simple Planner was built.

### [LogSeq](https://logseq.com/) 

[LogSeq](https://logseq.com/) uses Shepherd to guide users through initial setup steps.

### [Snapsure](https://snapsure.app)

[Snapsure](https://snapsure.app) uses Shepherd to help photographers learn how to set up alerts for their desired picture-perfect weather conditions.

### [Drupal](https://www.drupal.org/docs/8/core/modules/tour/overview)

The [Drupal](https://www.drupal.org/docs/8/core/modules/tour/overview) CMS uses Shepherd to offer tours of it's core modules, and allows developers to add Tours to their custom and contributed modules.

### [Budibase Shepherd Tour Plugin](https://github.com/JayP718/tour_shepherd_bb_plugin)

[Budibase](https://budibase.com/) is an open source application which allows you develop low code applications rapidly and efficiently.This [Budibase](https://budibase.com/) Shepherd tour plugin allows you to create interative walkthroughs for your application.


### Your Project Here

If you have a cool open-source library built on Shepherd, PR this doc.


## License

Shepherd.js is source-available under the PolyForm Noncommercial License 1.0.0, with a commercial license for commercial use.

- **Free** for personal, hobby, educational, and other noncommercial use
- **Free to evaluate** for 30 days in a commercial project
- **Commercial license required** for commercial products, client work, and internal tools at for-profit companies. It is a one-time payment from $50.

See [LICENSE.md](LICENSE.md) for complete details or visit [shepherdjs.dev/pricing](https://shepherdjs.dev/pricing) to purchase a commercial license.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fshipshapecode%2Fshepherd.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fshipshapecode%2Fshepherd?ref=badge_large)
