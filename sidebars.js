/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
	// By default, Docusaurus generates a sidebar from the docs folder structure
	// But you can create a sidebar manually
	walletSidebar: [
		{
			type: 'category',
			label: 'Introduction',
			items: ['wallet/intro/what-is-pelagus', 'wallet/intro/what-is-quai'],
		},
		{
			type: 'category',
			label: 'Using Pelagus',
			items: [
				'wallet/usePelagus/installation',
				'wallet/usePelagus/interact-with-dapps',
				'wallet/usePelagus/tokens',
				'wallet/usePelagus/walkthrough',
			],
		},
	],
	developSidebar: [
		{ type: 'doc', id: 'develop/intro' },
		{
			type: 'category',
			label: 'Getting Started',
			items: [
				'develop/get-started/setup',
				'develop/get-started/user-accounts',
				'develop/get-started/detecting-pelagus',
			],
		},
		{
			type: 'category',
			label: 'How To',
			items: [
				'develop/how-to/send-transaction',
				'develop/how-to/smart-contract',
				'develop/how-to/sign-message',
			],
		},
		{
			type: 'category',
			label: 'API Reference',
			items: ['develop/api/json-rpc-api', 'develop/api/quai-provider'],
		},
	],
};

module.exports = sidebars;
