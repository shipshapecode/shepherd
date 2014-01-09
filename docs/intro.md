<link rel="stylesheet" href="/shepherd/css/shepherd-theme-arrows.css" />
<script src="/shepherd/deps/tether/tether.min.js"></script>
<script src="/shepherd/shepherd.min.js"></script>

## Shepherd

Guide your users through a tour of your app.

### Dependencies

Shepherd uses [Tether](http://github.hubspot.com/tether/docs/welcome) to
position each step container. You can [download Tether here](https://github.com/HubSpot/tether/releases).

### Usage

Using `Shepherd` is really easy.

First create a new `Shepherd` instance.

```coffeescript
shepherd = new Shepherd
  defaults:
    classes: 'shepherd shepherd-open shepherd-theme-arrows'
    scrollTo: true
```

 The main options you'll want to
set are the class names to be added to each step. To use the default
theme `shepherd-theme-arrows`, set `classes` to `"shepherd shepherd-open shepherd-theme-arrows"`.
Also, you'll want to set `scrollTo` to `true` if you want Shepherd to try to
scroll to step targets when it advances from one step to another.

After creating an instance to work with, you'll add steps for each target you want. You can name steps if you want to be able shortcut to them later.

```coffeescript
shepherd.addStep 'example-step',
  text: 'This step is attached to the bottom of the <code>.example-css-selector</code> element.'
  attachTo: '.example-css-selector bottom'
  classes: 'example-step-extra-class'
  buttons: [
    text: 'Next'
    action: shepherd.next
  ]
```

Finally, to start the tour, just call `start`.

```coffeescript
shepherd.start()
```

### Browser Support

Same as Tether: IE9+, Chrome, Firefox, Opera.