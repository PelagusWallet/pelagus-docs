import React from 'react'
import Card, { type CardItem } from '../Card/Card'

const FeatureList: CardItem[] = [
	{
		title: 'Open-Source',
		link: 'https://github.com/pelaguswallet',
		description: (
			<>
				Pelagus Wallet extension is completely open-source. Developers can review and suggest improvements to
				any aspect of the codebase.
			</>
		),
	},
	{
		title: 'Quai Native',
		link: 'https:/.quai.network/introduction/quai-network',
		description: (
			<>
				The Pelagus Wallet extension has been designed specifically for use on Quai Network's unique
				multi-chain infrastructure.
			</>
		),
	},
	{
		title: 'Developer Centric',
		link: '/develop/get-started/detecting-pelagus',
		description: (
			<>Familiar APIs and smart transaction routing make integrating Pelagus into your application easy.</>
		),
	},
]

const DocList: CardItem[] = [
	{
		title: 'Use Pelagus',
		link: '/wallet/intro',
		description: (
			<>
				Follow step by step tutorials on how to install, use, and interact with Quai Network with the Pelagus
				Extension.{' '}
			</>
		),
	},
	{
		title: 'Integrate Pelagus',
		link: '/category/getting-started',
		description: (
			<>Get Pelagus integrated into your application quickly using pre-built components and methods.</>
		),
	},
	{
		title: 'Pelagus APIs',
		link: '/category/api-reference',
		description: (
			<>
				Use the full functionality of Pelagus to build powerful applications that leverage the power and speed
				of Quai Network.
			</>
		),
	},
]

export default function HomepageFeatures(): JSX.Element {
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<section className='container margin-top--lg margin-bottom--lg'>
				<h2></h2>
				<div className='container'>
					<div className='row'>
						{FeatureList.map((props, idx) => (
							<Card
								key={idx}
								{...props}
							/>
						))}
					</div>
				</div>
			</section>
			<section className='container margin-top--lg margin-bottom--lg'>
				<div className='container'>
					<div className='row'>
						{DocList.map((props, idx) => (
							<Card
								key={idx}
								{...props}
							/>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}
