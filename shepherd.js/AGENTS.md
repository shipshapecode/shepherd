# Using Shepherd

Instructions for coding agents writing against this package. Shepherd renders
guided product tours in the browser. Full option docs are the TSDoc in
`dist/js/shepherd.d.mts`.

## A working tour

```js
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const tour = new Shepherd.Tour({ useModalOverlay: true });

tour.addStep({
  title: 'First',
  text: 'Explains the first thing.',
  attachTo: { element: '#a', on: 'bottom' },
  buttons: [{ text: 'Next', action: 'next' }]
});
tour.addStep({
  title: 'Second',
  text: 'Explains the second thing.',
  attachTo: { element: '#b', on: 'bottom' },
  buttons: [
    { text: 'Back', action: 'back', secondary: true },
    { text: 'Done', action: 'complete' }
  ]
});

tour.start();
```

`import { Tour } from 'shepherd.js'` works too.

## Rules that are easy to get wrong

- **Import the stylesheet.** The JS import does not include it. Without it the step
  renders unstyled and the overlay does not dim the page.
- **Button `action`** is a method name (`'next'`, `'back'`, `'cancel'`, `'complete'`)
  or a function. Prefer the name. A function is bound to the tour, so write
  `action() { return this.show('pricing'); }`. `() => this.next()` fails, because an
  arrow function has no such binding. Use `() => tour.next()` instead.
- **Inside `new Shepherd.Tour({ steps: [...] })`,** `action: tour.next` reads `tour`
  before it exists. Use `action: 'next'`.
- **`attachTo`** is always an object: `{ element, on }`. `on` is `top`, `bottom`,
  `left`, `right` or `auto`, optionally with `-start` or `-end`, as in `bottom-start`.
  Without `on`, the step is centered. To center a step, omit `attachTo`.
- **`useModalOverlay`** goes on the tour, not on a step. Add `canClickTarget: false` to
  a step to block clicks on its target.
- **`cancelIcon: { enabled: true }`** adds the close "×". It is off by default.
- **`defaultStepOptions`** applies to every step added to that tour. A step's own value
  replaces the default for that option, so a step's `buttons` replace the default
  buttons and its `cancelIcon` replaces the whole default object. Only `classes` and
  `positionOptions` combine, `positionOptions` key by key.
- **`positionOptions`** tunes placement: `{ offset: 12 }` for a gap, `padding` for the
  distance kept from the viewport edges, `strategy: 'fixed'` for a fixed target, and
  `flip: false` to keep `attachTo.on`. Shepherd has its own positioning and runs no
  Floating UI middleware, so there is no `floatingUIOptions` and no `middleware`.
- **`scrollTo: true`** is needed to scroll a target into view. It is off by default.
- **`title` and `text` render as HTML.** Escape untrusted input.
- **`Shepherd.activeTour`** is empty until a tour starts. Do not read it while defining
  a step. Read it inside a handler.
- **Global:** `shepherd.mjs` defines no `window.Shepherd`. See "No bundler".

## Targets that are not on the page yet

| Situation                                      | Option                                        |
| ---------------------------------------------- | --------------------------------------------- |
| Your code must do something first              | `beforeShowPromise: () => openPanel()`        |
| The element appears by itself, later           | `waitForElement: 2000` (milliseconds)         |
| The element may never exist; leave the step out | `skipMissingElement: true`                   |

`beforeShowPromise` takes a function returning a promise, not a promise. A promise
would start its work when the tour is defined, and would be ignored.
`waitForElement` and `skipMissingElement` look up the target before
`beforeShowPromise` runs, so do not combine them for a target it creates.

A missing target does not throw. The step is centered, and the console says so.

## Events

```js
tour.on('complete', () => {}); // "Done", or anything calling tour.complete()
tour.on('cancel', () => {}); // The close icon, Escape, or tour.cancel()
tour.on('show', ({ step, previous }) => console.log(step.id));
```

Register tour-level events on the tour. A step's `complete` and `cancel` fire only
from `step.complete()` and `step.cancel()`. Per-step events go in
`when: { show() {}, hide() {} }`, with `this` set to the step. Give steps an `id` if
you need to refer to them. To advance when the user does something on the page, use
`advanceOn: { selector: '#menu', event: 'click' }`.

