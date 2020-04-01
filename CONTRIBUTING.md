# Contributing Guide

You will need:

- [Yarn](https://yarnpkg.com/)

Windows users will need additional setup to enable build capabilities in NPM.
From an administrative command window:

```sh
    yarn global add windows-build-tools
```

## Getting started

1. Fork the project
2. Clone your forked project by running `git clone git@github.com:{
   YOUR_USERNAME }/shepherd.git`
3. Run `yarn` to install node modules
4. Test that you can build the source by running `yarn build` and ensure the `dist` directory appears.

## Writing code!

We use `rollup` to facilitate things like transpilation, minification, etc. so
you can focus on writing relevant code. If there is a fix or feature you would like
to contribute, we ask that you take the following steps:

1. Most of the _editable_ code lives in the `src` directory while built code
   will end up in the `dist` directory upon running `yarn build`.

2. The demo app is served out of the `landing` directory. Running `yarn start` will open it in your browser and initiate a live-reloading session as you make changes.


## Opening Pull Requests

1. Please Provide a thoughtful commit message and push your changes to your fork using
   `git push origin master` (assuming your forked project is using `origin` for
   the remote name and you are on the `master` branch).

2. Open a Pull Request on GitHub with a description of your changes.


## Testing

All PRs that change code functionality are required to have accompanying tests.

### Acceptance Tests

Acceptance tests are run using [`cypress`](https://github.com/cypress-io/cypress). A number of different testing configurations can be found in [`package.json`](/package.json), but you can simply run `yarn test:cy:watch` to build your latest changes and begin running the tests inside a Chrome browser instance.

⚠️ The acceptance tests are set up to run on `localhost` port `9002`. If you'd like to change this port, make sure to change the `baseUrl` option inside of [`cypress.json`](/cypress.json), and change any references to port `9002` in [`package.json`](/package.json) accordingly.
