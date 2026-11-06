import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const KEY = 'acme-tour-seen';

if (!localStorage.getItem(KEY)) {
  const tour = new Shepherd.Tour();
  const finish = (outcome) => () => {
    localStorage.setItem(KEY, '1');
    window.analytics.track('tour_finished', { outcome });
  };
  tour.on('complete', finish('completed'));
  tour.on('cancel', finish('dismissed'));
  tour.on('show', ({ step }) =>
    window.analytics.track('tour_step', { id: step.id })
  );
  tour.addSteps([
    {
      id: 'menu',
      title: 'Menu',
      text: 'Open the menu.',
      attachTo: { element: '#menu', on: 'bottom' },
      advanceOn: { selector: '#menu', event: 'click' }
    },
    {
      id: 'item',
      title: 'Item',
      text: 'Here it is.',
      attachTo: { element: '#menu-item', on: 'bottom' },
      buttons: [{ text: 'Done', action: tour.complete }]
    }
  ]);
  tour.start();
}
