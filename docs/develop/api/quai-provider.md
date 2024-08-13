---
sidebar_position: 1
title: Pelagus Provider API
description: Reference for the Pelagus Provider API.
---

The Pelagus provider API is a global Javascript API injected into the browser by the extension. The Pelagus provider and API are accessible via the injected `window.pelagus` object, which allows applications to interface with the users and the network.

## Properties

## Methods

### window.pelagus.request(args)

The `request` method is used to submit RPC API requests to Quai Network using Pelagus. The request returns a `Promise` that resolves to the result of the RPC method call. If the request fails, the promise will reject with an error.

```js
interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

window.pelagus.request(args: RequestArguments): Promise<unknown>;
```

Pelagus natively bundles a subset of the [Quai JSON-RPC API](https://docs.qu.ai/build/playground/overview) methods alongside a set of [Pelagus specific methods](./json-rpc-api.md). Methods are always of type `string` and are case-sensitive. The `params` property is optional depending on the method called and can be either an array of parameters or an object of named parameters.



## Events

The Pelagus provider uses the Node.js EventEmitter API for emitting events. You can subscribe to these events using the `on` method detailed in the example below. When you are finished listening to an event, you should unsubscribe using the `removeListener` method.

```js
const handleAccountsChanged = (accounts) => {
	// Handle new accounts or empty return
}
// Add listener
window.pelagus.on('accountsChanged', handleAccountsChanged)
// Remove listener
window.pelagus.removeListener('accountsChanged', handleAccountsChanged)
```

Pelagus event listeners accept two arguments, the first being the event name and the second being a callback function passed to `window.pelagus` when the event is emitted.

### accountsChanged

The `accountsChanged` event is emitted when the currently connected account changes. The event returns a hexadecimal array of the new connected account.

```ts
window.pelagus.on('accountsChanged', handler: (accounts: Array<string>) => void);
```

The `accountsChanged` event returns the value of the `quai_accounts` RPC method upon the account change. `quai_accounts` returns either an empty array, or an array that contains the addresses of the accounts the caller is permitted to access with the most recently used account first. Callers are identified by their URL origin, which means that all sites with the same origin share the same permissions.

## Errors

Pelagus follows the error standards outlined in [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193#provider-errors) and [EIP-1474](https://eips.ethereum.org/EIPS/eip-1474#error-codes). All returned errors returned by Pelagus follow the interface shown below.

```js
interface PelagusError extends Error {
	message: string;
	code: number;
	data?: unknown;
}
```

The [`window.pelagus.request(args)`](#windowpelagusrequestargs) is the most common method you'll run into errors with when using Pelagus.

Some common error codes are shown below.

| Code   | Message                   | Description                   |
| :----- | :------------------------ | :---------------------------- |
| 4001   | User rejected the request | The user rejected the request |
| -32602 | Invalid params            | Invalid method parameters     |
| -32603 | Internal error            | Internal JSON-RPC error       |
