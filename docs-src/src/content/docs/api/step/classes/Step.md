---
editUrl: false
next: false
prev: false
title: "Step"
---

A class representing steps to be added to a tour.

## Extends

- [`Evented`](../../evented/classes/Evented.md)

## Constructors

### new Step(tour, options)

> **new Step**(`tour`, `options`): [`Step`](Step.md)

#### Parameters

• **tour**: [`Tour`](../../tour/classes/Tour.md)

• **options**: [`StepOptions`](../interfaces/StepOptions.md)= `{}`

#### Returns

[`Step`](Step.md)

#### Overrides

[`Evented`](../../evented/classes/Evented.md).[`constructor`](../../evented/classes/Evented.md#constructors)

#### Source

[step.ts:286](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L286)

## Properties

### \_resolvedAttachTo

> **\_resolvedAttachTo**: `null` \| [`StepOptionsAttachTo`](../interfaces/StepOptionsAttachTo.md)

#### Source

[step.ts:276](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L276)

***

### bindings

> **bindings**: `Bindings`

#### Inherited from

[`Evented`](../../evented/classes/Evented.md).[`bindings`](../../evented/classes/Evented.md#bindings)

#### Source

[evented.ts:11](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/evented.ts#L11)

***

### classPrefix?

> **`optional`** **classPrefix**: `string`

#### Source

[step.ts:277](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L277)

***

### cleanup

> **cleanup**: `null` \| `Function`

#### Source

[step.ts:279](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L279)

***

### el?

> **`optional`** **el**: `null` \| `HTMLElement`

#### Source

[step.ts:280](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L280)

***

### id

> **id**: `string`

#### Source

[step.ts:281](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L281)

***

### options

> **options**: [`StepOptions`](../interfaces/StepOptions.md)

#### Source

[step.ts:282](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L282)

***

### target?

> **`optional`** **target**: `null` \| `HTMLElement`

#### Source

[step.ts:283](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L283)

***

### tour

> **tour**: [`Tour`](../../tour/classes/Tour.md)

#### Source

[step.ts:284](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L284)

## Methods

### \_getClassOptions()

> **\_getClassOptions**(`stepOptions`): `string`

_getClassOptions gets all possible classes for the step

#### Parameters

• **stepOptions**: [`StepOptions`](../interfaces/StepOptions.md)

The step specific options

#### Returns

`string`

unique string from array of classes

#### Source

[step.ts:497](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L497)

***

### \_resolveAttachToOptions()

> **\_resolveAttachToOptions**(): [`StepOptionsAttachTo`](../interfaces/StepOptionsAttachTo.md)

Resolves attachTo options.

#### Returns

[`StepOptionsAttachTo`](../interfaces/StepOptionsAttachTo.md)

#### Source

[step.ts:375](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L375)

***

### \_setOptions()

> **\_setOptions**(`options`): `void`

Sets the options for the step, maps `when` to events, sets up buttons

#### Parameters

• **options**: [`StepOptions`](../interfaces/StepOptions.md)= `{}`

The options for the step

#### Returns

`void`

#### Source

[step.ts:518](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L518)

***

### cancel()

> **cancel**(): `void`

Cancel the tour
Triggers the `cancel` event

#### Returns

`void`

#### Source

[step.ts:315](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L315)

***

### complete()

> **complete**(): `void`

Complete the tour
Triggers the `complete` event

#### Returns

`void`

#### Source

[step.ts:324](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L324)

***

### destroy()

> **destroy**(): `void`

Remove the step, delete the step's element, and destroy the FloatingUI instance for the step.
Triggers `destroy` event

#### Returns

`void`

#### Source

[step.ts:333](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L333)

***

### getElement()

> **getElement**(): `undefined` \| `null` \| `HTMLElement`

Returns the element for the step

#### Returns

`undefined` \| `null` \| `HTMLElement`

The element instance. undefined if it has never been shown, null if it has been destroyed

#### Source

[step.ts:432](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L432)

***

### getTarget()

> **getTarget**(): `undefined` \| `null` \| `HTMLElement`

Returns the target for the step

#### Returns

`undefined` \| `null` \| `HTMLElement`

The element instance. undefined if it has never been shown, null if query string has not been found

#### Source

[step.ts:440](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L440)

***

### getTour()

> **getTour**(): [`Tour`](../../tour/classes/Tour.md)

Returns the tour for the step

#### Returns

[`Tour`](../../tour/classes/Tour.md)

The tour instance

#### Source

[step.ts:350](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L350)

***

### hide()

> **hide**(): `void`

Hide the step

#### Returns

`void`

#### Source

[step.ts:357](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L357)

***

### isOpen()

> **isOpen**(): `boolean`

Check if the step is open and visible

#### Returns

`boolean`

True if the step is open and visible

#### Source

[step.ts:397](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L397)

***

### off()

> **off**(`event`, `handler`): [`Step`](Step.md)

Removes an event listener for the given event string.

#### Parameters

• **event**: `string`

• **handler**: `AnyHandler`

#### Returns

[`Step`](Step.md)

#### Inherited from

[`Evented`](../../evented/classes/Evented.md).[`off`](../../evented/classes/Evented.md#off)

#### Source

[evented.ts:53](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/evented.ts#L53)

***

### on()

> **on**(`event`, `handler`, `ctx`?, `once`?): [`Step`](Step.md)

Adds an event listener for the given event string.

#### Parameters

• **event**: `string`

• **handler**: `AnyHandler`

• **ctx?**: `unknown`

• **once?**: `boolean`= `false`

#### Returns

[`Step`](Step.md)

#### Inherited from

[`Evented`](../../evented/classes/Evented.md).[`on`](../../evented/classes/Evented.md#on)

#### Source

[evented.ts:22](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/evented.ts#L22)

***

### once()

> **once**(`event`, `handler`, `ctx`?): [`Step`](Step.md)

Adds an event listener that only fires once for the given event string.

#### Parameters

• **event**: `string`

• **handler**: `AnyHandler`

• **ctx?**: `unknown`

#### Returns

[`Step`](Step.md)

#### Inherited from

[`Evented`](../../evented/classes/Evented.md).[`once`](../../evented/classes/Evented.md#once)

#### Source

[evented.ts:42](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/evented.ts#L42)

***

### show()

> **show**(): `Promise`\<`void`\>

Wraps `_show` and ensures `beforeShowPromise` resolves before calling show

#### Returns

`Promise`\<`void`\>

#### Source

[step.ts:404](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L404)

***

### trigger()

> **trigger**(`event`, ...`args`): [`Step`](Step.md)

Triggers an event listener for the given event string.

#### Parameters

• **event**: `string`

• ...**args**: `any`[]

#### Returns

[`Step`](Step.md)

#### Inherited from

[`Evented`](../../evented/classes/Evented.md).[`trigger`](../../evented/classes/Evented.md#trigger)

#### Source

[evented.ts:78](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/evented.ts#L78)

***

### updateStepOptions()

> **updateStepOptions**(`options`): `void`

Updates the options of the step.

#### Parameters

• **options**: [`StepOptions`](../interfaces/StepOptions.md)

The options for the step

#### Returns

`void`

#### Source

[step.ts:418](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/step.ts#L418)
