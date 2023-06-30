import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
	title: string;
	// Svg: React.ComponentType<React.ComponentProps<'svg'>>;
	description: JSX.Element;
};

type DocItem = {
	title: string;
	description: JSX.Element;
	link: string;
};

const FeatureList: FeatureItem[] = [
	{
		title: '🖼️ Open-Source',
		// Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
		description: (
			<>
				All code used in the Pelagus Wallet extension is completely open-source on Github. Open-source
				developers can review and suggest improvements to any and all aspects of the Pelagus codebase.
			</>
		),
	},
	{
		title: '🏡 Quai Native',
		// Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
		description: (
			<>
				The Pelagus Wallet extension has been designed specifically for use on Quai Network's unique
				multi-chain infrastructure.
			</>
		),
	},
	{
		title: '💻 Developer Centric',
		// Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
		description: (
			<>
				The Pelagus extension is built for developers, by developers. Featuring packaged providers,
				streamlined APIs, and smart transaction routing, integrating a wallet into your Dapp has never been
				easier.
			</>
		),
	},
];

const DocsList: DocItem[] = [
	{
		title: 'Use Pelagus',
		// Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
		description: (
			<>
				Follow step by step tutorials on how to install, use, and interact with Quai Network with the Pelagus
				Extension.{' '}
			</>
		),
		link: 'https://docs.pelagus.io/quick-start',
	},
	{
		title: 'Integrate Pelagus',
		// Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
		description: (
			<>Get Pelagus integrated into your application quickly using pre-built components and methods.</>
		),
		link: 'https://docs.pelagus.io/guides',
	},
	{
		title: 'Pelagus APIs',
		// Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
		description: (
			<>
				Use the full functionality of Pelagus to build powerful applications that leverage the power and speed
				of Quai Network.
			</>
		),
		link: 'https://docs.pelagus.io/api-reference',
	},
];

function Feature({ title, description }: FeatureItem) {
	return (
		<div className={clsx('col col--4')}>
			{/* <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div> */}
			<div className={styles.featureCard}>
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
}

function DocFeature({ title, description, link }: DocItem) {
	return (
		<a className={`col col--4 ${styles.docFeatures}`} href={link}>
			{/* <div className="text--center">
		<Svg className={styles.featureSvg} role="img" />
	  </div> */}
			<div className={styles.docFeatureCard}>
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</a>
	);
}

export default function HomepageFeatures(): JSX.Element {
	return (
		<section className={styles.features}>
			<div className='container'>
				<h2>Pelagus At A Glance</h2>
				<div className='row'>
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
			<div className='container'>
				<h2>Get Started</h2>
				<div className='row'>
					{DocsList.map((props, idx) => (
						<DocFeature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
