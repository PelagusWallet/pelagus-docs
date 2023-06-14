---
sidebar_position: 1
title: JSON-RPC API
description: Reference for the Pelagus JSON-RPC API.
---

Pelagus uses the `window.quai.request(args)` method to wrap a JSON-RPC API. The API currently contains only Pelagus specific methods. The API is exposed to the browser via the `window.quai` object.

Pelagus supports two distinct request types:

- **Unrestricted** - These methods are [unrestricted](#unrestricted-methods) and can be called without requesting permissions.
- **Restricted** - These methods are [restricted](#restricted-methods) which requires requesting permissions using the [`wallet_requestPermissions`](#wallet_request_permissions) method before they can be called.

:::note
All RPC method requests and return an error.
Make sure to handle errors for every request.
:::

## Unrestricted Methods

Unrestricted methods have no restrictions when being called, but may still rely on permissions or user confirmation.

### wallet_getPermissions

#### Returns

An array of the permissions currently granted to the caller. If the call has no permissions, an empty array is returned.

#### Example

```js
function getPermissions() {
	quai
		.request({ method: 'quai_getPermissions' })
		.then((currentPermissions) => {
			console.log('Current Permissions:', currentPermissions);
		})
		.catch((error) => {
			console.error(error);
		});
}
```

#### Response

```json
[
	{
		"method": "quai_requestAccounts",
		"type": "read"
	},
	{
		"method": "quai_sendTransaction",
		"type": "write"
	}
]
```

### wallet_requestPermissions

Requests a specific set of permissions from the user. Causes a popup to appear for the user to reject or approve the request.

#### Returns

If the user approves the request, the method returns an array of the permissions granted to the caller. If the user rejects the request, the method returns an `4001` error.

#### Example

```js
function requestPermissions() {
	quai
		.request({ method: 'quai_requestPermissions', params: ['quai_requestAccounts', 'quai_sendTransactions'] })
		.then((grantedPermissions) => {
			console.log('Permissions granted:', grantedPermissions);
		})
		.catch((error) => {
			if (error.code === 4001) {
				// EIP-1193 userRejectedRequest error
				console.log('User rejected request');
			} else {
				console.error(error);
			}
		});
}
```

#### Response

```json
[
	{
		"method": "quai_requestAccounts",
		"type": "read"
	},
	{
		"method": "quai_sendTransaction",
		"type": "read"
	}
]
```

## Restricted Methods

Pelagus follows the wallet permissions system outlined in [EIP-2255](https://eips.ethereum.org/EIPS/eip-2255). To call a restricted method, you must first request permission from the user using the [`wallet_requestPermissions`](#wallet_request_permissions) method. Permissions are returned as JSON objects with the following structure:

```json
{
	"method": "quai_requestAccounts",
	"type": "read"
}
```

After requesting and recieving permissions from the user, your application can call restricted methods. When a restricted method is called without the proper permissions, Pelagus in turn prompts the user to grant the required permissions prior to proceeding with the request.

### quai_requestAccounts

`quai_requestAccounts` requests the user provide an array of one Quai address per shard to be identified by. This method is specified by a modified version of [EIP-1102](https://eips.ethereum.org/EIPS/eip-1102).

:::info
Calling this method inherently relies on the [`wallet_requestPermisssions`](#wallet_request_permissions) method to grant permission to access a user's accounts.
:::

#### Returns

If the user accepts the request, `quai_requestAccounts` returns an array of hexidecmimal Quai address strings. If the user rejects the request, the method rejects and returns a `4001` error.

#### Example

```js
function requestAccounts() {
	quai
		.request({ method: 'quai_requestAccounts' })
		.then((accounts) => {
			console.log('Accounts:', accounts);
		})
		.catch((error) => {
			if (error.code === 4001) {
				// EIP-1193 userRejectedRequest error
				console.log('User rejected request');
			} else {
				console.error(error);
			}
		});
}
```

#### Response

```json
[
	{
		"index": 0,
		"address": "0x0E4F546cB41728fD14C99b4df5db8dfB4E2FECD8",
		"path": "m/44'/994'/0'/0/0",
		"shard": "cyprus-1"
	},
	{
		"index": 31,
		"address": "0x1fb07d54ebB435FAB4fb4EEBB6fDAE940E597F15",
		"path": "m/44'/994'/0'/0/31",
		"shard": "cyprus-2"
	},
	".....etc"
]
```

### quai_sendTransaction

This method is used to send a transaction.

#### Returns

This method returns a promise that resolves to a transaction hash hexadecimal string upon success.

#### Example

```js
function sendTransaction() {
	quai
		.request({
			method: 'quai_sendTransaction',
			params: {
				from: '0xb60e8dd61c5d32be8058bb8eb970870f07233155',
				to: '0xd46e8dd67c5d32be8058bb8eb970870f07244567',
				gas: '0x5208',
				maxFeePerGas: '0x9184e72a000',
				maxPriorityFeePerGas: '0x9184e72a000',
				value: '0x1',
			},
		})
		.then((result) => {
			// if the request succeeds, the promise resolves to the transaction hash hexadecimal string
			console.log('Transaction result:', result);
		})
		.catch((error) => {
			// if the request fails, the promise is rejected with an error
			console.error(error);
		});
}
```

#### Response

```json

```

### personal_sign

This method requests the user sign data using their private key.

#### Returns

This method returns a promise that resolves to the signature's hexadecimal string.

#### Example

```js
function sendTransaction() {
	quai
		.request({
			method: 'quai_sendTransaction',
			params: ['hello pelagus', '0x06BeDcD422F569735D02293083deFf4B366990fe'],
		})
		.then((result) => {
			// if the request succeeds, the promise resolves to the signature hexadecimal string
			console.log('Transaction result:', result);
		})
		.catch((error) => {
			// if the request fails, the promise is rejected with an error
			console.error(error);
		});
}
```

#### Response

```json

```
