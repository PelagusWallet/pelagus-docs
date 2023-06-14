---
sidebar_position: 2
title: Detecting Pelagus
description: Detect Pelagus in your browser and application.
---

## Browser

Pelagus can be detected by checking for the existence of the `window.quai` object.

You can verify that Pelagus and the window.quai object have been injected into the browser by running the following in the developer console of your browser:

```js
await window.quai;
```

This should return an object indicating that Pelagus exists within browser:

```js
{ name: "Pelagus", version: "0.0.20", request: ƒ, isConnected: ƒ }
```

## Application

Inside of your application, you may want to differentiate between Pelagus and other quai based wallets. Verify that the provider is Pelagus by checking the provider name:

```js
function detectPelagus() {
	if (window.quai && window.quai.name === 'Pelagus') {
		// Provider is Pelagus
		const provider = window.quai;
		return provider;
	} else {
		// Provider is not Pelagus
		return;
	}
}
```
