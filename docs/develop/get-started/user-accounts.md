---
sidebar_position: 3
title: User Accounts
description: Learn how to request and handle user accounts.
---

Within Quai Network, user accounts are the fundamental building block of the network. They act as an abstracted form of identification, to sign transactions and messages, and interact with applications.

Quai Network utilizes a **sharded address space** across its multi-chain network. A user's address is not only a unique identifier, but also a mapping of the shard that the user is interacting with. **Knowing which shard a user is on is essential** for your application and orchestrating how your users interact with the network. More information on Quai's sharded address space can be found in the [Quai Network Docs](https://docs.quai.network/advanced-introduction/hierarchical-structure/sharding#sharded-address-space).

Pelagus handles Quai accounts via an **account based representation of each address with its corresponding shard**. Wallets may have multiple accounts, each with a unique address that maps to a specific shard in the network. When a user changes their "account" in the context of the wallet or your application, it typically means that they are **changing the both the shard and address** that they are connected with. This is important to note when handling accounts within your application.

## Requesting Accounts

To initiate a transaction or message signature, your application must have access to a user's accounts. Applications should only prompt a user to grant access to their accounts **following a direct user action**, such as _click a connect button_. This prevents your application from spamming users with permission requests.

Pelagus has two methods of requesting user accounts:

- [`quai_requestAccounts`](../api/json-rpc-api.md#quai_requestaccounts): Requests access to a user's accounts **via an extension pop-up**.
- [`quai_accounts`](../api/json-rpc-api.md#quai_accounts): Returns an array of accounts owned by the user if **permission has already been granted**.

## Handling Accounts

 Pelagus does not returns any information regarding the zone that a user's connected address address maps to. To determine which zone a user is on it can be useful to use the `getZoneFromAddress` method from the [`quais`](https://www.npmjs.com/package/quais) SDK in order to differentiate which zone the address is on.

An example of address zone determination:

```js title="requestAccounts.js"
import { quais } from 'quais'

export const requestAccounts = async () => {
	await window.pelagus
		.request({ method: 'quai_requestAccounts' })
		.then((accounts) => {
			const zone = quais.getZoneFromAddress(accounts[0])
			const address = {
				shard: shard,
				address: accounts[0],
			}
			console.log('Account:', address)
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

Implementing the `requestAccounts` method into a connect button:

```js title="ConnectButton.jsx"

import { requestAccounts } from './requestAccounts';
import { useState } from 'react';

export default const ConnectButton = () => {
    const [account, setAccount] = useState([]);

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
