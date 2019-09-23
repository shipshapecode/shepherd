'use strict';

module.exports = {
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc']
  },
  source: {
    include: [
      'package.json',
      'README.md',
      './src/js/shepherd.js',
      './src/js/step.js',
      './src/js/tour.js'
    ]
  },
  plugins: [
    'plugins/markdown'
  ],
  sourceType: 'module',
  templates: {
    referenceTitle: 'Shepherd.js',
    favicon: '/demo/assets/favicons/favicon-32x32.png',
    githubLink: 'https://github.com/shipshapecode/shepherd',
    // Do not disable sorting
    disableSort: false,
    // Do not collapse, show all methods
    collapse: false,
    resources: {
      Demo: 'https://shepherdjs.dev/'
    }
  },
  opts: {
    destination: './docs/',
    encoding: 'utf8',
    // Do not include functions marked `@private`
    private: false,
    recurse: true,
    template: './node_modules/jsdoc-template-ship-shape',
    tutorials: './docs-src/tutorials'
  }
};
