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
- Adds `showOn` for conditonally showing tour steps

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
