---
sidebar_position: 3
title: User Accounts
description: Learn how to request and handle user accounts.
---

Within Quai Network, user accounts are the fundamental building block of the network. They act as an abstracted form of identification, to sign transactions and messages, and interact with applications.

To initiate a transaction or message signature, your application must have access to a user's accounts. This can be done using the [`quai_requestAccounts`](#quai_request_accounts) method.

## Requesting Accounts

Accessing a user's accounts requires the [`quai_requestAccounts`](#quai_request_accounts) permission. This permission is granted by the user using the [`wallet_requestPermissions`](#wallet_request_permissions) method.

Applications should only prompt a user to grant access to their accounts following a direct user action, such as click a connect button. This prevents your application from spamming users with permission requests. The following code snippet demonstrates how to request permission to access a user's accounts:

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

An example of an address object is shown below:

```json
{
	"index": 0,
	"address": "0x0E4F546cB41728fD14C99b4df5db8dfB4E2FECD8",
	"path": "m/44'/994'/0'/0/0",
	"shard": "cyprus-1"
}
```

## Handling Accounts

Pelagus will always return an unsorted array of 9 address objects. Each address object corresponds to a shard within the network. After the address array has been returned, it is often advantageous to sort the addresses by shard for both the user and application.

An example of account sorting and handling in :

```js title="handleAccounts.js"
// sorted quai network shard names
const sortedQuaiShardNames = [
	'Cyprus-1',
	'Cyprus-2',
	'Cyprus-3',
	'Paxos-1',
	'Paxos-2',
	'Paxos-3',
	'Hydra-1',
	'Hydra-2',
	'Hydra-3',
];

// simple sorting function
function sortAccountsByShardName(accounts) {
	return accounts.sort(
		(a, b) => sortedQuaiShardNames.indexOf(a.address) - sortedQuaiShardNames.indexOf(b.address)
	);
}

export function requestAccounts() {
	quai
		.request({ method: 'quai_requestAccounts' })
		.then((accounts) => {
			// sort accounts by shard name
			const sortedAccounts = sortAccountsByShardName(accounts);
			return sortedAccounts;
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

```js title="ConnectButton.jsx"

import { requestAccounts } from './handleAccounts';
import { useState } from 'react';

export default const ConnectButton = () => {
    const [accounts, setAccounts] = useState([]);

    const handleConnect = () => {
        requestAccounts().then((accounts) => {
            setAccounts(accounts);
        });
    };

    return (
        <button onClick={handleConnect}>
            {accounts.length > 0 ? 'Connected' : 'Connect'}
        </button>
    );
};

```