Escape and the arrow keys work once focus has moved into the step, one frame after
it is positioned.

## React

`react-shepherd` exports `ShepherdJourneyProvider` and `useShepherd`, which returns the
`Shepherd` object. It has no `ShepherdTour` component or `ShepherdTourContext`; those
are from old versions.

Create the tour in an effect and end it in the cleanup. React StrictMode runs effects
twice, and a tour left open by the first run stays on screen next to the second.

```jsx
function Page() {
  const Shepherd = useShepherd();
  const tourRef = useRef(null);

  useEffect(() => {
    const tour = new Shepherd.Tour({
      steps: [
        {
          title: 'Hello',
          attachTo: { element: '#a', on: 'bottom' },
          buttons: [{ text: 'Done', action: 'complete' }]
        }
      ]
    });
    tourRef.current = tour;
    tour.start();
    return () => {
      tour.complete();
    };
  }, [Shepherd]);

  return <button onClick={() => tourRef.current.start()}>Replay</button>;
}
```

Wrap the app in `<ShepherdJourneyProvider>`, and import the stylesheet. The cleanup
fires `complete`, so keep anything like "mark as seen" out of a `complete` handler
that the cleanup can trigger, for instance by setting it in the "Done" button's
`action` function.

Server rendering is safe: on the server, a tour's methods do nothing.

## No bundler

`shepherd.mjs` is an ES module. Load it with `type="module"` and import it:

```html
<link rel="stylesheet" href="/node_modules/shepherd.js/dist/css/shepherd.css" />
<script type="module">
  import Shepherd from '/node_modules/shepherd.js/dist/js/shepherd.mjs';

  const tour = new Shepherd.Tour();
  tour.addStep({
    text: 'Hello',
    buttons: [{ text: 'Done', action: 'complete' }]
  });
  tour.start();
</script>
```

## Tours as data

A tour with named button actions is plain JSON: `new Shepherd.Tour(json).start()`.
`shepherd.js/tour.schema.json` is the JSON Schema for it, usable for validation or as
the output schema when a model generates a tour. Functions, such as
`beforeShowPromise`, `when` and `showOn`, are not part of the schema.

## Names from older versions and other libraries

| Do not write                                   | Write                                        |
| ---------------------------------------------- | -------------------------------------------- |
| `showCancelLink: true`                         | `cancelIcon: { enabled: true }`              |
| `defaults: {...}`                              | `defaultStepOptions: {...}`                  |
| `modal: true`, `overlay: true`                 | `useModalOverlay: true`                      |
| `attachTo: '#a bottom'`                        | `attachTo: { element: '#a', on: 'bottom' }`  |
| `position: 'bottom'`, `on: 'below'`            | `on: 'bottom'`                               |
| `on: 'bottom-left'`                            | `on: 'bottom-start'`                         |
| `content`, `body`, `description`               | `text`                                       |
| `tippyOptions`, `popperOptions`                | `positionOptions`                            |
| `floatingUIOptions: { middleware: [offset(12)] }` | `positionOptions: { offset: 12 }`         |
| Button `type: 'next'`                          | Button `action: 'next'`                      |
| `shepherd-theme-*.css`                         | `dist/css/shepherd.css`                      |
| `import { ShepherdTour } from 'react-shepherd'` | `useShepherd`, `ShepherdJourneyProvider`    |

## Motion and theming

The overlay's opening glides between steps by default, and cuts straight there under
`prefers-reduced-motion: reduce`. Set `transition-duration: 0s` on
`.shepherd-modal-overlay-container path` to turn it off.

Two extras ship separately, and cost nothing unless imported:

```js
import 'shepherd.js/dist/css/theme.css'; // After shepherd.css. Restyle it through --shepherd-* properties.
import { glideSteps, stepProgress } from 'shepherd.js/motion';

glideSteps(tour); // Moves the dialog with the opening.
stepProgress(tour); // Feeds the theme's step counter and progress bar.
```

Each of those functions returns a function that stops it.

## Licensing

Free under AGPL-3.0 for open source and non-commercial use. Commercial products need a
commercial license: https://shepherdjs.dev/pricing. Tell the user if it applies.
