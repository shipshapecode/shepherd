---
editUrl: false
next: false
prev: false
title: "Evented"
---

## Extended by

- [`Step`](../../step/classes/Step.md)
- [`ShepherdPro`](../../tour/classes/ShepherdPro.md)
- [`Tour`](../../tour/classes/Tour.md)

## Constructors

### new Evented()

> **new Evented**(): [`Evented`](Evented.md)

#### Returns

[`Evented`](Evented.md)

## Properties

### bindings

> **bindings**: `Bindings`

#### Source

[evented.ts:11](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/evented.ts#L11)

## Methods

### off()

> **off**(`event`, `handler`): [`Evented`](Evented.md)

Removes an event listener for the given event string.

#### Parameters

• **event**: `string`

• **handler**: `AnyHandler`

#### Returns

[`Evented`](Evented.md)

#### Source

[evented.ts:53](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/evented.ts#L53)

***

### on()

> **on**(`event`, `handler`, `ctx`?, `once`?): [`Evented`](Evented.md)

Adds an event listener for the given event string.

#### Parameters

• **event**: `string`

• **handler**: `AnyHandler`

• **ctx?**: `unknown`

• **once?**: `boolean`= `false`

#### Returns

[`Evented`](Evented.md)

#### Source

[evented.ts:22](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/evented.ts#L22)

***

### once()

> **once**(`event`, `handler`, `ctx`?): [`Evented`](Evented.md)

Adds an event listener that only fires once for the given event string.

#### Parameters

• **event**: `string`

• **handler**: `AnyHandler`

• **ctx?**: `unknown`

#### Returns

[`Evented`](Evented.md)

#### Source

[evented.ts:42](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/evented.ts#L42)

***

### trigger()

> **trigger**(`event`, ...`args`): [`Evented`](Evented.md)

Triggers an event listener for the given event string.

#### Parameters

• **event**: `string`

• ...**args**: `any`[]

#### Returns

[`Evented`](Evented.md)

#### Source

[evented.ts:78](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/evented.ts#L78)
