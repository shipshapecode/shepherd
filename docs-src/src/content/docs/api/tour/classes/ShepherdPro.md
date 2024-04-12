---
editUrl: false
next: false
prev: false
title: "ShepherdPro"
---

## Extends

- [`Evented`](../../evented/classes/Evented.md)

## Constructors

### new ShepherdPro()

> **new ShepherdPro**(): [`ShepherdPro`](ShepherdPro.md)

#### Returns

[`ShepherdPro`](ShepherdPro.md)

#### Inherited from

[`Evented`](../../evented/classes/Evented.md).[`constructor`](../../evented/classes/Evented.md#constructors)

## Properties

### Step

> **Step**: *typeof* [`Step`](../../step/classes/Step.md)

#### Source

[tour.ts:112](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L112)

***

### Tour

> **Tour**: *typeof* [`Tour`](Tour.md)

#### Source

[tour.ts:113](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L113)

***

### activeTour?

> **`optional`** **activeTour**: `null` \| [`Tour`](Tour.md)

#### Source

[tour.ts:111](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L111)

***

### apiKey?

> **`optional`** **apiKey**: `string`

#### Source

[tour.ts:101](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L101)

***

### apiPath?

> **`optional`** **apiPath**: `string`

#### Source

[tour.ts:102](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L102)

***

### bindings

> **bindings**: `Bindings`

#### Inherited from

[`Evented`](../../evented/classes/Evented.md).[`bindings`](../../evented/classes/Evented.md#bindings)

#### Source

[evented.ts:11](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/evented.ts#L11)

***

### dataRequester?

> **`optional`** **dataRequester**: [`default`](../../utils/datarequest/classes/default.md)

#### Source

[tour.ts:103](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L103)

***

### isProEnabled

> **isProEnabled**: `boolean` = `false`

#### Source

[tour.ts:104](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L104)

***

### properties?

> **`optional`** **properties**: `object`

Extra properties to pass to Shepherd Pro

#### Index signature

 \[`key`: `string`\]: `unknown`

#### Source

[tour.ts:108](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L108)

## Methods

### createNewActor()

> **createNewActor**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[tour.ts:155](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L155)

***

### init()

> **init**(`apiKey`?, `apiPath`?, `properties`?): `Promise`\<`void`\>

Call init to take full advantage of ShepherdPro functionality

#### Parameters

• **apiKey?**: `string`

The API key for your ShepherdPro account

• **apiPath?**: `string`

• **properties?**

Extra properties to be passed to Shepherd Pro

#### Returns

`Promise`\<`void`\>

#### Source

[tour.ts:121](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L121)

***

### isTourEnabled()

> **isTourEnabled**(`tourId`): `Promise`\<`undefined` \| `boolean`\>

Checks if a given tour's id is enabled

#### Parameters

• **tourId**: `string`

A string denoting the id of the tour

#### Returns

`Promise`\<`undefined` \| `boolean`\>

#### Source

[tour.ts:173](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/tour.ts#L173)

***

### off()

> **off**(`event`, `handler`): [`ShepherdPro`](ShepherdPro.md)

Removes an event listener for the given event string.

#### Parameters

• **event**: `string`

• **handler**: `AnyHandler`

#### Returns

[`ShepherdPro`](ShepherdPro.md)

#### Inherited from

[`Evented`](../../evented/classes/Evented.md).[`off`](../../evented/classes/Evented.md#off)

#### Source

[evented.ts:53](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/evented.ts#L53)

***

### on()

> **on**(`event`, `handler`, `ctx`?, `once`?): [`ShepherdPro`](ShepherdPro.md)

Adds an event listener for the given event string.

#### Parameters

• **event**: `string`

• **handler**: `AnyHandler`

• **ctx?**: `unknown`

• **once?**: `boolean`= `false`

#### Returns

[`ShepherdPro`](ShepherdPro.md)

#### Inherited from

[`Evented`](../../evented/classes/Evented.md).[`on`](../../evented/classes/Evented.md#on)

#### Source

[evented.ts:22](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/evented.ts#L22)

***

### once()

> **once**(`event`, `handler`, `ctx`?): [`ShepherdPro`](ShepherdPro.md)

Adds an event listener that only fires once for the given event string.

#### Parameters

• **event**: `string`

• **handler**: `AnyHandler`

• **ctx?**: `unknown`

#### Returns

[`ShepherdPro`](ShepherdPro.md)

#### Inherited from

[`Evented`](../../evented/classes/Evented.md).[`once`](../../evented/classes/Evented.md#once)

#### Source

[evented.ts:42](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/evented.ts#L42)

***

### trigger()

> **trigger**(`event`, ...`args`): [`ShepherdPro`](ShepherdPro.md)

Triggers an event listener for the given event string.

#### Parameters

• **event**: `string`

• ...**args**: `any`[]

#### Returns

[`ShepherdPro`](ShepherdPro.md)

#### Inherited from

[`Evented`](../../evented/classes/Evented.md).[`trigger`](../../evented/classes/Evented.md#trigger)

#### Source

[evented.ts:78](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/evented.ts#L78)
