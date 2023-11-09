---
sidebar_position: 1
title: Sign Messages
description: Sign messages and data using with Pelagus.
---

## Methods

Pelagus supports [`quai_signTypedData_v4`](../api/json-rpc-api.md#quai_signtypeddata_v4) and [`personal_sign`](../api/json-rpc-api.md#personal_sign) for signing messages.

### quai_signTypedData_v4

[`quai_signTypedData_v4`](../api/json-rpc-api.md#quai_signtypeddata_v4) provides a **cheap and human readable** way to sign and verify messages on chain. It should be used if the data you are presenting to the user is complex and needs to be efficiently processed on-chain.

### personal_sign

[`personal_sign`](../api/json-rpc-api.md#personal_sign) displays human-readable text when UTF-8 encoded, but does not have support for more complex structured data. This method **should not be used to present users with hex-encoded data to sign** or for messages that need to be efficiently processed on-chain.

#### Example

Below is an example of signing a simple message using the `personal_sign` method. Similar to sending a transaction, your application should only prompt users to sign a message following a _direct user action_.

```js title="SignButton.jsx"
export default const SignButton = () => {
	const message = 'hello pelagus';

	const signMessage = async () => {
		await window.ethereum
			.request({
				method: 'personal_sign',
				params: [message, accounts[0]],
			})
			.then((signature) => console.log("Message signature: ", signature))
			.catch((error) => console.log(error));
	};

	return <button onClick={signMessage}>Sign Message: {message}</button>;
};
```
