---
sidebar_position: 2
title: Detecting Pelagus
description: Detect Pelagus in your browser and application.
---

## Browser

Pelagus can be detected by checking for the provider label in the `window.ethereum` object.

The `window.ethereum` is injected into the browser by a number of other wallets. You must check the provider label to ensure that Pelagus is present. You can verify that `window.ethereum` object has been injected into the browser and the provider label is Pelagus by running the following in the developer console of your browser:

```js
await window.ethereum.isPelagus
```

This should return an object indicating that Pelagus exists within browser:

```js
true
```

If Pelagus is not present in the browser, this will return `undefined`.

## Application

Inside of your application, you may want to differentiate between Pelagus and other quai based wallets. Verify that the provider is Pelagus by checking the provider name:

```js
function detectPelagus() {
	if (window.ethereum && window.ethereum.isPelagus === true) {
		// Provider is Pelagus
		const provider = window.ethereum
		return provider
	} else if (window.ethereum && window.ethereum.isPelagus === undefined) {
		// Provider is not Pelagus
		return
	} else {
		// Provider is not detected
		return
	}
}
```
