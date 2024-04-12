---
editUrl: false
next: false
prev: false
title: "default"
---

## Constructors

### new default(apiKey, apiPath, properties)

> **new default**(`apiKey`?, `apiPath`?, `properties`?): [`default`](default.md)

#### Parameters

• **apiKey?**: `string`

• **apiPath?**: `string`

• **properties?**

#### Returns

[`default`](default.md)

#### Source

[utils/datarequest.ts:20](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/utils/datarequest.ts#L20)

## Properties

### tourStateDb?

> **`optional`** **tourStateDb**: `IDBPDatabase`\<`TourStateDb`\>

#### Source

[utils/datarequest.ts:18](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/utils/datarequest.ts#L18)

## Methods

### getTourState()

> **getTourState**(): `Promise`\<`void`\>

Gets a list of the state for all the tours associated with a given apiKey

#### Returns

`Promise`\<`void`\>

#### Source

[utils/datarequest.ts:40](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/utils/datarequest.ts#L40)

***

### sendEvents()

> **sendEvents**(`body`): `Promise`\<`Record`\<`string`, `unknown`\>\>

Send events to the ShepherdPro API

#### Parameters

• **body**

The data to send for the event

• **body\.data**: `Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<`Record`\<`string`, `unknown`\>\>

#### Source

[utils/datarequest.ts:84](https://github.com/shipshapecode/shepherd/blob/78f473198277a0f7ac6fea873f10441dcf8b3944/shepherd.js/src/utils/datarequest.ts#L84)
