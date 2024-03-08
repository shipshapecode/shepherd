'use strict';

module.exports = {
  hooks: {
    'after:bump': 'pnpm build'
  },
  plugins: {
    '@release-it-plugins/workspaces': {
      workspaces: ['shepherd.js']
    },
    '@release-it-plugins/lerna-changelog': {
      infile: 'CHANGELOG.md'
    }
  },
  git: {
    tagName: 'v${version}'
  },
  github: {
    release: true,
    tokenRef: 'GITHUB_AUTH',
    assets: [
      'shepherd.js/dist/**/*.css',
      'shepherd.js/dist/**/*.js',
      'shepherd.js/dist/**/*.ts',
      'shepherd.js/dist/**/*.map'
    ]
  },
  npm: false
};
