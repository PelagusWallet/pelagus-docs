---
sidebar_position: 2
title: Sending Transactions
description: How to send transactions using Pelagus.
---

Quai Network has two different transactions types:

- **Internal Transactions** - Transactions with the sender and recipient on the same shard.
- **External Transactions** - Transactions from one shard to another.

Pelagus natively supports both types with the [`quai_sendTransaction`](../api/json-rpc-api.md#quai_sendtransaction) method. 

Internal and external transactions do **require different amounts of gas** for completion as external transactions must provide gas for *inclusion on both the origin and destination chain*. Pelagus will automatically calculate the gas required for the transaction based on the type of transaction being sent if no gas specifications are provided in the transaction call. 

:::warning
**Manual gas specification may cause the transaction to fail** if the gas provided is insufficient for both types of transactions.
:::

Transactions should be initiated upon a direct user action, such as clicking a button. The following code snippet demonstrates how to initiate and send a transaction within your application, assuming you have already requested the [user's accounts](../get-started/user-accounts.md).

```js title="TransactionButton.jsx"
export default const TransactionButton = () => {
	const sendTransaction = async () => {
		await window.ethereum
            .request({
                method: 'quai_sendTransaction',
                params: [
                    from: accounts[0], // The user's address
                    to: "0x09E0Fb5874EA3FD83b3B48af2dC8FeD9ae375D1a", // required except during contract publications.
                    value: "0x1", // required when sending quai to an externally owned account
                    gasLimit: "0x5208", // customizable by the user during Pelagus confirmation
                    gasPrice: "0x3b9aca00", // customizable by the user during Pelagus confirmation
                    maxFeePerGas: "0x3b9aca00", // customizable by the user during Pelagus confirmation
                    data: "0x0", // optional data to be included in the transaction
                ]
            })
            .then((txHash) => console.log("Transaction Hash: ", txHash))
            .catch((error) => console.log(error))
	};

	return <button onClick={sendTransaction}>Send Transaction</button>;
};
```

Depending on the sender's and recipient's addresses, Pelagus will determine whether the transaction is internal or external. A distinction between sending an internal or external transaction will be displayed to the user when confirming the transaction within Pelagus.