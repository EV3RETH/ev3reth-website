import Image from 'next/image'
import ReactPlayer from "react-player";
import { Thing, buy } from '../hooks/useMintbaseStore';
import { useWallet } from "../context/mintbase-wallet-context";
import styles from '../styles/components/nft-card.module.css'
import utilStyles from '../styles/utils.module.css'
import Skeleton from '@mui/material/Skeleton';
import { formatNear } from '../utils';
import { useMemo, useState } from 'react';
import Modal from './modal';
import { style } from '@mui/system';

interface CardProps {
	nft: Thing
}

export default function NftCard({ nft }: CardProps) {
	const [isOpen, setIsOpen] = useState(false)
	const { wallet, isConnected, details } = useWallet()
	const tokenNumber = nft.tokens.length
	const tokenInfo = nft.tokens[0]
	const media = nft.metadata?.media;
	const title = nft.metadata?.title;
	const description = nft.metadata?.description;
	const bigNumPrice = tokenInfo?.list?.price;
	const video = nft.metadata?.animation_url;

	const loaded = wallet && tokenInfo

	const mediaLoaded = false
	const formatedPrice = useMemo(() => {
		const stringyBigNumPrice = Number(bigNumPrice).toLocaleString('fullwide', { useGrouping: false })
		return formatNear(stringyBigNumPrice)
	}, [])

	function purchase() {
		if (!loaded) return
		buy(wallet, tokenInfo.id, bigNumPrice)
	}

	const content = (
		<>
			<div className={styles.mediaContainer}>
				{media &&
					<Image alt={title} src={media} layout="fill" objectFit="contain" />
				}
			</div>

			<div className={styles.infoContainer}>
				<h3>{title}</h3>
				<div>
					<aside>Available</aside>
					<p>{tokenNumber}</p>
				</div>
				<div>
					<aside>Price</aside>
					<p>{formatedPrice}N</p>
				</div>
			</div>
			<p className={styles.description}>{description}</p>
			{/* {video && <ReactPlayer url={video} playing />} */}
			<button
				className={utilStyles.primaryButton}
				onClick={purchase}
				disabled={!loaded}
			>
				Buy now
			</button>
		</>
	)

	return (
		<>
			<div className={styles.card} onClick={() => setIsOpen(true)}>
				{
					mediaLoaded
						? <Skeleton variant="rectangular" animation="wave" className={styles.skeleton} />
						: content
				}
			</div>
			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			>
				<div className={styles.modalContent}>
					{content}
				</div>
			</Modal>
		</>
	)
}