import Image from 'next/image'
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/pages/Home.module.css'
import gridImage from "../public/images/swirly-hazy-grid.webp"
import Layout from '../components/layout'
import classNames from 'classnames'
import { useState } from 'react'
import Waves from '../components/waves'
import titleColor from '../public/images/Ev3reth-color.webp'
import titlePlain from '../public/images/Ev3reth-plain.webp'

export const LINKS = {
	TWITTER: "https://twitter.com/EV3RETH",
	OPEN_SEA: "https://opensea.io/collection/ev3reth-collection",
	PARAS: "https://paras.id/ev3reth.near/creation"
}


interface HomeProps {
	bgIsLoaded: boolean;
}
export default function Home({ bgIsLoaded }: HomeProps) {
	const [wavesOn, setWavesOn] = useState(false)

	const toggleWaves = () => setWavesOn(prev => !prev)

	const wavesBgColor = "rgba(0, 0, 0, 0.05)"

	return (
		<Layout >
			<main className={styles.homeContainer}>

				<button className={classNames(styles.homeTitle, utilStyles.noStyle, utilStyles.titleXl, { [styles.imageLoaded]: bgIsLoaded })} onClick={toggleWaves}>
					<div className={classNames(styles.titleColor, { [styles.isActive]: wavesOn, [styles.imageLoaded]: bgIsLoaded })} >
						<Image src={titleColor} alt="" />
					</div>
					<div className={classNames(styles.titlePlain, { [styles.isActive]: wavesOn })}>
						<Image src={titlePlain} alt="HypeDAO" />
					</div>
				</button>

				<div className={classNames(styles.gridImageBg, { [styles.imageLoaded]: bgIsLoaded })}>
					<Image
						src={gridImage}
						alt=""
						layout="fill"
						objectFit="cover"
						quality={100}
					/>
				</div>
				<div className={classNames(styles.linksContainer, { [styles.imageLoaded]: bgIsLoaded })}>
					<a href={LINKS.PARAS} className={utilStyles.titleSm} target="_blank" rel="noopener noreferrer">Paras</a>
					<a href={LINKS.OPEN_SEA} className={utilStyles.titleSm} target="_blank" rel="noopener noreferrer">Open Sea</a>
					<a href={LINKS.TWITTER} className={utilStyles.titleSm} target="_blank" rel="noopener noreferrer">Twitter</a>
				</div>
			</main>
			{wavesOn ? <Waves color={wavesBgColor} /> : null}
		</Layout>
	)
}
