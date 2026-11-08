# react-shepherd

[![NPM](https://img.shields.io/npm/v/react-shepherd.svg)](https://www.npmjs.com/package/react-shepherd)

This is a React wrapper for the
[Shepherd](https://github.com/shipshapecode/shepherd) tour library. It's mainly
a wrapper around the Shepherd library that exposes the tour object and methods
to the context object that can be passed into props for dynamic interactivity.

## Install

Use this simple NPM command or whatever package manager is your favorite.

```bash
npm install --save react-shepherd
```

## Usage

### Via Provider/Context

```tsx
import { useEffect, useMemo } from 'react';
import { ShepherdJourneyProvider, useShepherd } from 'react-shepherd';
import 'shepherd.js/dist/css/shepherd.css';

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true
    }
  },
  useModalOverlay: true,
  steps: [
    {
      title: 'Welcome',
      text: 'This is the only step.',
      buttons: [{ text: 'Done', action: 'complete' as const }]
    }
  ]
};

function Button() {
  const Shepherd = useShepherd();
  const tour = useMemo(() => new Shepherd.Tour(tourOptions), [Shepherd]);

  // Ends the tour if this component unmounts while it is open.
  useEffect(
    () => () => {
      if (tour.isActive()) tour.complete();
    },
    [tour]
  );

  return (
    <button className="button dark" onClick={tour.start}>
      Start Tour
    </button>
  );
}

export default function App() {
  return (
    <div>
      <ShepherdJourneyProvider>
        <Button />
      </ShepherdJourneyProvider>
    </div>
  );
}
```

### Starting a tour when a component mounts

Create the tour in an effect and end it in the cleanup. React StrictMode runs
effects twice, and a tour left open by the first run stays on screen next to the
second. The cleanup fires the tour's `complete` event.

```tsx
useEffect(() => {
  const tour = new Shepherd.Tour(tourOptions);
  tour.start();
  return () => {
    tour.complete();
  };
}, [Shepherd]);
```

## API

- `ShepherdJourneyProvider`: wrap your app in it.
- `useShepherd()`: takes no arguments and returns the `Shepherd` object. Pass
  [tour options](https://docs.shepherdjs.dev/api/tour/classes/tour/) to
  `new Shepherd.Tour()`.

Older versions exported `ShepherdTour` and `ShepherdTourContext`. They no longer
exist.

## License

`react-shepherd` is licensed under **AGPL-3.0** (for open source and
non-commercial use) with a **Commercial License** available for commercial use.

- **Free** for open source and non-commercial projects under AGPL-3.0
- **Commercial license required** for commercial products and revenue-generating
  companies

📄 [Read License Details](../../LICENSE.md)  
💳 [Purchase Commercial License](https://shepherdjs.dev/pricing)
