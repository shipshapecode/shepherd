'use strict';

module.exports = {
  hooks: {
    'after:bump': 'pnpm build'
  },
  plugins: {
    '@release-it-plugins/lerna-changelog': {
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
