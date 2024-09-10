---
title: React Usage
---

## Use in React
We've published a React package for years that really just exports the default Shepherd class and gives you some syntactical sugar for setting up Shepherd in a React app. This adds another layer from the root API and provides opinionated patterns. It's mainly a wrapper around the Shepherd library that exposes the tour object and methods to the context object that can be passed into props for dynamic interactivity. We think there's more than one way to create solutions and instead just prefer to provide a couple of examples on how you can do this. 

### Custom hooks pattern
You can just create a hook that will let you setup and share a Tour instance and swap them out as needed.

```javascript
export const useShepherdTour = ({ tourOptions, steps }) => {
  const tourObject = useMemo(() => {
    const tourInstance = new Shepherd.Tour(tourOptions);

    tourInstance.addSteps(steps);

    return tourInstance;
  }, [tourOptions, steps]);

  return tourObject;
};
```

### Context/Provider pattern

```javascript
// App imports above, this is either in a root App.js/ts file or somewhere in your app
const ShepherdTourContext = React.createContext();
const ShepherdTourContextConsumer = ShepherdTourContext.Consumer;
const shepherdTourInstance = new Shepherd.Tour();

return (
  <ShepherdTourContext.Provider value={shepherdTourInstance}>
    { ... }
  </ShepherdTourContext.Provider>
);

// elsewhere in your app within a component
const tour = useContext(ShepherdTourContext);

return (
  <div>
    <HomePage>
      <button className="button dark" onClick={tour.start}>
        Start Tour
      </button>
    </HomePage>
  </div>
);
```