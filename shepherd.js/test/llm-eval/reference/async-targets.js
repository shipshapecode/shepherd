import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const tour = new Shepherd.Tour();
const next = { text: 'Next', action: tour.next };
tour.addSteps([
  {
    title: 'Start',
    text: '1',
    attachTo: { element: '#open-settings', on: 'bottom' },
    buttons: [next]
  },
  {
    title: 'Panel',
    text: '2',
    attachTo: { element: '#settings-panel', on: 'bottom' },
    beforeShowPromise: () => window.app.openSettings(),
    buttons: [next]
  },
  {
    title: 'Live',
    text: '3',
    attachTo: { element: '#live-widget', on: 'bottom' },
    waitForElement: 2000,
    buttons: [next]
  },
  {
    title: 'Legacy',
    text: '4',
    attachTo: { element: '#legacy-banner', on: 'bottom' },
    skipMissingElement: true,
    buttons: [next]
  },
  {
    title: 'Bye',
    text: '5',
    attachTo: { element: '#footer', on: 'bottom' },
    buttons: [{ text: 'Done', action: tour.complete }]
  }
]);
tour.start();
