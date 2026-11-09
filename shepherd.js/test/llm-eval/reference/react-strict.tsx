import { useEffect, useRef, useState } from 'react';
import { ShepherdJourneyProvider, useShepherd } from 'react-shepherd';
import type { Tour } from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

function Page() {
  const Shepherd = useShepherd();
  const [count, setCount] = useState(0);
  const tourRef = useRef<Tour | null>(null);

  useEffect(() => {
    const tour = new Shepherd.Tour({
      steps: [
        {
          title: 'Step A',
          text: 'A',
          attachTo: { element: '#a', on: 'bottom' },
          buttons: [
            {
              text: 'Next',
              action() {
                return this.next();
              }
            }
          ]
        },
        {
          title: 'Step B',
          text: 'B',
          attachTo: { element: '#b', on: 'bottom' },
          buttons: [
            {
              text: 'Done',
              action() {
                return this.complete();
              }
            }
          ]
        }
      ]
    });
    tourRef.current = tour;
    tour.start();
    return () => {
      tour.complete();
    };
  }, [Shepherd]);

  return (
    <>
      <div id="a" style={{ position: 'absolute', left: 500, top: 100 }}>
        A
      </div>
      <div id="b" style={{ position: 'absolute', left: 500, top: 300 }}>
        B
      </div>
      <button id="replay" onClick={() => tourRef.current?.start()}>
        Replay tour
      </button>
      <button id="bump" onClick={() => setCount((c) => c + 1)}>
        Bump
      </button>
      <span id="count">{count}</span>
    </>
  );
}

export default function App() {
  return (
    <ShepherdJourneyProvider>
      <Page />
    </ShepherdJourneyProvider>
  );
}
