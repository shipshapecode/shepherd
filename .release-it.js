'use strict';

module.exports = {
  hooks: {
    'after:bump': 'yarn build'
  },
  plugins: {
    'release-it-lerna-changelog': {
      infile: 'CHANGELOG.md',
      launchEditor: true
    }
  },
  git: {
    tagName: 'v${version}'
  },
  github: {
    release: true,
    tokenRef: 'GITHUB_AUTH',
    assets: ['dist/**/*.css', 'dist/**/*.js', 'dist/**/*.map']
  },
  npm: {
    publish: true
  }
};
