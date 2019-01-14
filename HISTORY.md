## [v2.1.0](https://github.com/shipshapecode/shepherd/tree/v2.1.0) (2019-01-06)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.2...v2.1.0)

**Fixed bugs:**

- fix: turn off passive events for touchmove on Safari \> 10 [\#307](https://github.com/shipshapecode/shepherd/pull/307) ([chuckcarpenter](https://github.com/chuckcarpenter))

**Merged pull requests:**

- Move modal to its own class [\#308](https://github.com/shipshapecode/shepherd/pull/308) ([rwwagner90](https://github.com/rwwagner90))

## [v2.0.2](https://github.com/shipshapecode/shepherd/tree/v2.0.2) (2019-01-04)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.1...v2.0.2)

**Fixed bugs:**

- fix: remove class when modal hidden so elements are clickable [\#305](https://github.com/shipshapecode/shepherd/pull/305) ([chuckcarpenter](https://github.com/chuckcarpenter))

## [v2.0.1](https://github.com/shipshapecode/shepherd/tree/v2.0.1) (2018-12-31)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0...v2.0.1)

## [v2.0.0](https://github.com/shipshapecode/shepherd/tree/v2.0.0) (2018-12-31)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.35...v2.0.0)

**Implemented enhancements:**

- Add data attribute to the body for the currently active tour name and current step [\#284](https://github.com/shipshapecode/shepherd/issues/284)
- Use data attributes for element selection in demo/tests [\#273](https://github.com/shipshapecode/shepherd/issues/273)

**Closed issues:**

- An in-range update of autoprefixer is breaking the build 🚨 [\#298](https://github.com/shipshapecode/shepherd/issues/298)
- An in-range update of webpack is breaking the build 🚨 [\#297](https://github.com/shipshapecode/shepherd/issues/297)

**Merged pull requests:**

- Integrate modal functionality that was originally in Ember Shepherd [\#301](https://github.com/shipshapecode/shepherd/pull/301) ([BrianSipple](https://github.com/BrianSipple))
- Use data attributes for test selectors [\#299](https://github.com/shipshapecode/shepherd/pull/299) ([rwwagner90](https://github.com/rwwagner90))
- Remove redundant `id` attribute on step tooltip containers. [\#295](https://github.com/shipshapecode/shepherd/pull/295) ([BrianSipple](https://github.com/BrianSipple))
- Link to Shepherd's Tippy defaults in docs [\#294](https://github.com/shipshapecode/shepherd/pull/294) ([BrianSipple](https://github.com/BrianSipple))

## [v2.0.0-beta.35](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.35) (2018-11-09)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.34...v2.0.0-beta.35)

**Implemented enhancements:**

- Document Tour.removeStep [\#278](https://github.com/shipshapecode/shepherd/issues/278)
- Update documentation to clarify arrow usage. [\#287](https://github.com/shipshapecode/shepherd/pull/287) ([BrianSipple](https://github.com/BrianSipple))

**Fixed bugs:**

- fix tooltip centering [\#288](https://github.com/shipshapecode/shepherd/pull/288) ([BrianSipple](https://github.com/BrianSipple))

**Closed issues:**

- An in-range update of start-server-and-test is breaking the build 🚨 [\#283](https://github.com/shipshapecode/shepherd/issues/283)

**Merged pull requests:**

- Bump deps [\#291](https://github.com/shipshapecode/shepherd/pull/291) ([rwwagner90](https://github.com/rwwagner90))
- Add testing for `Tour.isActive`. [\#290](https://github.com/shipshapecode/shepherd/pull/290) ([BrianSipple](https://github.com/BrianSipple))
- Added documentation for tour.removeStep \(fixes \#278\) [\#289](https://github.com/shipshapecode/shepherd/pull/289) ([joeinnes](https://github.com/joeinnes))
- Improve CodeClimate and test coverage. [\#286](https://github.com/shipshapecode/shepherd/pull/286) ([BrianSipple](https://github.com/BrianSipple))
- Remove unnecessary management of `this.el.hidden` [\#285](https://github.com/shipshapecode/shepherd/pull/285) ([BrianSipple](https://github.com/BrianSipple))

## [v2.0.0-beta.34](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.34) (2018-10-23)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.33...v2.0.0-beta.34)

**Implemented enhancements:**

- Change `data-id` to `data-shepherd-step-id` on Step content elements. [\#282](https://github.com/shipshapecode/shepherd/pull/282) ([BrianSipple](https://github.com/BrianSipple))

**Closed issues:**

- An in-range update of webpack is breaking the build 🚨 [\#280](https://github.com/shipshapecode/shepherd/issues/280)

## [v2.0.0-beta.33](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.33) (2018-10-19)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.32...v2.0.0-beta.33)

**Implemented enhancements:**

- Add minified js + css to release package [\#258](https://github.com/shipshapecode/shepherd/issues/258)
- Bump a bunch of deps [\#281](https://github.com/shipshapecode/shepherd/pull/281) ([rwwagner90](https://github.com/rwwagner90))

**Fixed bugs:**

- Exit animations don't play before step tooltip disappears. [\#277](https://github.com/shipshapecode/shepherd/issues/277)
- Allow exit animations to play before step tooltip disappears. [\#279](https://github.com/shipshapecode/shepherd/pull/279) ([BrianSipple](https://github.com/BrianSipple))
- Remove default arrow setting on centered tippy [\#275](https://github.com/shipshapecode/shepherd/pull/275) ([chuckcarpenter](https://github.com/chuckcarpenter))

**Merged pull requests:**

- Fix bug of classes not being added to targets on returned-to steps. [\#276](https://github.com/shipshapecode/shepherd/pull/276) ([BrianSipple](https://github.com/BrianSipple))

## [v2.0.0-beta.32](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.32) (2018-10-13)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.31...v2.0.0-beta.32)

## [v2.0.0-beta.31](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.31) (2018-10-13)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.30...v2.0.0-beta.31)

## [v2.0.0-beta.30](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.30) (2018-10-13)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.29...v2.0.0-beta.30)

**Implemented enhancements:**

- Hide buttons if none are passed to `Step.options.buttons` [\#243](https://github.com/shipshapecode/shepherd/issues/243)
- Constrain input for `Step.options.buttons` to an array of buttons. [\#271](https://github.com/shipshapecode/shepherd/pull/271) ([BrianSipple](https://github.com/BrianSipple))

**Merged pull requests:**

- fix docs typo [\#272](https://github.com/shipshapecode/shepherd/pull/272) ([BrianSipple](https://github.com/BrianSipple))

## [v2.0.0-beta.29](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.29) (2018-10-11)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.28...v2.0.0-beta.29)

**Implemented enhancements:**

- Bundle minified Tippy code with distribution [\#263](https://github.com/shipshapecode/shepherd/issues/263)
- Implement `Tour.hide` [\#265](https://github.com/shipshapecode/shepherd/pull/265) ([BrianSipple](https://github.com/BrianSipple))

**Fixed bugs:**

- Remove or restore hide method on Tour instance [\#249](https://github.com/shipshapecode/shepherd/issues/249)

**Closed issues:**

- An in-range update of tippy.js is breaking the build 🚨 [\#266](https://github.com/shipshapecode/shepherd/issues/266)

**Merged pull requests:**

- Bundle tippy with the main Shepherd distribution file. [\#270](https://github.com/shipshapecode/shepherd/pull/270) ([BrianSipple](https://github.com/BrianSipple))
- remove spm from package.json [\#269](https://github.com/shipshapecode/shepherd/pull/269) ([BrianSipple](https://github.com/BrianSipple))
- remove some popper arrow styles and target tippy-arrow [\#268](https://github.com/shipshapecode/shepherd/pull/268) ([chuckcarpenter](https://github.com/chuckcarpenter))
- Update screenshot of intro step in README [\#264](https://github.com/shipshapecode/shepherd/pull/264) ([BrianSipple](https://github.com/BrianSipple))

## [v2.0.0-beta.28](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.28) (2018-10-08)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.27...v2.0.0-beta.28)

**Implemented enhancements:**

- Not all of popper.js placement values are supported [\#259](https://github.com/shipshapecode/shepherd/issues/259)
- Integrate Tippy for step modal creation [\#255](https://github.com/shipshapecode/shepherd/issues/255)
- Tippy.js Integration [\#261](https://github.com/shipshapecode/shepherd/pull/261) ([BrianSipple](https://github.com/BrianSipple))

**Merged pull requests:**

- use uniqueId for step ID prop over idAttribute [\#262](https://github.com/shipshapecode/shepherd/pull/262) ([chuckcarpenter](https://github.com/chuckcarpenter))
- Support placement values and modifiers according to popper.js API \(\#259\) [\#260](https://github.com/shipshapecode/shepherd/pull/260) ([tedbeer](https://github.com/tedbeer))
- Change localhost port for cypress tests and document how its used [\#257](https://github.com/shipshapecode/shepherd/pull/257) ([BrianSipple](https://github.com/BrianSipple))
- replace hubspot favicons with shipshape favicons [\#256](https://github.com/shipshapecode/shepherd/pull/256) ([BrianSipple](https://github.com/BrianSipple))
- documentation update: add beforeShowPromise example [\#253](https://github.com/shipshapecode/shepherd/pull/253) ([jaffadog](https://github.com/jaffadog))
- Update uglifyjs-webpack-plugin to the latest version 🚀 [\#247](https://github.com/shipshapecode/shepherd/pull/247) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- Update theming documentation. [\#242](https://github.com/shipshapecode/shepherd/pull/242) ([BrianSipple](https://github.com/BrianSipple))

## [v2.0.0-beta.27](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.27) (2018-09-13)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.26...v2.0.0-beta.27)

**Breaking changes:**

- Rename `Tour.options.defaults` to `Tour.options.defaultStepOptions`. [\#244](https://github.com/shipshapecode/shepherd/pull/244) ([BrianSipple](https://github.com/BrianSipple))

**Implemented enhancements:**

- Change `tour.options.defaults` to `tour.options.stepOptions` [\#240](https://github.com/shipshapecode/shepherd/issues/240)

**Merged pull requests:**

- Greenkeeper/babel plugin add module exports 1.0.0 [\#246](https://github.com/shipshapecode/shepherd/pull/246) ([rwwagner90](https://github.com/rwwagner90))

## [v2.0.0-beta.26](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.26) (2018-09-07)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.25...v2.0.0-beta.26)

**Fixed bugs:**

- Build syntax errors and element.prepend function not supported \(Internet Explorer\) [\#238](https://github.com/shipshapecode/shepherd/issues/238)
- Syntax errors and ParentNode.prepend not supported in IE [\#239](https://github.com/shipshapecode/shepherd/pull/239) ([alexdaube](https://github.com/alexdaube))

## [v2.0.0-beta.25](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.25) (2018-09-06)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.24...v2.0.0-beta.25)

## [v2.0.0-beta.24](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.24) (2018-09-05)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.23...v2.0.0-beta.24)

**Implemented enhancements:**

- Way to get user to confirm quitting a tutorial [\#133](https://github.com/shipshapecode/shepherd/issues/133)
- Add step options to ESDoc [\#234](https://github.com/shipshapecode/shepherd/pull/234) ([rwwagner90](https://github.com/rwwagner90))
- Add Confirm cancel [\#232](https://github.com/shipshapecode/shepherd/pull/232) ([rwwagner90](https://github.com/rwwagner90))
- improved theming [\#204](https://github.com/shipshapecode/shepherd/pull/204) ([bm2u](https://github.com/bm2u))

**Fixed bugs:**

- advanceOn doesn't complete tour [\#93](https://github.com/shipshapecode/shepherd/issues/93)
- advanceOn blur? [\#89](https://github.com/shipshapecode/shepherd/issues/89)

**Closed issues:**

- Action required: Greenkeeper could not be activated 🚨 [\#227](https://github.com/shipshapecode/shepherd/issues/227)

**Merged pull requests:**

- add `.vscode` directory to `.gitignore` [\#237](https://github.com/shipshapecode/shepherd/pull/237) ([BrianSipple](https://github.com/BrianSipple))
- Update extract-loader to the latest version 🚀 [\#236](https://github.com/shipshapecode/shepherd/pull/236) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))
- \[Issue/89\]- add onCapture setting to bubble events such as blur for tour elements… [\#233](https://github.com/shipshapecode/shepherd/pull/233) ([chuckcarpenter](https://github.com/chuckcarpenter))

## [v2.0.0-beta.23](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.23) (2018-08-29)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.22...v2.0.0-beta.23)

**Implemented enhancements:**

- Update to Babel 7, use lodash-es [\#231](https://github.com/shipshapecode/shepherd/pull/231) ([rwwagner90](https://github.com/rwwagner90))

**Merged pull requests:**

- add more tests for increased coverage [\#230](https://github.com/shipshapecode/shepherd/pull/230) ([chuckcarpenter](https://github.com/chuckcarpenter))
- Update dependencies to enable Greenkeeper 🌴 [\#229](https://github.com/shipshapecode/shepherd/pull/229) ([greenkeeper[bot]](https://github.com/apps/greenkeeper))

## [v2.0.0-beta.22](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.22) (2018-08-29)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.21...v2.0.0-beta.22)

**Implemented enhancements:**

- Implement ESDoc [\#226](https://github.com/shipshapecode/shepherd/pull/226) ([rwwagner90](https://github.com/rwwagner90))

**Fixed bugs:**

- Fix cancel on any step with a title [\#228](https://github.com/shipshapecode/shepherd/pull/228) ([chuckcarpenter](https://github.com/chuckcarpenter))

## [v2.0.0-beta.21](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.21) (2018-08-27)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.20...v2.0.0-beta.21)

**Merged pull requests:**

- Merge coverage from cypress and unit tests [\#225](https://github.com/shipshapecode/shepherd/pull/225) ([rwwagner90](https://github.com/rwwagner90))
- Renaming of scss source dir [\#219](https://github.com/shipshapecode/shepherd/pull/219) ([bm2u](https://github.com/bm2u))

## [v2.0.0-beta.20](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.20) (2018-08-26)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.19...v2.0.0-beta.20)

**Implemented enhancements:**

- Increase test coverage, refactor, and cleanup [\#224](https://github.com/shipshapecode/shepherd/pull/224) ([rwwagner90](https://github.com/rwwagner90))

## [v2.0.0-beta.19](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.19) (2018-08-25)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.18...v2.0.0-beta.19)

## [v2.0.0-beta.18](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.18) (2018-08-25)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.17...v2.0.0-beta.18)

**Implemented enhancements:**

- Add some tour tests [\#216](https://github.com/shipshapecode/shepherd/pull/216) ([rwwagner90](https://github.com/rwwagner90))
- Testing for Evented module [\#215](https://github.com/shipshapecode/shepherd/pull/215) ([chuckcarpenter](https://github.com/chuckcarpenter))

**Fixed bugs:**

- ES2015 imports not working [\#210](https://github.com/shipshapecode/shepherd/issues/210)
- Fix issue with cancel button [\#220](https://github.com/shipshapecode/shepherd/pull/220) ([chuckcarpenter](https://github.com/chuckcarpenter))

**Merged pull requests:**

- Move bind methods to their own file [\#222](https://github.com/shipshapecode/shepherd/pull/222) ([rwwagner90](https://github.com/rwwagner90))
- Start some refactoring [\#221](https://github.com/shipshapecode/shepherd/pull/221) ([rwwagner90](https://github.com/rwwagner90))
- Step.js coverage increase [\#218](https://github.com/shipshapecode/shepherd/pull/218) ([chuckcarpenter](https://github.com/chuckcarpenter))
- Reduce Evented complexity [\#217](https://github.com/shipshapecode/shepherd/pull/217) ([rwwagner90](https://github.com/rwwagner90))
- Start refactoring for Code Climate [\#214](https://github.com/shipshapecode/shepherd/pull/214) ([rwwagner90](https://github.com/rwwagner90))

## [v2.0.0-beta.17](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.17) (2018-08-15)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.16...v2.0.0-beta.17)

**Merged pull requests:**

- Feature/webpack [\#212](https://github.com/shipshapecode/shepherd/pull/212) ([rwwagner90](https://github.com/rwwagner90))

## [v2.0.0-beta.16](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.16) (2018-08-14)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.15...v2.0.0-beta.16)

**Implemented enhancements:**

- \[feature/builder\] - replace Gulp with module loader and npm [\#203](https://github.com/shipshapecode/shepherd/pull/203) ([chuckcarpenter](https://github.com/chuckcarpenter))

**Fixed bugs:**

- Uncaught TypeError: \_shepherd2.default.Tour is not a constructor [\#202](https://github.com/shipshapecode/shepherd/issues/202)

**Merged pull requests:**

- Start on cypress [\#209](https://github.com/shipshapecode/shepherd/pull/209) ([rwwagner90](https://github.com/rwwagner90))
- increase test coverage [\#206](https://github.com/shipshapecode/shepherd/pull/206) ([chuckcarpenter](https://github.com/chuckcarpenter))

## [v2.0.0-beta.15](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.15) (2018-08-06)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.14...v2.0.0-beta.15)

**Fixed bugs:**

- Error: Cannot find module 'popper' from '\node\_modules\shepherd.js\dist\js' [\#201](https://github.com/shipshapecode/shepherd/issues/201)

## [v2.0.0-beta.14](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.14) (2018-08-02)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.13...v2.0.0-beta.14)

**Fixed bugs:**

- Error thrown if element not visible anymore [\#197](https://github.com/shipshapecode/shepherd/issues/197)

**Merged pull requests:**

- Basic testing framework [\#199](https://github.com/shipshapecode/shepherd/pull/199) ([chuckcarpenter](https://github.com/chuckcarpenter))
- Update documentation link in demo tour [\#195](https://github.com/shipshapecode/shepherd/pull/195) ([mikelkew](https://github.com/mikelkew))

## [v2.0.0-beta.13](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.13) (2018-07-16)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.12...v2.0.0-beta.13)

**Implemented enhancements:**

- Refactor css in shepherd-theme-arrows theme [\#52](https://github.com/shipshapecode/shepherd/issues/52)
- Automatically use theme if styles are included [\#1](https://github.com/shipshapecode/shepherd/issues/1)

## [v2.0.0-beta.12](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.12) (2018-07-12)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.11...v2.0.0-beta.12)

## [v2.0.0-beta.11](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.11) (2018-07-12)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.10...v2.0.0-beta.11)

**Implemented enhancements:**

- Attach shepherd-step to "custom" element / supporting dialog elements. [\#157](https://github.com/shipshapecode/shepherd/issues/157)
- Add renderLocation option [\#192](https://github.com/shipshapecode/shepherd/pull/192) ([rwwagner90](https://github.com/rwwagner90))

**Fixed bugs:**

- Tours fail to load on Chrome 65  [\#180](https://github.com/shipshapecode/shepherd/issues/180)
- Step divs remain after tour has ended [\#66](https://github.com/shipshapecode/shepherd/issues/66)

**Closed issues:**

- Step class cleanup [\#36](https://github.com/shipshapecode/shepherd/issues/36)

## [v2.0.0-beta.10](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.10) (2018-07-11)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.9...v2.0.0-beta.10)

## [v2.0.0-beta.9](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.9) (2018-07-11)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.8...v2.0.0-beta.9)

**Implemented enhancements:**

- CSS should not be required to use this library [\#166](https://github.com/shipshapecode/shepherd/issues/166)

**Fixed bugs:**

- Arrows don't appear on some boxes randomly \(video\) [\#156](https://github.com/shipshapecode/shepherd/issues/156)

**Closed issues:**

- Undocumented `scrollToHandler` option [\#107](https://github.com/shipshapecode/shepherd/issues/107)

## [v2.0.0-beta.8](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.8) (2018-07-09)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.7...v2.0.0-beta.8)

## [v2.0.0-beta.7](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.7) (2018-07-07)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.6...v2.0.0-beta.7)

**Fixed bugs:**

- Use frame safe way for isArray\(\) & isObject\(\) [\#153](https://github.com/shipshapecode/shepherd/issues/153)
- remove shepherd-target class on tour.next\(\)/tour.back\(\) [\#109](https://github.com/shipshapecode/shepherd/issues/109)

**Closed issues:**

- Rethethering issue when target element is re-rendered. [\#112](https://github.com/shipshapecode/shepherd/issues/112)

## [v2.0.0-beta.6](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.6) (2018-07-07)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.5...v2.0.0-beta.6)

**Implemented enhancements:**

- Close button as HTML entity [\#148](https://github.com/shipshapecode/shepherd/pull/148) ([bm2u](https://github.com/bm2u))

**Fixed bugs:**

- Hide events being triggered twice when there is another step [\#167](https://github.com/shipshapecode/shepherd/issues/167)
- Removing duplicate call to hide step [\#168](https://github.com/shipshapecode/shepherd/pull/168) ([pedroceles](https://github.com/pedroceles))

**Closed issues:**

- The install doc is not working [\#179](https://github.com/shipshapecode/shepherd/issues/179)
- addStep not return step instance [\#165](https://github.com/shipshapecode/shepherd/issues/165)
- cancelling the tour when clicking outside the element [\#141](https://github.com/shipshapecode/shepherd/issues/141)
- showCancelLink yields weird characters [\#117](https://github.com/shipshapecode/shepherd/issues/117)

**Merged pull requests:**

- Added a demo tour at Simple Planner [\#155](https://github.com/shipshapecode/shepherd/pull/155) ([newscloud](https://github.com/newscloud))

## [v2.0.0-beta.5](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.5) (2018-07-03)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.4...v2.0.0-beta.5)

## [v2.0.0-beta.4](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.4) (2018-07-03)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.3...v2.0.0-beta.4)

## [v2.0.0-beta.3](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.3) (2018-07-03)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.2...v2.0.0-beta.3)

**Closed issues:**

- How can i use it with ionic 2 typescript? [\#174](https://github.com/shipshapecode/shepherd/issues/174)

## [v2.0.0-beta.2](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.2) (2018-07-02)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v2.0.0-beta.1...v2.0.0-beta.2)

## [v2.0.0-beta.1](https://github.com/shipshapecode/shepherd/tree/v2.0.0-beta.1) (2018-07-02)

[Full Changelog](https://github.com/shipshapecode/shepherd/compare/v1.8.1...v2.0.0-beta.1)

**Implemented enhancements:**

- Convert to popper [\#189](https://github.com/shipshapecode/shepherd/pull/189) ([rwwagner90](https://github.com/rwwagner90))

**Fixed bugs:**

- Attempting to fix uncaught exception caused by non-existing element f… [\#190](https://github.com/shipshapecode/shepherd/pull/190) ([rwwagner90](https://github.com/rwwagner90))

**Closed issues:**

- href of the "View docs" button on demo site --\> 404 [\#187](https://github.com/shipshapecode/shepherd/issues/187)
- Demo site is down [\#185](https://github.com/shipshapecode/shepherd/issues/185)
- Maintainer/transfer [\#183](https://github.com/shipshapecode/shepherd/issues/183)
- cannot get node\_modules/tether-shepherd/dist/js/shepherd.min.js  [\#173](https://github.com/shipshapecode/shepherd/issues/173)
- ES6 import from NPM failed. [\#171](https://github.com/shipshapecode/shepherd/issues/171)
- Display Shepherd only during first visit [\#164](https://github.com/shipshapecode/shepherd/issues/164)
- Tether EOL implications [\#163](https://github.com/shipshapecode/shepherd/issues/163)
- Get the AttachTo object [\#150](https://github.com/shipshapecode/shepherd/issues/150)
- Arrow problem [\#145](https://github.com/shipshapecode/shepherd/issues/145)
- `attachment: together` does not work as expected if attachment width greater than target width [\#142](https://github.com/shipshapecode/shepherd/issues/142)
- shepherd-step not placed in proper position [\#130](https://github.com/shipshapecode/shepherd/issues/130)
- attachTo is not working when passing a string [\#122](https://github.com/shipshapecode/shepherd/issues/122)
- Triggering click of an page element on tour step "show" [\#119](https://github.com/shipshapecode/shepherd/issues/119)
- Inherit animation styles from Drop [\#84](https://github.com/shipshapecode/shepherd/issues/84)
- Shepherd might need jQuery... [\#79](https://github.com/shipshapecode/shepherd/issues/79)
- Not accessibility friendly [\#26](https://github.com/shipshapecode/shepherd/issues/26)

**Merged pull requests:**

- RM Hubs Copyright [\#188](https://github.com/shipshapecode/shepherd/pull/188) ([FranDias](https://github.com/FranDias))
- Link correct demo site [\#186](https://github.com/shipshapecode/shepherd/pull/186) ([drucci](https://github.com/drucci))
- Add Repo to package.json [\#149](https://github.com/shipshapecode/shepherd/pull/149) ([bm2u](https://github.com/bm2u))

## v1.7.0
- Fixes bug where `buttons: false` resulted in the default Next button instead of showing the desired result of no buttons.

## v1.6.0 & v1.6.2
- Patches issue where Tether anchor reference was being cached instead of reset when step is shown.

## v1.5.2
- Adds functionality to pass an object `{element: el, on: tetherPositionString}` to tour step `attachTo` parameter.

## v1.5.1
- Exposes `scrollTo` option in Eager

## v1.5.0
- Positioning string parse improvements with regex
- Installation support for dynamically rendered pages in Eager
- Live updates for eager / creation of `tour.removeStep`

## v1.2.2
- Moves `Tether.js` out of `bower_components` and into `dist` for supoort in Eager

## v1.2.1
- Exposes tour object on eager install

## v1.2.0
- Adds `showOn` for conditionally showing tour steps

## v1.1.4
- Eager - Install helper now checks for the presence of first attach node before starting

## v1.1.2 & v1.1.3
- Fix stacking event listeners

## v1.1.1
- Pointer event none for arrows

## v1.1.0
- Update `Tether` to version 1
- Bump all dependencies

## v1.0.0
- Add proper UMD to `Shepherd`
- Convert from `Coffeescript` to `ES6 (Babel)`
- Fix `*.json` files to include `main`
- Remove bundled versions
- Restructure directory layout
- Update `gulp` builds
