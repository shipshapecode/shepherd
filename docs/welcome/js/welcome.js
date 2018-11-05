(function() {

  function init() {
    const shepherd = setupShepherd();

    setTimeout(() => {
      shepherd.start();
    }, 400);
  }

  function setupShepherd () {
    const shepherd = new Shepherd.Tour({
      defaultStepOptions: {
        showCancelLink: true
      }
    });

    shepherd.addStep('welcome', {
      text: [
        `
          Shepherd is a JavaScript library for guiding users through your app.
          It uses <a href="https://atomiks.github.io/tippyjs//">Tippy.js</a>,
          another open source library, to render dialogs for each tour "step".
        `,
        `
          Among many things, Tippy makes sure your steps never end up off screen or cropped by an overflow.
          (Try resizing your browser to see what we mean.)
        `,
        `
          It also offers a robust API for styling animations of steps
          as they enter and exit the view.
        `
      ],
      attachTo: '.hero-welcome bottom',
      classes: 'shepherd shepherd-welcome',
      buttons: [
        {
          action: shepherd.cancel,
          classes: 'shepherd-button-secondary',
          text: 'Exit'
        }, {
          action: shepherd.next,
          text: 'Next'
        }
      ]
    });
    shepherd.addStep('including', {
      title: 'Including',
      text: 'Including Shepherd is easy! Just include tippy.all.min.js, shepherd.js, and a Shepherd theme file.',
      attachTo: '.hero-including bottom',
      buttons: [
        {
          action: shepherd.back,
          classes: 'shepherd-button-secondary',
          text: 'Back'
        }, {
          action: shepherd.next,
          text: 'Next'
        }
      ]
    });
    shepherd.addStep('creating', {
      title: 'Creating a Shepherd Tour',
      text: `Creating a Shepherd tour is easy. too!\
      Just create a \`Tour\` instance, and add as many steps as you want.`,
      attachTo: '.hero-example bottom',
      buttons: [
        {
          action: shepherd.back,
          classes: 'shepherd-button-secondary',
          text: 'Back'
        }, {
          action: shepherd.next,
          text: 'Next'
        }
      ]
    });
    shepherd.addStep('attaching', {
      title: 'Attaching to Elements',
      text: `Your tour steps can target and attach to elements in DOM (like this step).`,
      attachTo: '.hero-example bottom',
      buttons: [
        {
          action: shepherd.back,
          classes: 'shepherd-button-secondary',
          text: 'Back'
        }, {
          action: shepherd.next,
          text: 'Next'
        }
      ]
    });
    shepherd.addStep('centered-example', {
      title: 'Centered Shepherd Element',
      text: `But attachment is totally optional!\n \
      Without a target, a tour step will create an element that's centered within the view. \
      Check out the <a href="https://shipshapecode.github.io/shepherd/">documentation</a> to learn more.`,
      buttons: [
        {
          action: shepherd.back,
          classes: 'shepherd-button-secondary',
          text: 'Back'
        }, {
          action: shepherd.next,
          text: 'Next'
        }
      ]
    });
    shepherd.addStep('example-attach-to-shadow-dom', {
      title: 'Example Attaching Step to Shadow Dom',
      text: `You can easily attach to shadow DOM inside a web component using an array of selectors.\n \
      This new form of selector is now supported using the "object" format of the attachTo step option. \
      Check out the <a href="https://shipshapecode.github.io/shepherd/">documentation</a> to learn more.`,
      attachTo: {element: ['#example-web-component', '#shadow-dom-example-step-code'], on: 'top'},
      scrollTo: true,
      buttons: [
        {
          action: shepherd.back,
          classes: 'shepherd-button-secondary',
          text: 'Back'
        }, {
          action: shepherd.next,
          text: 'Next'
        }
      ]
    });
    shepherd.addStep('example-step-overlay', {
      title: 'Example Step Using Backdrop Overlay',
      text: `You can now easily create a styleable backdrop overlay for a tour/step.\n \
      The new overlay property can be specified for all or selected tour steps. \
      Adding custom classes or styles to the overlay element is supported.  Notice the background is darker for this step. \
      Check out the <a href="https://shipshapecode.github.io/shepherd/">documentation</a> to learn more.`,
      attachTo: '.hero-example-overlay right',
      scrollTo: true,
      overlay: {
        styles: {'background-color':'black', 'opacity': 0.4}
      },
      buttons: [
        {
          action: shepherd.back,
          classes: 'shepherd-button-secondary',
          text: 'Back'
        }, {
          action: shepherd.next,
          text: 'Next'
        }
      ]
    });
    shepherd.addStep('followup', {
      title: 'Learn more',
      text: 'Star Shepherd on Github so you remember it for your next project',
      attachTo: '.hero-followup top',
      buttons: [
        {
          action: shepherd.back,
          classes: 'shepherd-button-secondary',
          text: 'Back'
        }, {
          action: shepherd.next,
          text: 'Done'
        }
      ]
    });

    return shepherd;
  }

  function ready() {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
      init();
    } else {
      document.addEventListener('DOMContentLoaded', init);
    }
  }

  ready();

}).call(this);
