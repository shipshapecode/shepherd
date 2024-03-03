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
      './src/shepherd.ts',
      './src/step.ts',
      './src/tour.ts'
    ]
  },
  plugins: [
    'plugins/markdown'
  ],
  sourceType: 'module',
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
    }
  },
  opts: {
    destination: './site/docs/',
    encoding: 'utf8',
    // Do not include functions marked `@private`
    private: false,
    recurse: true,
    template: './node_modules/jsdoc-template-ship-shape',
    tutorials: './docs-src/tutorials'
  }
};
