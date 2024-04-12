---
editUrl: false
next: false
prev: false
title: "StepOptionsButton"
---

## Properties

### action()?

> **`optional`** **action**: (`this`) => `void`

A function executed when the button is clicked on
It is automatically bound to the `tour` the step is associated with, so things like `this.next` will
work inside the action.
You can use action to skip steps or navigate to specific steps, with something like:
```js
action() {
  return this.show('some_step_name');
}
```

#### Parameters

• **this**: [`Tour`](../../tour/classes/Tour.md)

#### Returns

`void`

#### Source

[step.ts:229](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L229)

***

### classes?

> **`optional`** **classes**: `string`

Extra classes to apply to the `<a>`

#### Source

[step.ts:234](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L234)

***

### disabled?

> **`optional`** **disabled**: `boolean` \| () => `boolean`

Whether the button should be disabled
When the value is `true`, or the function returns `true` the button will be disabled

#### Source

[step.ts:240](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L240)

***

### label?

> **`optional`** **label**: `StringOrStringFunction`

The aria-label text of the button

#### Source

[step.ts:245](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L245)

***

### secondary?

> **`optional`** **secondary**: `boolean`

A boolean, that when true, adds a `shepherd-button-secondary` class to the button.

#### Source

[step.ts:250](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L250)

***

### text?

> **`optional`** **text**: `StringOrStringFunction`

The HTML text of the button

#### Source

[step.ts:255](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L255)
