// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

let coverageMap;

module.exports = (on, config) => {
  if(config.env.coverage) {
    const istanbul = require('istanbul-lib-coverage');
    coverageMap = istanbul.createCoverageMap({});

    on('task', {
      'coverage'(coverage) {
        coverageMap.merge(coverage);
        return JSON.stringify(coverageMap);
      }
    });
  }

  on('before:browser:launch', (browser = {}, args) => {
    if (browser.name === 'chrome') {
      // ^ make sure this is your browser name, you may
      // be using 'canary' or 'chromium' for example, so change it to match!
      args.push('--proxy-bypass-list=<-loopback>')
      return args
    }
  });

  return config;
};
