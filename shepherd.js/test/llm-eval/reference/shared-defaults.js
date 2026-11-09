import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const tour = new Shepherd.Tour({
  defaultStepOptions: {
    classes: 'acme-step',
    scrollTo: { block: 'center' },
    cancelIcon: { enabled: true },
    buttons: [
      {
        text: 'Next',
        action() {
          return this.next();
        }
      }
    ]
  }
});
tour.addSteps([
  { title: 'One', text: '1', attachTo: { element: '#one', on: 'bottom' } },
  {
    title: 'Two',
    text: '2',
    attachTo: { element: '#two', on: 'bottom' },
    cancelIcon: { enabled: false }
  },
  { title: 'Three', text: '3', attachTo: { element: '#three', on: 'bottom' } },
  {
    title: 'Four',
    text: '4',
    attachTo: { element: '#four', on: 'bottom' },
    buttons: [
      {
        text: 'Finish',
        action() {
          return this.complete();
        }
      }
    ]
  }
]);
tour.start();
