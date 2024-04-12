---
editUrl: false
next: false
prev: false
title: "Tour"
---

Class representing the site tour

## Extends

- [`Evented`](../../evented/classes/Evented.md)

## Constructors

### new Tour(options)

> **new Tour**(`options`): [`Tour`](Tour.md)

#### Parameters

• **options**: [`TourOptions`](../interfaces/TourOptions.md)= `{}`

#### Returns

[`Tour`](Tour.md)

#### Overrides

[`Evented`](../../evented/classes/Evented.md).[`constructor`](../../evented/classes/Evented.md#constructors)

#### Source

[tour.ts:200](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L200)

## Properties

### bindings

> **bindings**: `Bindings`

#### Inherited from

[`Evented`](../../evented/classes/Evented.md).[`bindings`](../../evented/classes/Evented.md#bindings)

#### Source

[evented.ts:11](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/evented.ts#L11)

***

### classPrefix

> **classPrefix**: `string`

#### Source

[tour.ts:192](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L192)

***

### currentStep?

> **`optional`** **currentStep**: `null` \| [`Step`](../../step/classes/Step.md)

#### Source

[tour.ts:193](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L193)

***

### focusedElBeforeOpen?

> **`optional`** **focusedElBeforeOpen**: `null` \| `HTMLElement`

#### Source

[tour.ts:194](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L194)

***

### id?

> **`optional`** **id**: `string`

#### Source

[tour.ts:195](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L195)

***

### modal?

> **`optional`** **modal**: `any`

#### Source

[tour.ts:196](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L196)

***

### options

> **options**: [`TourOptions`](../interfaces/TourOptions.md)

#### Source

[tour.ts:197](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L197)

***

### steps

> **steps**: [`Step`](../../step/classes/Step.md)[]

#### Source

[tour.ts:198](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L198)

***

### trackedEvents

> **trackedEvents**: `string`[]

#### Source

[tour.ts:190](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L190)

## Methods

### \_setupActiveTour()

> **\_setupActiveTour**(): `void`

Make this tour "active"

#### Returns

`void`

#### Source

[tour.ts:529](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L529)

***

### addStep()

> **addStep**(`options`, `index`?): [`Step`](../../step/classes/Step.md) \| [`StepOptions`](../../step/interfaces/StepOptions.md)

Adds a new step to the tour

#### Parameters

• **options**: [`Step`](../../step/classes/Step.md) \| [`StepOptions`](../../step/interfaces/StepOptions.md)

An object containing step options or a Step instance

• **index?**: `number`

The optional index to insert the step at. If undefined, the step
is added to the end of the array.

#### Returns

[`Step`](../../step/classes/Step.md) \| [`StepOptions`](../../step/interfaces/StepOptions.md)

The newly added step

#### Source

[tour.ts:279](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L279)

***

### addSteps()

> **addSteps**(`steps`?): [`Tour`](Tour.md)

Add multiple steps to the tour

#### Parameters

• **steps?**: [`StepOptions`](../../step/interfaces/StepOptions.md)[] \| [`Step`](../../step/classes/Step.md)[]

The steps to add to the tour

#### Returns

[`Tour`](Tour.md)

#### Source

[tour.ts:301](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L301)

***

### back()

> **back**(): `void`

Go to the previous step in the tour

#### Returns

`void`

#### Source

[tour.ts:314](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L314)

***

### cancel()

> **cancel**(): `Promise`\<`void`\>

Calls _done() triggering the 'cancel' event
If `confirmCancel` is true, will show a window.confirm before cancelling
If `confirmCancel` is a function, will call it and wait for the return value,
and only cancel when the value returned is true

#### Returns

`Promise`\<`void`\>

#### Source

[tour.ts:325](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L325)

***

### complete()

> **complete**(): `void`

Calls _done() triggering the `complete` event

#### Returns

`void`

#### Source

[tour.ts:349](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L349)

***

### getById()

> **getById**(`id`): `undefined` \| [`Step`](../../step/classes/Step.md)

Gets the step from a given id

#### Parameters

• **id**: `string` \| `number`

The id of the step to retrieve

#### Returns

`undefined` \| [`Step`](../../step/classes/Step.md)

The step corresponding to the `id`

#### Source

[tour.ts:358](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L358)

***

### getCurrentStep()

> **getCurrentStep**(): `undefined` \| `null` \| [`Step`](../../step/classes/Step.md)

Gets the current step

#### Returns

`undefined` \| `null` \| [`Step`](../../step/classes/Step.md)

#### Source

[tour.ts:367](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L367)

***

### hide()

> **hide**(): `void`

Hide the current step

#### Returns

`void`

#### Source

[tour.ts:374](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L374)

***

### isActive()

> **isActive**(): `boolean`

Check if the tour is active

#### Returns

`boolean`

#### Source

[tour.ts:385](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L385)

***

### next()

> **next**(): `void`

Go to the next step in the tour
If we are at the end, call `complete`

#### Returns

`void`

#### Source

[tour.ts:393](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L393)

***

### off()

> **off**(`event`, `handler`): [`Tour`](Tour.md)

Removes an event listener for the given event string.

#### Parameters

• **event**: `string`

• **handler**: `AnyHandler`

#### Returns

[`Tour`](Tour.md)

#### Inherited from

[`Evented`](../../evented/classes/Evented.md).[`off`](../../evented/classes/Evented.md#off)

#### Source

[evented.ts:53](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/evented.ts#L53)

***

### on()

> **on**(`event`, `handler`, `ctx`?, `once`?): [`Tour`](Tour.md)

Adds an event listener for the given event string.

#### Parameters

• **event**: `string`

• **handler**: `AnyHandler`

• **ctx?**: `unknown`

• **once?**: `boolean`= `false`

#### Returns

[`Tour`](Tour.md)

#### Inherited from

[`Evented`](../../evented/classes/Evented.md).[`on`](../../evented/classes/Evented.md#on)

#### Source

[evented.ts:22](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/evented.ts#L22)

***

### once()

> **once**(`event`, `handler`, `ctx`?): [`Tour`](Tour.md)

Adds an event listener that only fires once for the given event string.

#### Parameters

• **event**: `string`

• **handler**: `AnyHandler`

• **ctx?**: `unknown`

#### Returns

[`Tour`](Tour.md)

#### Inherited from

[`Evented`](../../evented/classes/Evented.md).[`once`](../../evented/classes/Evented.md#once)

#### Source

[evented.ts:42](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/evented.ts#L42)

***

### removeStep()

> **removeStep**(`name`): `void`

Removes the step from the tour

#### Parameters

• **name**: `string`

The id for the step to remove

#### Returns

`void`

#### Source

[tour.ts:407](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L407)

***

### setupModal()

> **setupModal**(): `void`

setupModal create the modal container and instance

#### Returns

`void`

#### Source

[tour.ts:538](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L538)

***

### show()

> **show**(`key`, `forward`): `void`

Show a specific step in the tour

#### Parameters

• **key**: `string` \| `number`= `0`

The key to look up the step by

• **forward**: `boolean`= `true`

True if we are going forward, false if backward

#### Returns

`void`

#### Source

[tour.ts:437](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L437)

***

### start()

> **start**(): `Promise`\<`void`\>

Start the tour

#### Returns

`Promise`\<`void`\>

#### Source

[tour.ts:464](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L464)

***

### trigger()

> **trigger**(`event`, ...`args`): [`Tour`](Tour.md)

Triggers an event listener for the given event string.

#### Parameters

• **event**: `string`

• ...**args**: `any`[]

#### Returns

[`Tour`](Tour.md)

#### Inherited from

[`Evented`](../../evented/classes/Evented.md).[`trigger`](../../evented/classes/Evented.md#trigger)

#### Source

[evented.ts:78](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/evented.ts#L78)
