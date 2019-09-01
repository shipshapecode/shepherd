### Custom Classes

If you'd like to change styles within your own CSS, you can pass custom class names to the tour instance &mdash; 
or, as part of the options for each step &mdash; and use them as hooks for your own styling rules.

```javascript
let tour = new Shepherd.Tour({
  defaultStepOptions: {
    classes: 'shepherd-theme-custom'
  }
});
```

### Adding a prefix to the default `shepherd-*` classes

If you have a situation where you are running two Shepherd instances on a page, and they need to be styled
differently, you may want to prefix the class names. This is now possible with the `classPrefix` option.

```js
const tour = new Shepherd.Tour({
  classPrefix: 'my-tour-'
});
```

### Leveraging Style Variables

We use [nano-css](https://github.com/streamich/nano-css) to automatically ship all the styles as part of the JS bundle.
We have a default set of variables, which can be overridden to achieve whatever look and feel you would like.

For example:

```js
const tour = new Shepherd.Tour({
  styleVariables: {
    buttonBorderRadius: 0,
    elementBorderRadius: 0,
    headerBgColor: '#eeeeee',
    primaryButtonBgColor: '#9b59b6',
    useDropShadow: true
  }
});
```

As a result you get a squared theme with a purple primary button. The individual steps cast a shadow on the underlying elements, and 
the header is colored in a light gray tone.

These values and variables can be found in [**variables.js**](/src/js/styles/variables.js), and the ones that can be adjusted for theming are listed below.
  
**Buttons**

| Variable                    | Purpose                                                            | Default
|-----------------------------|--------------------------------------------------------------------|--------------------------
| buttonBorderRadius          | Decide whether the buttons should have rounded or pointed corners. | 3px
| primaryButtonBgColor        | Background color for primary buttons                               | rgb(50, 136, 230)
| primaryButtonColor          | Text color for primary buttons                                     | rgba(255, 255, 255, 0.75)
| primaryButtonHoverBgColor   | Hover state background color for primary buttons                   | rgb(25, 111, 204)
| primaryButtonHoverColor     | Hover state text color for primary buttons                         | rgba(255, 255, 255, 0.75)
| secondaryButtonBgColor      | Background color for secondary buttons                             | rgb(241, 242, 243)
| secondaryButtonColor        | Text color for secondary buttons                                   | rgba(0, 0, 0, 0.75)
| secondaryButtonHoverBgColor | Hover state background color for secondary buttons                 | rgb(214, 217, 219)
| secondaryButtonHoverColor   | Hover state text color for secondary buttons                       | rgb(214, 217, 219)

**Cancel Icon**

| Variable                     | Purpose                                                      | Default
|------------------------------|--------------------------------------------------------------|--------------------------
| cancelIconColor              | Color for the "x" icon                                       | rgba(128, 128, 128, 0.75)
| cancelIconHoverColor         | Hover state color for the "x" icon                           | rgba(0, 0, 0, 0.75)
| cancelIconHasTitleColor      | Color for the "x" icon when the step has a title             | rgba(128, 128, 128, 0.75)
| cancelIconHasTitleHoverColor | Hover state color for the "x" icon when the step has a title | rgba(0, 0, 0, 0.75)

**Header**

| Variable      | Purpose                                  | Default
|---------------|------------------------------------------|--------------------
| headerBgColor | Background color for headers with titles | #e6e6e6
| headerColor   | Text color for headers with titles       | rgba(0, 0, 0, 0.75)

**Modal**

| Variable       | Purpose                                | Default
|----------------|----------------------------------------|--------
| overlayOpacity | Sets the opacity of the modal overlay. | 0.5

**Text Content**

| Variable       | Purpose                          | Default
|----------------|----------------------------------|--------------------
| textColor      | Color for the text content       | rgba(0, 0, 0, 0.75)
| textFontSize   | Font size for the text content   | 1rem
| textLineHeight | Line height for the text content | 1.3em


**Tooltip**

| Variable            | Purpose                                                                | Default
|---------------------|------------------------------------------------------------------------|--------
| arrowSize           | Sets the scale of the arrow for the tooltip.                           | 2.1
| elementBorderRadius | Sets the border-radius of the shepherd-element, tippy, etc             | 5px
| tippyBackground     | Sets the background color of the tooltip to override the tippy default | #ffffff
| useDropShadow       | The element casts a shadow                                             | true
| zIndex              | Move the element forward or backward                                   | 9999
