import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const tour = new Shepherd.Tour({ useModalOverlay: true });
tour.on('cancel', () => window.onTourEnd('cancelled'));
tour.addStep({
  title: 'Careful',
  text: 'This cannot be undone.',
  attachTo: { element: '#delete', on: 'top' },
  canClickTarget: false,
  cancelIcon: { enabled: true }
});
tour.start();
