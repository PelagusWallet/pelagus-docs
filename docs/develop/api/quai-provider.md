---
sidebar_position: 1
title: Quai Provider API
description: Reference for the Quai Provider API.
---

The Quai provider API is a global Javascript API injected into the browser by Pelagus. The Pelagus provider and API are accessible via the injected `window.quai` object, which allows applications to interface with users through a variety of methods and requests. You can use a combination of the available methods, properties, and events within your application to request user accounts, prompt the signing of messages and transactions, and more.

## Methods

:::note
The Quai Provider API is currently under development and is subject to change. A larger set of methods will be available for use in the future.
:::

### window.quai.request(args)

The `request` method is used to submit RPC API requests to Quai Network using Pelagus. The request returns a promise that resolves to the result of the RPC method call. If the request fails, the promise will reject with an error.

```js
interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

window.quai.request(args: RequestArguments): Promise<unknown>;
```

A list of available methods can be found in the [JSON-RPC API documentation](json-rpc-api.md/#unrestricted-methods). Methods are always of type `string` and are case-sensitive. The `params` property is optional depending on the method called and can be either an array of parameters or an object of named parameters.

## Errors

Pelagus follows the error standards outlined in [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193#provider-errors) and [EIP-1474](https://eips.ethereum.org/EIPS/eip-1474#error-codes). All returned errors returned by Pelagus follow the interface shown below.

```js
interface PelagusError extends Error {
	message: string;
	code: number;
	data?: unknown;
}
```

The [`window.quai.request(args)`](#windowquairequestargs) is the most common method you'll run into errors with when using Pelagus.

Some common error codes are shown below.

| Code   | Message                   | Description                    |
| :----- | :------------------------ | :----------------------------- |
| 4001   | User rejected the request | The user rejected the request. |
| -32602 | Invalid params            | Invalid method parameters      |
| -32603 | Internal error            | Internal JSON-RPC error.       |
