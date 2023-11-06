// @ts-check

const { themes } = require('prism-react-renderer')
const lightTheme = themes.github
const darkTheme = themes.dracula

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Pelagus Documentation',
	tagline: 'Embark on Web3',
	favicon: 'img/favicon.ico',
	url: 'https://pelaguswallet.io',
	baseUrl: '/docs/',
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
			{
				docs: {
					routeBasePath: '/',
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
				sitemap: {
					changefreq: 'weekly',
					priority: 0.5,
					ignorePatterns: ['/tags/**'],
					filename: 'sitemap.xml',
				},
			},
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		{
			image: 'img/PelagusBanner.jpg',
			docs: {
				sidebar: {
					hideable: true,
					autoCollapseCategories: false,
				},
			},
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
				],
			},
			algolia: {
				// If Algolia did not provide you any appId, use 'BH4D9OD16A'
				appId: 'LL99M4ITCK',
				// Public API key: it is safe to commit it
				apiKey: 'b8311a80d4a87b33f1e934727d58025c',
				indexName: 'pelaguswallet',
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
								to: 'wallet/intro',
							},
							{
								label: 'Using Pelagus',
								to: 'category/using-pelagus',
							},
						],
					},
					{
						title: 'Develop',
						items: [
							{
								label: 'Introduction',
								to: 'develop/intro',
							},
							{
								label: 'Getting Started',
								to: 'category/getting-started',
							},
							{
								label: 'How To',
								to: 'category/how-to',
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
				additionalLanguages: ['bash', 'diff', 'json'],
				theme: lightTheme,
				darkTheme: darkTheme,
			},
		},
}

module.exports = config
