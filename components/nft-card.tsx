import Image from 'next/image'
import ReactPlayer from "react-player";
import { Thing, buy } from '../hooks/useMintbaseStore';
import { useWallet } from "../context/mintbase-wallet-context";
import styles from '../styles/components/nft-card.module.css'
import utilStyles from '../styles/utils.module.css'
import Skeleton from '@mui/material/Skeleton';
import { formatNear } from '../utils';
import { useMemo, useState, useRef, useEffect } from 'react';
import Modal from './modal';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import classNames from 'classnames';

interface CardProps {
	nft: Thing
}

export default function NftCard({ nft }: CardProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [mediaLoaded, setMediaLoaded] = useState(false)
	const [showVideo, setShowVideo] = useState(false)
	const { wallet, isConnected, details } = useWallet()
	const modalRef = useRef<HTMLDivElement>(null)
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

	useEffect(() => {
		if (showVideo) {
			document.addEventListener("touchend", handleStop)
		}
		return () => document.removeEventListener("touchend", handleStop)
	}, [showVideo])

	function purchase() {
		if (isConnected) {
			if (!loaded) return
			buy(wallet, nft.tokenId, bigNumPrice)
		} else {
			wallet?.connect({ requestSignIn: true })
		}
	}

	function handleStop(e: any) {
		const path = e.path || e.composedPath()
		for (const item of path) {
			if (item === modalRef?.current) return
		}
		setShowVideo(false)
	}
	function closeModal() {
		setIsOpen(false)
		setShowVideo(false)
	}
	function openModal() {
		setShowVideo(false)
		setIsOpen(true)
	}

	const Content = ({ playing, inModal }: { playing: boolean, inModal?: boolean }) => {
		const open = !inModal ? openModal : () => null
		return (
			<>
				<div className={classNames(styles.mediaContainer, { [styles.hidden]: !mediaLoaded })}>
					{showVideo && video
						? <ReactPlayer url={video} className={styles.videoPlayer} controls playsinline playing={playing} />
						: (<>
							{media &&
								<Image alt={title} src={media} layout="fill" objectFit="contain" onLoadingComplete={() => setMediaLoaded(true)} onClick={open} />
							}
							{video &&
								<button onClick={() => setShowVideo(true)}>
									<PlayCircleIcon fontSize="large" />
								</button>
							}
						</>)
					}

				</div>

				<div className={styles.infoContainer} onClick={open}>
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
				<p className={styles.description} onClick={open}>{description}</p>
				{inModal &&
					<a className={styles.mintbaseLink} href={link} target="_blank" rel="noopener noreferrer">
						View on Mintbase
					</a>
				}
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
	}

	return (
		<>
			<div className={styles.card}>
				<Content playing={!isOpen} />
				<Skeleton variant="rectangular" animation="wave" className={classNames(styles.skeleton, { [styles.hidden]: mediaLoaded })} />
			</div>
			<Modal
				isOpen={isOpen}
				onClose={closeModal}
			>
				<div className={styles.modalContent} ref={modalRef}>
					<Content playing={isOpen} inModal />
				</div>
			</Modal>
		</>
	)
}