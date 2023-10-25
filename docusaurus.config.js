// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Pelagus Documentation',
	tagline: 'Embark on Web3',
	favicon: 'img/favicon.ico',
	url: 'https://your-docusaurus-test-site.com', // Set the production url of your site here
	baseUrl: '/',
	organizationName: 'PelagusWallet',
	projectName: 'PelagusWallet',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
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
					editUrl: 'https://github.com/PelagusWallet/pelagus-docs/tree/main/',
					versions: {
						current: {
							label: 'current',
						},
					},
					lastVersion: 'current',
					showLastUpdateAuthor: true,
					showLastUpdateTime: true,
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
				hideOnScroll: true,
				title: 'Pelagus',
				logo: {
					alt: 'Pelagus Logo',
					src: 'img/PelagusLogoSquare.png',
					srcDark: 'img/PelagusLogoSquare.png',
				},
				items: [
					// left
					{ type: 'docSidebar', sidebarId: 'walletSidebar', position: 'left', label: 'Wallet' },
					{
						type: 'docSidebar',
						sidebarId: 'developSidebar',
						position: 'left',
						label: 'Develop',
					},
					// right
					{
						href: 'https://github.com/PelagusWallet/pelagus-docs',
						position: 'right',
						className: 'header-github-link',
					},
					// { Include this when versioning is set up
					// 	type: 'docsVersionDropdown',
					// 	position: 'right',
					// },
				],
			},
			colorMode: {
				defaultMode: 'light',
				disableSwitch: false,
				respectPrefersColorScheme: true,
			},
			announcementBar: {
				content:
					'If you like Pelagus, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/PelagusWallet/pelagus-extension">GitHub</a>!',
			},
			footer: {
				style: 'dark',
				links: [
					{
						title: 'Wallet',
						items: [
							{
								label: 'Introduction',
								to: 'docs/wallet/intro',
							},
							{
								label: 'Using Pelagus',
								to: 'docs/category/using-pelagus',
							},
						],
					},
					{
						title: 'Develop',
						items: [
							{
								label: 'Introduction',
								to: '/docs/develop/intro',
							},
							{
								label: 'Getting Started',
								to: 'docs/category/getting-started',
							},
							{
								label: 'How To',
								to: 'docs/category/how-to',
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
								href: 'https://discord.gg/EDkfZtZpDp',
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
								label: 'Website',
								href: 'https://pelaguswallet.io',
							},
							{
								label: 'Docs GitHub',
								href: 'https://github.com/PelagusWallet/pelagus-docs',
							},
							{
								label: 'Wallet Repo',
								href: 'https://github.com/PelagusWallet/pelagus-wallet',
							},
						],
					},
				],
				logo: {
					alt: 'Pelagus',
					src: 'img/PelagusLogoHorizontalWhite.png',
					srcDark: 'img/PelagusLogoHorizontalWhite.png',
					href: 'https://pelaguswallet.io',
					width: 180,
				},
				copyright: `Copyright © ${new Date().getFullYear()} Pelagus Wallet`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
}

module.exports = config
