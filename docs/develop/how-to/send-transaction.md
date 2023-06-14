---
sidebar_position: 2
title: Sending Transactions
description: How to send transactions using Pelagus.
---

Quai Network utilizes 2 different types of transactions:

- **Internal Transactions** - Transactions with the sender and recipient on the same shard.
- **External Transactions** - Transactions from one shard to another.

Pelagus natively supports both types of transactions within the `quai_sendTransaction` method. This method identifies and handles the transaction type internally without added complexity on the application side.

Transactions should be initiated upon a direct user action, such as clicking a button. The following code snippet demonstrates how to initiate and send a transaction within your application, assuming you have already requested the [user's accounts](#user-accounts).

```js title="TransactionButton.jsx"
export default const TransactionButton = () => {
	const sendTransaction = async () => {
		await window.quai
            .request({
                method: 'quai_sendTransaction',
                params: [
                    from: accounts[0].address, // The user's address
                    to: "0x09E0Fb5874EA3FD83b3B48af2dC8FeD9ae375D1a", // required except during contract publications.
                    value: "0x1", // required when sending quai to an externally owned account
                    gasLimit: "0x5208", // customizable by the user during Pelagus confirmation
                    gasPrice: "0x3b9aca00", // customizable by the user during Pelagus confirmation
                    maxFeePerGas: "0x3b9aca00", // customizable by the user during Pelagus confirmation
                    data: "0x0", // optional data to be included in the transaction
                ]
            })
            .then((txHash) => console.log("Transaction Hash: ",txHash))
            .catch((error) => console.log(error))
	};

	return <button onClick={sendTransaction}>Send Transaction</button>;
};
```

Depending on the sender's and recipient's addresses, Pelagus will determine whether the transaction is internal or external. A distinction between sending an internal or external transaction will be displayed to the user when confirming the transaction within Pelagus.

## Transaction Parameters

:::note
All data passed to the `quai_sendTransaction` method as a parameter must be a hexidecimal string.
:::

The `quai_sendTransaction` method accepts the following parameters:

- `from` - _string_ - The address for the sending account. **Required**.
- `to` - _string_ - The address for the receiving account. **Required** except during contract publications.
- `value` - _string_ - The value to transfer. **Required** when sending quai to an externally owned account.
- `gasLimit` - _string_ - The maximum gas provided for this transaction (gas limit). **Optional**. Pelagus will set the gas limit automatically based on network congestion. It is recommended to omit this parameter.
- `gasPrice` - _string_ - The price of gas for this transaction (gas price). **Optional**. Pelagus will set the gas price automatically based on network congestion. It is recommended to omit this parameter.
- `maxFeePerGas` - _string_ - The maximum fee per gas for this transaction (max fee per gas). **Optional**. Pelagus will set the max fee per gas automatically based on network congestion. It is recommended to omit this parameter.
- `data` - _string_ - **Optional** data to be included in the transaction. This is typically utilized for interacting with or creating smart contracts.
