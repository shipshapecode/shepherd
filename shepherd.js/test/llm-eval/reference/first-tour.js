import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const tour = new Shepherd.Tour();
tour.addStep({
  title: 'Welcome',
  text: 'Thanks for joining.',
  buttons: [{ text: 'Next', action: tour.next }]
});
tour.addStep({
  title: 'Projects',
  text: 'Create projects here.',
  attachTo: { element: '#new-project', on: 'bottom' },
  buttons: [
    { text: 'Back', action: tour.back, secondary: true },
    { text: 'Next', action: tour.next }
  ]
});
tour.addStep({
  title: 'Navigation',
  text: 'Everything else lives here.',
  attachTo: { element: '#sidebar', on: 'right' },
  buttons: [
    { text: 'Back', action: tour.back, secondary: true },
    { text: 'Done', action: tour.complete }
  ]
});
tour.start();
