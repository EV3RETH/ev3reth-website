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
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { style } from '@mui/system';
import classNames from 'classnames';

interface CardProps {
	nft: Thing
}

export default function NftCard({ nft }: CardProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [mediaLoaded, setMediaLoaded] = useState(false)
	const [showVideo, setShowVideo] = useState(false)
	const { wallet, isConnected, details } = useWallet()
	const tokenNumber = nft.tokens.length
	const individualToken = nft.tokens[0]
	const media = nft.metadata?.media;
	const title = nft.metadata?.title;
	const description = nft.metadata?.description;
	const bigNumPrice = individualToken?.list?.price;
	const video = nft.metadata?.animation_url;
	const link = `https://www.mintbase.io/thing/${nft.id}`

	const loaded = wallet && individualToken

	const buyButtonType = isConnected ? utilStyles.primaryButton : utilStyles.secondaryButton;

	const formatedPrice = useMemo(() => {
		const stringyBigNumPrice = Number(bigNumPrice).toLocaleString('fullwide', { useGrouping: false })
		return formatNear(stringyBigNumPrice)
	}, [])

	function purchase() {
		if (isConnected) {
			if (!loaded) return
			buy(wallet, nft.tokenId, bigNumPrice)
		} else {
			wallet?.connect({ requestSignIn: true })
		}
	}


	const content = (
		<>
			<div className={classNames(styles.mediaContainer, { [styles.hidden]: !mediaLoaded })}>
				{showVideo && video
					? <ReactPlayer url={video} className={styles.videoPlayer} controls loop={true} />
					: (<>
						{media &&
							<Image alt={title} src={media} layout="fill" objectFit="contain" onLoadingComplete={() => setMediaLoaded(true)} onClick={() => setIsOpen(true)} />
						}
						{video &&
							<button onClick={() => setShowVideo(true)}>
								<PlayCircleIcon fontSize="large" />
							</button>
						}
					</>)
				}

			</div>

			<div className={styles.infoContainer} onClick={() => setIsOpen(true)}>
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
			<p className={styles.description} onClick={() => setIsOpen(true)}>{description}</p>
			<a className={styles.mintbaseLink} href={link} target="_blank" rel="noopener noreferrer">View on Mintbase</a>
			<button
				className={classNames(buyButtonType, styles.buyButton, { [styles.hidden]: !mediaLoaded })}
				onClick={purchase}
			>
				{!isConnected
					? "Connect NEAR Wallet"
					: "Buy now"
				}
			</button>
		</>
	)

	return (
		<>
			<div className={styles.card}>
				{content}
				<Skeleton variant="rectangular" animation="wave" className={classNames(styles.skeleton, { [styles.hidden]: mediaLoaded })} />
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