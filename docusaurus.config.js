// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Pelagus Developer Documentation',
	tagline: 'Embark on Web3',
	favicon: 'img/favicon.ico',

	// Set the production url of your site here
	url: 'https://your-docusaurus-test-site.com',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/',

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl: 'https://github.com/PelagusWallet/pelagus-docs',
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			image: 'img/PelagusBanner.jpg',
			navbar: {
				title: 'Pelagus',
				logo: {
					alt: 'Pelagus Logo',
					src: 'img/PelagusLogoSquare.png',
				},
				items: [
					{
						type: 'docSidebar',
						sidebarId: 'developSidebar',
						position: 'left',
						label: 'Develop',
					},
					{ type: 'docSidebar', sidebarId: 'walletSidebar', position: 'left', label: 'Wallet' },
					{
						href: 'https://github.com/PelagusWallet/pelagus-docs',
						label: 'GitHub',
						position: 'right',
					},
				],
			},
			footer: {
				style: 'dark',
				links: [
					{
						title: 'Docs',
						items: [
							{
								label: 'Develop',
								to: '/docs/intro',
							},
							{
								label: 'Wallet',
								to: '/wallet/intro',
							},
						],
					},
					{
						title: 'Community',
						items: [
							{
								label: 'Forum',
								href: 'https://forum.qu.ai',
							},
							{
								label: 'Discord',
								href: 'https://discord.gg/quai',
							},
							{
								label: 'Twitter',
								href: 'https://twitter.com/PelagusWallet',
							},
						],
					},
					{
						title: 'More',
						items: [
							{
								label: 'GitHub',
								href: 'https://github.com/PelagusWallet/pelagus-docs',
							},
						],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()} Pelagus Wallet`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;
