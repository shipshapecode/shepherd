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
    // Do not disable sorting
    disableSort: false,
    // Do not collapse, show all methods
    collapse: false
    // 'resources': {
    //   'google': 'https://www.google.com/'
    // }
  },
  opts: {
    destination: './docs/',
    encoding: 'utf8',
    // Do not include functions marked `@private`
    private: false,
    recurse: true,
    template: './jsdoc-template'
  }
};
