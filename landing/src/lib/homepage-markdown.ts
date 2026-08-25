import { SITE_URL } from '../consts';

/**
 * Markdown representation of the homepage, served when a client sends
 * `Accept: text/markdown` (see src/pages/index.astro) and directly at
 * /index.md (see src/pages/index.md.ts).
 */
export const homepageMarkdown = `# Shepherd.js — Guide your users through a tour of your app

Shepherd is an open-source JavaScript library for building guided product
tours, user onboarding flows, trainings, and feature announcements. Each tour
is a sequence of steps rendered as accessible dialogs that can attach to any
element in the DOM (positioned by [Floating UI](https://floating-ui.com/)),
highlight it with a modal overlay, and walk the user through your app.

- Website: ${SITE_URL}/
- Documentation: https://docs.shepherdjs.dev/
- GitHub: https://github.com/shipshapecode/shepherd
- npm: https://www.npmjs.com/package/shepherd.js
- Pricing and licensing: ${SITE_URL}/pricing

## Features

- **Accessibility**: full keyboard navigation, focus trapping, and a11y
  compliance via aria attributes.
- **Highly customizable**: minimal default styles that are easy to theme;
  bring your own CSS classes per tour or per step.
- **Framework ready**: works with React, Ember, Angular, Vue.js, ES Modules,
  or plain JavaScript.
- **Smart positioning**: steps never end up off screen or cropped by an
  overflow, thanks to Floating UI.

## Installation

\`\`\`bash
npm install shepherd.js
\`\`\`

Or include it directly:

\`\`\`html
<link rel="stylesheet" href="shepherd.js/dist/css/shepherd.css" />
<script type="module" src="shepherd.js/dist/js/shepherd.mjs"></script>
\`\`\`

## Quick example

\`\`\`js
import Shepherd from 'shepherd.js';

const tour = new Shepherd.Tour({
  useModalOverlay: true,
  defaultStepOptions: {
    cancelIcon: { enabled: true },
    scrollTo: { behavior: 'smooth', block: 'center' }
  }
});

tour.addStep({
  title: 'Creating a Shepherd Tour',
  text: 'Create a Tour instance and add as many steps as you want.',
  attachTo: { element: '.example', on: 'bottom' },
  buttons: [
    { action() { return this.back(); }, secondary: true, text: 'Back' },
    { action() { return this.next(); }, text: 'Next' }
  ]
});

tour.start();
\`\`\`

## When to use Shepherd

Reach for Shepherd when you need to guide users through a web interface:
onboarding new users step by step, announcing or explaining new features,
walking through complex forms or workflows, or building in-app training.
It runs entirely in the browser with no backend service required.

## Licensing

Shepherd is free for open-source, personal, and non-commercial projects
(AGPL-3.0). Commercial licenses are available at ${SITE_URL}/pricing.
Shepherd is maintained by [Ship Shape](https://shipshape.io/).

## More

- Docs and guides: https://docs.shepherdjs.dev/
- LLM/agent guidance: ${SITE_URL}/llms.txt
- Blog: ${SITE_URL}/blog
- About: ${SITE_URL}/about
- Contact: ${SITE_URL}/contact
`;
