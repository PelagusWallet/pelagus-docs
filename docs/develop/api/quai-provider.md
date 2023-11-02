---
sidebar_position: 1
title: Pelagus Provider API
description: Reference for the Pelagus Provider API.
---

The Pelagus provider API is a global Javascript API injected into the browser by Pelagus. The Pelagus provider and API are accessible via the injected `window.ethereum` object, which allows applications to interface with users through a variety of methods and requests. You can use a combination of the available methods, properties, and events within your application to request user accounts, prompt the signing of messages and transactions, and more.

## Properties

### window.ethereum.isPelagus

The `isPelagus` property indicates whether the injected `window.ethereum` is Pelagus. This property is available on page load.

## Methods

:::note
The Pelagus Provider API is currently under development and is subject to change. A larger set of methods will be available for use in the future.
:::

### window.ethereum.request(args)

The `request` method is used to submit RPC API requests to Quai Network using Pelagus. The request returns a promise that resolves to the result of the RPC method call. If the request fails, the promise will reject with an error.

```js
interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

window.ethereum.request(args: RequestArguments): Promise<unknown>;
```

A list of available methods can be found in the [JSON-RPC API documentation](json-rpc-api.md#methods). Methods are always of type `string` and are case-sensitive. The `params` property is optional depending on the method called and can be either an array of parameters or an object of named parameters.

## Events

The Pelagus provider uses the Node.js EventEmitter API for emitting events. You can subscribe to these events using the `on` method detailed in the example below. When you are finished listening to an event, you should unsubscribe using the `removeListener` method.

```js
const handleAccountsChanged = (accounts) => {
	// Handle new accounts or empty return
}
// Add listener
window.ethereum.on('accountsChanged', handleAccountsChanged)
// Remove listener
window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
```

Pelagus event listeners accept two arguments, the first being the event name and the second being a callback function passed to `window.ethereum` when the event is emitted.

### accountsChanged

The `accountsChanged` event is emitted when the currently connected account changes. The event returns a hexadecimal array of the new connected account.

```ts
window.ethereum.on('accountsChanged', handler: (accounts: Array<string>) => void);
```

The `accountsChanged` event returns the value of the `eth_accounts` RPC method upon the account change. eth_accounts returns either an empty array, or an array that contains the addresses of the accounts the caller is permitted to access with the most recently used account first. Callers are identified by their URL origin, which means that all sites with the same origin share the same permissions.

## Errors

Pelagus follows the error standards outlined in [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193#provider-errors) and [EIP-1474](https://eips.ethereum.org/EIPS/eip-1474#error-codes). All returned errors returned by Pelagus follow the interface shown below.

```js
interface PelagusError extends Error {
	message: string;
	code: number;
	data?: unknown;
}
```

The [`window.ethereum.request(args)`](#windowethereumrequestargs) is the most common method you'll run into errors with when using Pelagus.

Some common error codes are shown below.

| Code   | Message                   | Description                   |
| :----- | :------------------------ | :---------------------------- |
| 4001   | User rejected the request | The user rejected the request |
| -32602 | Invalid params            | Invalid method parameters     |
| -32603 | Internal error            | Internal JSON-RPC error       |
