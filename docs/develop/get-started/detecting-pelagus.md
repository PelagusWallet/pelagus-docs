---
sidebar_position: 2
title: Detecting Pelagus
description: Detect Pelagus in your browser and application.
---

## Introduction

Similar to other browser extension wallets, Pelagus Wallet injects a unique `window.pelagus` object into the browser. This object can be used to send messages to the wallet, get data from the provider, and handle user actions.

## Handling Multiple Extensions

Often times, users _have multiple browser extension wallets installed alongside Pelagus_, each with their own injected `ethereum` object. Pelagus does inject a `window.ethereum` object as a fallback, but it is always recommended to interact with Pelagus via the `window.pelagus` object.

Usage of the Pelagus injected `window.ethereum` object alongside other wallet providers in the browser can potentially cause collisions or overrides. To avoid this, it is important to **specifically detect the presence of the Pelagus extension** in your application using `window.pelagus`.

## Pelagus in Browser

Pelagus can be detected in the browser via the `window.pelagus` object.

Running the command from above in your browser console will return the Pelagus provider if it is present:

```js
> window.pelagus

// Pelagus is present output
PelagusWindowProvider { … }
```

If the value returned is not a `PelagusWindowProvider`, then Pelagus is not present in the browser.

## Pelagus in Your Application

Inside of your application, you may want to differentiate between Pelagus and other Quai-based wallets. Verify that the provider is Pelagus by accessing the `window.pelagus` object.

```js
function detectPelagus() {
	if (window.pelagus) {
		// Pelagus detected, set provider
		const provider = window.pelagus
	} else {
		// No Pelagus detected
	}
}
```
