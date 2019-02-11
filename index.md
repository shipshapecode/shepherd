## Shepherd

Guide your users through a tour of your app.

### Dependencies

[Tippy.js](https://atomiks.github.io/tippyjs/)

### Install

__npm__
```bash
npm install shepherd.js --save
```

__yarn__
```bash
yarn add shepherd.js
```

### Install with Eager

**Note: Eager is now Cloudflare Apps**

We will eventually make this work again, but it probably currently does not.

<!--The easiest way to add a Shepherd tour to your site is with [Eager](http://eager.io).
Click Install to create a tour right on your site with no coding required.-->

<!--iframe style="height: 48px; width: 180px" src="//install.eager.io?appId=AalP5veMma6s" allowtransparency="true" scroll="no" frameBorder="0"></iframe-->

### Importing Shepherd into your app 

#### Ember Apps

There is an official Ember Addon, [ember-shepherd](https://github.com/shipshapecode/ember-shepherd), for using Shepherd with Ember apps.

#### Rollup/Webpack Based Builds

The latest versions of Rollup and Webpack support ES6 imports. We have an ES module
exported to `dist/js/shepherd.esm.js`. This is also specified as `"module"` in
`package.json`, which should allow you to import using standard ES import syntax.

i.e. 

```js
import Shepherd from 'shepherd.js';
```

#### GitHub Releases

Whenever we release a new version, the contents of the `dist` are uploaded
to the release in GitHub. You can find those assets [here](https://github.com/shipshapecode/shepherd/releases).

### Usage

First create a new `Tour` instance for your tour:

```javascript
const tour = new Shepherd.Tour({
  defaultStepOptions: {
    classes: 'shadow-md bg-purple-dark',
    scrollTo: true
  }
});
```

The `defaultStepOptions` option allows you to specify any options which should be applied
to all this tour's steps by default.

Next, add your steps:

```javascript
tour.addStep('example-step', {
  text: 'This step is attached to the bottom of the <code>.example-css-selector</code> element.',
  attachTo: '.example-css-selector bottom',
  classes: 'example-step-extra-class',
  buttons: [
    {
      text: 'Next',
      action: tour.next
    }
  ]
});
```

Finally, to start the tour, just call `start` on your `Tour` instance:

```javascript
tour.start();
```

If you need to remove a step from your tour, call `removeStep` on your `Tour` instance. If the step currently being displayed is the one you're removing, and there are steps left in the tour, then the first one will be shown, otherwise, the tour will be cancelled.

```javascript
tour.removeStep('example-step');
```


### API

#### Global Shepherd Object

Shepherd exposes a single object onto the window, `Shepherd`.

That global object fires several events to let you link up actions with events
occurring in _any_ tour:

##### Methods

- `Shepherd.on(eventName, handler, [context])`: Bind an event
- `Shepherd.off(eventName, [handler])`: Unbind an event
- `Shepherd.once(eventName, handler, [context])`: Bind just the next instance of an event

##### Events

The global Shepherd fires the following events whenever a `Tour` instance fires them.  It adds to the object passed to the
event handlers a `tour` key pointing to the instance which fired the event:

- `complete`
- `cancel`
- `hide`
- `show`
- `start`
- `active`
- `inactive`

##### Current Tour

The global `Shepherd` includes a property which is always set to the currently active tour, or null if there is no active tour:

- `Shepherd.activeTour`

#### Tour Instances

##### Creation

You create a `Tour` object for each tour you'd like to create.

Tour's constructor accepts a hash of options:

```javascript
const myTour = new Shepherd.Tour(options);
```

##### Tour Options

- `steps`: An array of Step instances to initialize the tour with
- `defaultStepOptions`: Default options for Steps created through `addStep`
- `tourName`: An optional "name" for the tour. This will be appended to the the tour's
dynamically generated `id` property -- which is also set on the `body` element as the `data-shepherd-active-tour` attribute whenever the tour becomes active.
- `useModalOverlay`: Whether or not steps should be placed above a darkened modal overlay. If true, the overlay will create an opening around the target element so that it can remain interactive.
- `confirmCancel`: If true, will issue a window.confirm before cancelling
- `confirmCancelMessage`: The message to display in the confirm dialog

##### Tour Methods

- `addStep(id, options)`: Creates a new Step object with options, and returns the `Step` instance it created.  If you'd like you can also just pass an options hash which includes `id` as a key.
If the options hash doesn't include an `id`, one will be generated.
You can also pass an existing `Step` instance rather than `options`, but note that Shepherd does not support a Step being attached to multiple Tours.
- `getById(id)`: Return a step with a specific id
- `next()`: Advance to the next step, in the order they were added
- `back()`: Show the previous step, in the order they were added
- `cancel()`: Trigger cancel on the current step, hiding it without advancing
- `hide()`: Hide the current step
- `show([id])`: Show the step specified by id (if it's a string), or index (if it's a number) provided.  Defaults to the first step.
- `start()`: Show the first step and begin the tour
- `getCurrentStep()`: Returns the currently shown step
- `on(eventName, handler, [context])`: Bind an event
- `off(eventName, [handler])`: Unbind an event
- `once(eventName, handler, [context])`: Bind just the next instance of an event

##### Tour Events

- `complete`: Triggered when the last step is advanced
- `cancel`
- `hide`
- `show`: Triggered with a hash of the `step` and the `previous` step
- `start`

Steps are instances of the Step object.  They are generally created by the `Tour::addStep` method, which returns the `Step` instance it
created.

#### Steps

##### Step Options

- `text`: The text in the body of the step.  It can be one of four types:
  - HTML string
  - Array of HTML strings
  - `HTMLElement` object
  - Function to be executed when the step is built. It must return one the three options above.
- `title`: The step's title. It becomes an `h3` at the top of the step.
- `attachTo`: What element the step should be attached to on the page.  It can either be a string of the form `"element on"`, or an object with those properties.  For example: `".some #element left"`, or `{element: '.some #element',
on: 'left'}`.  If you use the object syntax, `element` can also be a DOM element.  If you don't specify an `attachTo`
the element will appear in the middle of the screen.
- `beforeShowPromise`: A function that returns a promise. When the promise resolves, the rest of the `show` code for
the step will execute. For example:
  ```javascript
  beforeShowPromise: function() {
    return new Promise(function(resolve) {
      $('#my-bootstrap-modal').on('shown.bs.modal', function () {
        resolve();
      });
    });
  },
  ```
- `classes`: A string of extra classes to add to the step's content element.
- `buttons`: An array of buttons to add to the step. These will be rendered in a footer below the main body text. Each button in the array is an object of the format:
  - `text`: The HTML text of the button
  - `classes`: Extra classes to apply to the `<a>`
  - `action`: A function executed when the button is clicked on
  - `events`: A hash of events to bind onto the button, for example `{'mouseover': function(){}}`.  Adding a click event to `events` when you
  already have an `action` specified is not supported.
  You can use `events` to skip steps or navigate to specific steps, with something like:
  ```javascript
  events: {
    click: function() {
      return Shepherd.activeTour.show('some_step_name');
    }
  }
  ```
- `advanceOn`: An action on the page which should advance shepherd to the next step.  It can be of the form `"selector event"`, or an object with those
properties.  For example: `".some-element click"`, or `{selector: '.some-element', event: 'click'}`.  It doesn't have to be an event inside
the tour, it can be any event fired on any element on the page.  You can also always manually advance the Tour by calling `myTour.next()`.
- `highlightClass`: An extra class to apply to the `attachTo` element when it is highlighted (that is, when its step is active). You can then target that selector in your CSS.
- `showCancelLink`: Should a cancel "✕" be shown in the header of the step?
- `showOn`: A function that, when it returns true, will show the step. If it returns false, the step will be skipped.
- `scrollTo`: Should the element be scrolled to when this step is shown?
- `scrollToHandler`: A function that lets you override the default `scrollTo` behavior and define a custom action to do the scrolling,
and possibly other logic.
- `when`: You can define show, hide, etc events inside when. For example:
```javascript
when: {
  show: function() {
    window.scrollTo(0, 0);
  }
}
```
- `tippyOptions`: Extra [options to pass to `Tippy.js`](https://atomiks.github.io/tippyjs/#all-options). Shepherd [sets a few defaults out of the box](./src/js/utils/tooltip-defaults.js), but anything you set here will override these.

##### Step Methods

- `show()`: Show this step
- `hide()`: Hide this step
- `cancel()`: Hide this step and trigger the `cancel` event
- `complete()`: Hide this step and trigger the `complete` event
- `scrollTo()`: Scroll to this step's element
- `isOpen()`: Returns true if the step is currently shown
- `destroy()`: Remove the element
- `on(eventName, handler, [context])`: Bind an event
- `off(eventName, [handler])`: Unbind an event
- `once(eventName, handler, [context])`: Bind just the next instance of an event

##### Step Events

- `before-show`
- `show`
- `before-hide`
- `hide`
- `complete`
- `cancel`
- `destroy`

Please note that `complete` and `cancel` are only ever triggered if you call the associated methods in your code.

### Advancing on Actions

You can use the `advanceOn` option, or the Next button, to advance steps.  If you would like however to have a step advance on a
complex user action, you can do the following:

```javascript
const myStep = myTour.addStep('my-step', options);

yourApp.on('some-event', () => {
  if (myStep.isOpen()){
    Shepherd.activeTour.next();
  }
});
```

It's strongly recommended that you use some sort of event mediator to connect your app's actions with Shepherd, to prevent
having to sprinkle Shepherd code throughout your codebase, and to keep things loosely coupled.  You can create a basic
mediator if need be using the `Evented` object which is provided with Shepherd:

```javascript
const mediator = new Shepherd.Evented();
```

You can then trigger events in one part of your app:

```javascript
mediator.trigger('user-create');
```

And listen for them in other areas:

```javascript
mediator.on('user-create', () => {});
```

### Rendering Tours in Specific Locations

By default, tour steps will append their elements to the `body` element of the DOM. This is perfect for most use cases, but not always. If you need to have steps appended elsewhere you can take advantage of Tippy's
[`appendTo` option](https://atomiks.github.io/tippyjs/#append-to-option) by defining it on the
`tippyOptions` hash inside of each Step's options hash.


### Browser Support

IE9+ and all modern browsers


## Theming and Styling

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

### 🔼 Displaying Arrows

By default, Shepherd will generate and position an "arrow" element that points to the target
of a step. This is done by setting [Tippy's `arrow` option](https://atomiks.github.io/tippyjs/#arrow-option) to `true` on each ``Step.options.tippyOptions` &mdash; but you can disable the arrow manually by setting it to false:

```js
myTour.addStep('Step 1', {
  tippyOptions: {
    arrow: false
  }
});
```

Furthermore, while each of [Shepherd's themes]((/docs/themes.md)) provides some basic arrow styling, you can style it as you wish by targeting [the markup that's genereated by Tippy](https://atomiks.github.io/tippyjs/#creating-custom-themes-tippy-element-structure).


## Projects Using Shepherd

Here we showcase some of the awesome libraries built using Shepherd.

### JS Framework Wrappers

### [ember-shepherd](https://github.com/shipshapecode/ember-shepherd)

Ember addon for the site tour library Shepherd

### [angular-shepherd](https://github.com/shipshapecode/angular-shepherd)

An Angular wrapper for the site tour library Shepherd

### [react-shepherd](https://github.com/shipshapecode/react-shepherd)

A React wrapper for the site tour library Shepherd

### [vue-shepherd](https://github.com/shipshapecode/vue-shepherd)

A Vue wrapper for the site tour library Shepherd

### Websites and Apps

### [SimplePlanner](https://simpleplanner.io)

[SimplePlanner](https://simpleplanner.io) uses Shepherd to help new users get familiar with its collaborative scheduling approach. 
You do need to sign up via OAuth or email to see the scheduling tour. 
Check out the [Envato Tuts+ Startup Series on its codebase](https://code.tutsplus.com/series/building-your-startup-with-php--cms-742) which describes how Simple Planner was built.

[Brokermate](https://www.brokermate.com/) uses Shepherd to guide users through initial setup steps.

### Your Project Here

If you have a cool open-source library built on Shepherd, PR this doc.
