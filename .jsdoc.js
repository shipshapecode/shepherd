'use strict';

module.exports = {
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc']
  },
  source: {
    include: [
      './shepherd.js/package.json',
      './shepherd.js/src/shepherd.ts',
      './shepherd.js/src/step.ts',
      './shepherd.js/src/tour.ts'
    ],
    includePattern: '\\.(json|js|ts)$'
  },
  plugins: ['plugins/markdown', 'node_modules/better-docs/typescript'],
  sourceType: 'module',
  opts: {
    destination: './site/docs/',
    encoding: 'utf8',
    // Do not include functions marked `@private`
    private: false,
    readme: 'README.md',
    recurse: true,
    template: './node_modules/better-docs',
    tutorials: './docs-src/tutorials'
  },
  templates: {
    referenceTitle: 'Shepherd.js',
    favicon: '/landing/public/favicons/favicon-32x32.png',
    githubLink: 'https://github.com/shepherd-pro/shepherd',
    // Do not disable sorting
    disableSort: false,
    // Do not collapse, show all methods
    collapse: false,
    resources: {
      Demo: 'https://shepherdjs.dev/'
    },
    'better-docs': {
      navLinks: [
        {
          label: 'Demo',
          href: 'https://shepherdjs.dev/'
        },
        {
          label: 'GitHub',
          href: 'https://github.com/shepherd-pro/shepherd'
        }
      ]
    }
  }
};
