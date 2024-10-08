---
sidebar_position: 1
title: JSON-RPC API
description: Reference for the Pelagus JSON-RPC API.
---

Pelagus uses the [`window.pelagus.request(args)`](quai-provider.md#windowpelagusrequestargs) method to wrap a JSON-RPC API. The API contains both the standard Quai JSON-RPC API methods Pelagus specific methods. The API is exposed to the browser via the `window.pelagus` object.

## Methods

Pelagus supports the following Pelagus specific API methods:

- [quai_requestAccounts](#quai_requestaccounts)
- [quai_accounts](#quai_accounts)
- [quai_sendTransaction](#quai_sendtransaction)
- [personal_sign](#personal_sign)
- [quai_signTypedData_v4](#quai_signtypeddata_v4)

Pelagus also supports most standard Quai JSON-RPC API methods. For a full list of supported methods, see the [Quai JSON-RPC API documentation](https://docs.qu.ai/build/playground/overview). Relevant supported methods include:

- [quai_chainId](https://docs.qu.ai/build/playground/other/chainId)
- [quai_getBalance](https://docs.qu.ai/build/playground/addresses/getBalance)
- [quai_getTransactionCount](https://docs.qu.ai/build/playground/addresses/getTransactionCount)
- [quai_getBlockByNumber](https://docs.qu.ai/build/playground/blocks/getBlockByNumber)
- [quai_getBlockByHash](https://docs.qu.ai/build/playground/blocks/getBlockByHash)

:::tip
**RPC method requests may return an error**.
Make sure to handle errors for every request.
:::

### quai_requestAccounts

The `quai_requestAccounts` method **initiates an extension pop-up** that prompts the user to provide your application access to their current account. This method is specified by [EIP-1102](https://eips.ethereum.org/EIPS/eip-1102).

#### Params

`quai_requestAccounts` does not require any parameters.

#### Example

```js
const requestAccounts = async () => {
	await window.pelagus
		.request({ method: 'quai_requestAccounts' })
		.then((accounts) => {
			console.log('Accounts:', accounts)
		})
		.catch((error) => {
			if (error.code === 4001) {
				// EIP-1193 userRejectedRequest error
				console.log('User rejected request')
			} else {
				console.error(error)
			}
		})
}
```

#### Return

If the user accepts the request, `quai_requestAccounts` returns an array of hexidecmimal address strings. If the user rejects the request, the method rejects and returns a `4001` error.

An example of a return value from the [`quai_requestAccounts`] method:

```
['0x002F4783248e2D6FF1aa6482A8C0D7a76de3C329']
```

### quai_accounts

`quai_accounts` returns an array of addresses owned by the user **without initatiting an extension pop-up**. This method is also specified by [EIP-1102](https://eips.ethereum.org/EIPS/eip-1102).

#### Params

`quai_accounts` does not require any parameters.

#### Example

```js
const getAccounts = async () => {
	await window.pelagus
		.request({ method: 'quai_accounts' })
		.then((accounts) => {
			console.log('Accounts:', accounts)
		})
		.catch((error) => {
			console.error(error)
		})
}
```

#### Return

If the user _has allowed_ the application to access their accounts, `quai_accounts` returns an array of hexidecmimal address strings. If the user _has not allowed_ the application to access their accounts, the method returns an empty array.

### quai_sendTransaction

The `quai_sendTransaction` is used to sign and broadcast a transaction with an arbitrary value or data payload via an extension pop-up.

#### Params

The `quai_sendTransaction` method accepts the following parameters:

- `from`: _string_ - The address for the sending account.
- `to`: _string_ - The address for the receiving account. Required except during contract publications.
- `value`: _string_ - The value to transfer. Required when sending quai to an externally owned account.
- `gasLimit`: _string_ - The maximum gas provided for this transaction. Pelagus will set the gas limit automatically based on network congestion. It is recommended to omit this parameter. (**Optional**)
- `gasPrice`: _string_ - The price of gas for this transaction. Pelagus will set the gas price automatically based on network congestion. It is recommended to omit this parameter.(**Optional**)
- `maxFeePerGas`: _string_ - The maximum fee per gas for this transaction. Pelagus will set the max fee per gas automatically based on network congestion. It is recommended to omit this parameter. (**Optional**)
- `data`: _string_ - Data to be included in the transaction. This is typically utilized for interacting with or creating smart contracts. (**Optional**)

:::tip
All data passed to the `quai_sendTransaction` method as a parameter must be a **hexadecimal string**.
:::

#### Example

```js
const sendTransaction = async () => {
	await window.pelagus
		.request({
			method: 'quai_sendTransaction',
			params: [
				{
					from: '0x002F4783248e2D6FF1aa6482A8C0D7a76de3C329',
					to: '0x005f644097F8f0E9f996Dca4F4F23aBB6C1Cc8b3',
					gas: '0x5208',
					maxFeePerGas: '0x9184e72a000',
					maxPriorityFeePerGas: '0x9184e72a000',
					value: '0x1',
				},
			],
		})
		.then((result) => {
			// if the request succeeds, the promise resolves to the transaction hash hexadecimal string
			console.log('Transaction result:', result)
		})
		.catch((error) => {
			// if the request fails, the promise is rejected with an error
			console.error(error)
		})
}
```

#### Return

`quai_sendTransaction` returns a promise that resolves to a transaction hash hexadecimal string upon success.

### personal_sign

The `personal_sign` requests the user sign data using their private key via an extension pop-up.

#### Params

The `personal_sign` method accepts the following parameters:

- `data`: _string_ - The data to sign.
- `signer`: _string_ - The address to sign with.

#### Example

```js
const signMessage = async () => {
	const data = 'Hello Pelagus'
	const msg = `0x${Buffer.from(data, 'utf8').toString('hex')}`
	const signer = '0x005f644097F8f0E9f996Dca4F4F23aBB6C1Cc8b3'

	await window.pelagus
		.request({
			method: 'personal_sign',
			params: [data, signer],
		})
		.then((signature) => {
			// if the request succeeds, the promise resolves to the signature hexadecimal string
			console.log('Message Signature', signature)
		})
		.catch((error) => {
			// if the request fails, the promise is rejected with an error
			console.error(error)
		})
}
```

#### Return

`personal_sign` returns a promise that resolves to the signature's hexadecimal string.

### quai_signTypedData_v4

The `quai_signTypedData_v4` requests the user to sign more complex, structured data using via an extension pop-up.

#### Params

The `quai_signTypedData_v4` method accepts the following parameters:

- `signer`: _string_ - The address to sign with.
- `typedData`: _object_ - The data to sign.

`typedData` is a structured JSON object that conforms to the [EIP-712](https://eips.ethereum.org/EIPS/eip-712) standard. The object must contain the following properties:

- `types`: _object_ - A collection of type definitions.
  - `EIP712Domain`: _array_ - An array of objects that define the domain separator. It must include one or more of the following domain seperator values: `name`, `version`, `chainId`, and `verifyingContract`.
- `primaryType`: _string_ - The primary type of the message.
- `domain`: _object_ - The domain separator of the message.
- `message`: _object_ - The message to sign.

#### Example

```js
const signTypedData = async () => {
	const typedData = {
		types: {
			EIP712Domain: [
				{
					name: 'name',
					type: 'string',
				},
				{
					name: 'version',
					type: 'string',
				},
				{
					name: 'chainId',
					type: 'uint256',
				},
				{
					name: 'verifyingContract',
					type: 'address',
				},
			],
			Recipient: [
				{
					name: 'name',
					type: 'string',
				},
				{
					name: 'wallet',
					type: 'address',
				},
			],
			Message: [
				{
					name: 'from',
					type: 'Person',
				},
				{
					name: 'to',
					type: 'Person',
				},
				{
					name: 'contents',
					type: 'string',
				},
			],
		},
		primaryType: 'Message',
		domain: {
			name: 'Pelagus Messaging Service',
			version: '1',
			chainId: 9000,
			verifyingContract: '0x0063Cb948Dc92d8B7637ECDfCC7e33580A6c046b',
		},
		message: {
			from: {
				name: 'Alice',
				wallet: '0x00735E9B2c731Fd3eCC8129a3653ACb99dF969cC',
			},
			to: {
				name: 'Bob',
				wallet: '0x005f644097F8f0E9f996Dca4F4F23aBB6C1Cc8b3',
			},
			contents: 'Howdy there, Bob!',
		},
	}
	await window.pelagus
		.request({
			method: 'quai_signTypedData_v4',
			params: ['0x00735E9B2c731Fd3eCC8129a3653ACb99dF969cC', typedData],
		})
		.then((signature) => {
			// if the request succeeds, the promise resolves to the signature hexadecimal string
			console.log('Message Signature:', signature)
		})
		.catch((error) => {
			// if the request fails, the promise is rejected with an error
			console.error(error)
		})
}
```

#### Return

`quai_signTypedData_v4` returns a promise that resolves to the signature's hexadecimal string.
