---
editUrl: false
next: false
prev: false
title: "StepOptions"
---

The options for the step

## Properties

### advanceOn?

> **`optional`** **advanceOn**: [`StepOptionsAdvanceOn`](StepOptionsAdvanceOn.md)

An action on the page which should advance shepherd to the next step.
It should be an object with a string `selector` and an `event` name
```js
const step = new Step(tour, {
  advanceOn: { selector: '.some .selector-path', event: 'click' },
  ...moreOptions
});
```
`event` doesn’t have to be an event inside the tour, it can be any event fired on any element on the page.
You can also always manually advance the Tour by calling `myTour.next()`.

#### Source

[step.ts:62](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L62)

***

### arrow?

> **`optional`** **arrow**: `boolean`

Whether to display the arrow for the tooltip or not

#### Source

[step.ts:67](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L67)

***

### attachTo?

> **`optional`** **attachTo**: [`StepOptionsAttachTo`](StepOptionsAttachTo.md)

The element the step should be attached to on the page.
An object with properties `element` and `on`.

```js
const step = new Step(tour, {
  attachTo: { element: '.some .selector-path', on: 'left' },
  ...moreOptions
});
```

If you don’t specify an attachTo the element will appear in the middle of the screen.
If you omit the `on` portion of `attachTo`, the element will still be highlighted, but the tooltip will appear
in the middle of the screen, without an arrow pointing to the target.

#### Source

[step.ts:48](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L48)

***

### beforeShowPromise()?

> **`optional`** **beforeShowPromise**: () => `Promise`\<`unknown`\>

A function that returns a promise.
When the promise resolves, the rest of the `show` code for the step will execute.

#### Returns

`Promise`\<`unknown`\>

#### Source

[step.ts:73](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L73)

***

### buttons?

> **`optional`** **buttons**: readonly [`StepOptionsButton`](StepOptionsButton.md)[]

An array of buttons to add to the step. These will be rendered in a
footer below the main body text.

#### Source

[step.ts:79](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L79)

***

### canClickTarget?

> **`optional`** **canClickTarget**: `boolean`

A boolean, that when set to false, will set `pointer-events: none` on the target.

#### Source

[step.ts:89](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L89)

***

### cancelIcon?

> **`optional`** **cancelIcon**: [`StepOptionsCancelIcon`](StepOptionsCancelIcon.md)

Should a cancel “✕” be shown in the header of the step?

#### Source

[step.ts:84](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L84)

***

### classes?

> **`optional`** **classes**: `string`

A string of extra classes to add to the step's content element.

#### Source

[step.ts:94](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L94)

***

### floatingUIOptions?

> **`optional`** **floatingUIOptions**: `object`

Extra [options to pass to FloatingUI][https://floating-ui.com/docs/tutorial/](https://floating-ui.com/docs/tutorial/)

#### Source

[step.ts:137](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L137)

***

### highlightClass?

> **`optional`** **highlightClass**: `string`

An extra class to apply to the `attachTo` element when it is
highlighted (that is, when its step is active). You can then target that selector in your CSS.

#### Source

[step.ts:100](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L100)

***

### id?

> **`optional`** **id**: `string`

The string to use as the `id` for the step.

#### Source

[step.ts:105](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L105)

***

### modalOverlayOpeningPadding?

> **`optional`** **modalOverlayOpeningPadding**: `number`

An amount of padding to add around the modal overlay opening

#### Source

[step.ts:110](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L110)

***

### modalOverlayOpeningRadius?

> **`optional`** **modalOverlayOpeningRadius**: `number` \| `object`

An amount of border radius to add around the modal overlay opening

#### Source

[step.ts:115](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L115)

***

### modalOverlayOpeningXOffset?

> **`optional`** **modalOverlayOpeningXOffset**: `number`

An amount to offset the modal overlay opening in the x-direction

#### Source

[step.ts:127](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L127)

***

### modalOverlayOpeningYOffset?

> **`optional`** **modalOverlayOpeningYOffset**: `number`

An amount to offset the modal overlay opening in the y-direction

#### Source

[step.ts:132](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L132)

***

### scrollTo?

> **`optional`** **scrollTo**: `boolean` \| `ScrollIntoViewOptions`

Should the element be scrolled to when this step is shown?

#### Source

[step.ts:142](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L142)

***

### scrollToHandler()?

> **`optional`** **scrollToHandler**: (`element`) => `void`

A function that lets you override the default scrollTo behavior and
define a custom action to do the scrolling, and possibly other logic.

#### Parameters

• **element**: `HTMLElement`

#### Returns

`void`

#### Source

[step.ts:148](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L148)

***

### showOn()?

> **`optional`** **showOn**: () => `boolean`

A function that, when it returns `true`, will show the step.
If it returns `false`, the step will be skipped.

#### Returns

`boolean`

#### Source

[step.ts:154](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L154)

***

### text?

> **`optional`** **text**: `StepText`

The text in the body of the step. It can be one of four types:
```
- HTML string
- Array of HTML strings
- `HTMLElement` object
- `Function` to be executed when the step is built. It must return one of the three options above.
```

#### Source

[step.ts:165](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L165)

***

### title?

> **`optional`** **title**: `StringOrStringFunction`

The step's title. It becomes an `h3` at the top of the step.
```
- HTML string
- `Function` to be executed when the step is built. It must return HTML string.
```

#### Source

[step.ts:174](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L174)

***

### when?

> **`optional`** **when**: [`StepOptionsWhen`](StepOptionsWhen.md)

You can define `show`, `hide`, etc events inside `when`. For example:
```js
when: {
  show: function() {
    window.scrollTo(0, 0);
  }
}
```

#### Source

[step.ts:186](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L186)
