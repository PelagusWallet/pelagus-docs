---
sidebar_position: 1
title: Sign Messages
description: Sign messages and data using with Pelagus.
---

Pelagus supports the `personal_sign` method for signing messages. `personal_sign` should not be used to present users with hex-encoded data to sign or for messages that need to be efficiently processed on-chain.

:::note
A method for signing structured or hex-encoded data in a more human readable format is currently in development and will be available in a future release.
:::

### Example

Below is an example of signing a simple, non hex-encoded message using the `personal_sign` method. Similar to sending a transaction, your application should only prompt users to sign a message following a direct user action.

```js title="SignButton.jsx"
export default const SignButton = () => {
	const message = 'hello pelagus';

	const signMessage = async () => {
		await window.quai
			.request({
				method: 'personal_sign',
				params: [message, accounts[0].address],
			})
			.then((signature) => console.log("Message signature: ", signature))
			.catch((error) => console.log(error));
	};

	return <button onClick={signMessage}>Sign Message: {message}</button>;
};
```
