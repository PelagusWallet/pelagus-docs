---
sidebar_position: 2
title: Detecting Pelagus
description: Detect Pelagus in your browser and application.
---

## Introduction

Similar to other browser extension wallets, Pelagus Wallet injects a unique `window.ethereum` object into the browser. This object can be used to send messages to the wallet, get data from the provider, and handle user actions.

## Handling Multiple Extensions

Often times, users _have multiple browser extension wallets installed alongside Pelagus_, each with their own injected `ethereum` object. The injection of multiple wallet providers in one browsers can potentially cause collisions or overrides of the Pelagus `window.ethereum` object. To avoid this, it is important to **specifically detect the presence of the Pelagus extension** in your application.

### The Default Wallet

Pelagus wallet has an option for users to set it as the default wallet. If Pelagus is:

- **Set as the default wallet**: Pelagus will override the `ethereum` object of all other injected wallet providers.
- **Not set as the default wallet**: Pelagus may be overridden by the `ethereum` object of another wallet provider.

For easy handling of either of the above cases, Pelagus provides a property `isPelagus` in the `window.ethereum` object. You can search for the `isPelagus` property using the following code:

```js
window.ethereum.providers?.find((p) => p.isPelagus) || window.ethereum;
```

The above expression will evaluate to the Pelagus provider if it is present.

## Pelagus in Browser

Pelagus can be detected by searching for a provider with the `isPelagus` property in the `window.ethereum` object.

Running the command from above in your browser console will return the Pelagus provider if it is present:

```js
> window.ethereum.providers?.find((p) => p.isPelagus) || window.ethereum

// Pelagus is present output
TallyWindowProvider {_events: {…}, _eventsCount: 0, _maxListeners: undefined, chainId: '0x1', connected: false, …}
```

If the value returned is not a `TallyWindowProvider`, then Pelagus is not present in the browser.

## Pelagus in Your Application

Inside of your application, you may want to differentiate between Pelagus and other Quai-based wallets. Verify that the provider is Pelagus by checking the `isPelagus` property in the `window.ethereum` object:

```js
function detectPelagus() {
	if (window.ethereum) {
		const provider = window.ethereum.providers?.find((p) => p.isPelagus);
		if (provider.isPelagus) {
			// Pelagus detected in the application
		} else {
			// Another wallet provider detected
		}
	} else {
		// No wallet provider detected
	}
}
```
