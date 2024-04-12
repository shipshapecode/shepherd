---
editUrl: false
next: false
prev: false
title: "TourOptions"
---

The options for the tour

## Properties

### classPrefix?

> **`optional`** **classPrefix**: `string`

The prefix to add to the `shepherd-enabled` and `shepherd-target` class names as well as the `data-shepherd-step-id`.

#### Source

[tour.ts:50](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L50)

***

### confirmCancel?

> **`optional`** **confirmCancel**: `TourConfirmCancel`

If true, will issue a `window.confirm` before cancelling.
If it is a function(support Async Function), it will be called and wait for the return value,
and will only be cancelled if the value returned is true.

#### Source

[tour.ts:42](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L42)

***

### confirmCancelMessage?

> **`optional`** **confirmCancelMessage**: `string`

The message to display in the `window.confirm` dialog.

#### Source

[tour.ts:46](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L46)

***

### defaultStepOptions?

> **`optional`** **defaultStepOptions**: [`StepOptions`](../../step/interfaces/StepOptions.md)

Default options for Steps (Step#constructor), created through `addStep`.

#### Source

[tour.ts:54](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L54)

***

### exitOnEsc?

> **`optional`** **exitOnEsc**: `boolean`

Exiting the tour with the escape key will be enabled unless this is explicitly
set to false.

#### Source

[tour.ts:59](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L59)

***

### id?

> **`optional`** **id**: `string`

Explicitly set the id for the tour. If not set, the id will be a generated uuid.

#### Source

[tour.ts:63](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L63)

***

### keyboardNavigation?

> **`optional`** **keyboardNavigation**: `boolean`

Navigating the tour via left and right arrow keys will be enabled
unless this is explicitly set to false.

#### Source

[tour.ts:68](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L68)

***

### modalContainer?

> **`optional`** **modalContainer**: `HTMLElement`

An optional container element for the modal.
If not set, the modal will be appended to `document.body`.

#### Source

[tour.ts:73](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L73)

***

### steps?

> **`optional`** **steps**: [`StepOptions`](../../step/interfaces/StepOptions.md)[] \| [`Step`](../../step/classes/Step.md)[]

An array of step options objects or Step instances to initialize the tour with.

#### Source

[tour.ts:82](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L82)

***

### stepsContainer?

> **`optional`** **stepsContainer**: `HTMLElement`

An optional container element for the steps.
If not set, the steps will be appended to `document.body`.

#### Source

[tour.ts:78](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L78)

***

### tourName?

> **`optional`** **tourName**: `string`

An optional "name" for the tour. This will be appended to the the tour's
dynamically generated `id` property.

#### Source

[tour.ts:87](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L87)

***

### useModalOverlay?

> **`optional`** **useModalOverlay**: `boolean`

Whether or not steps should be placed above a darkened
modal overlay. If true, the overlay will create an opening around the target element so that it
can remain interactive

#### Source

[tour.ts:93](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L93)
