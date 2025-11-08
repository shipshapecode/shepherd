export default function(shepherd) {
  return [
    {
      text: `
         <p>
            Shepherd is a JavaScript library for guiding users through your app.
            It uses modern CSS anchor positioning to render dialogs for each tour "step".
          </p>
         
          <p>
            CSS anchor positioning ensures your steps are always positioned correctly relative to target elements.
            (Try resizing your browser to see what we mean.)
         </p>`,
      attachTo: {
        element: '.hero-welcome',
        on: 'bottom'
      },
      classes: 'shepherd-step-element shepherd-transparent-text first-step',
      buttons: [
        {
          action: shepherd.cancel,
          classes: 'shepherd-button-secondary cancel-button',
          text: 'Exit'
        }, {
          action: shepherd.next,
          classes: 'shepherd-button-example-primary next-button',
          text: 'Next'
        }
      ],
      id: 'welcome'
    },
    {
      title: 'Including',
      text: 'Including Shepherd is easy! Just include shepherd.js. The styles are bundled with the JS.',
      attachTo: {
        element: '.hero-including',
        on: 'bottom'
      },
      buttons: [
        {
          action: shepherd.back,
          classes: 'shepherd-button-secondary back-button',
          text: 'Back'
        }, {
          action: shepherd.next,
          classes: 'shepherd-button-example-primary next-button',
          text: 'Next'
        }
      ],
      id: 'including',
      classes: 'shepherd-step-element second-step'
    },
    {
      title: 'Example Shepherd',
      text: 'Creating a Shepherd is easy too! Just create Shepherd and add as many steps as you want. Check out the <a href="https://shepherdjs.dev/docs/">documentation</a> to learn more.',
      attachTo: {
        element: '.hero-example',
        on: 'bottom'
      },
      buttons: [
        {
          action: shepherd.back,
          classes: 'shepherd-button-secondary back-button',
          text: 'Back'
        }, {
          action: shepherd.next,
          classes: 'shepherd-button-example-primary next-button',
          text: 'Next'
        }
      ],
      id: 'example',
      classes: 'shepherd-step-element third-step'
    },
    {
      title: 'Learn more',
      text: 'Star Shepherd on Github so you remember it for your next project',
      attachTo: {
        element: '.hero-followup',
        on: 'left'
      },
      buttons: [
        {
          action: shepherd.back,
          classes: 'shepherd-button-secondary back-button',
          text: 'Back'
        }, {
          action: shepherd.next,
          classes: 'shepherd-button-example-primary next-button',
          text: 'Done'
        }
      ],
      id: 'followup',
      classes: 'shepherd-step-element fourth-step'
    }
  ];
}
