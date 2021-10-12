import '../styles/globals.css'
import styles from '../styles/components/layout.module.css'
import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import starsImage from "../public/images/stars.webp"
import MainNavigation from '../components/main-navigation'
import Footer from '../components/footer'
import useWindowDimensions from '../hooks/windowDimensions'
import { WalletProvider } from '../context/mintbase-wallet-context'
import { ApolloProvider } from '@apollo/client'

import {
	GRAPH_MAINNET_HTTPS_URI,
	GRAPH_TESTNET_HTTPS_URI,
} from '../context/constants'
import { useApollo } from '../context/apolloClient'
import { Network } from 'mintbase'

function MyApp({ Component, pageProps }: AppProps) {
	const [isLoaded, setIsLoaded] = useState(false);

	const { height } = useWindowDimensions()

	const isTestnet = process.env.NEXT_PUBLIC_MINTBASEJS_NETWORK === 'testnet'

	const network = isTestnet ? Network.testnet : Network.mainnet

	const apolloClient = useApollo({
		...pageProps,
		network: {
			graphUri:
				isTestnet
					? GRAPH_TESTNET_HTTPS_URI
					: GRAPH_MAINNET_HTTPS_URI,
		},
	})

	useEffect(() => {
		//using the inner height as "vh" in order to determine mobiles true height inside all the controls
		const vh = height * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}, [height])

	return (
		<WalletProvider apiKey={process.env.NEXT_PUBLIC_MINTBASEJS_API_KEY || ''} network={network}>
			<ApolloProvider client={apolloClient}>
				<MainNavigation />
				<Component
					{...pageProps}
					bgIsLoaded={isLoaded}
				/>
				<div className={classNames(styles.starsImageBg, { [styles.imageLoaded]: isLoaded })}>
					<Image
						src={starsImage}
						alt=""
						layout="fill"
						objectFit="cover"
						quality={100}
						onLoad={() => setIsLoaded(true)}
					/>
				</div>
				<Footer />
			</ApolloProvider>
		</WalletProvider>
	)
}
export default MyApp
