import Image from 'next/image'
import ReactPlayer from "react-player";
import { Thing, buy } from '../hooks/useMintbaseStore';
import { useWallet } from "../context/mintbase-wallet-context";
import styles from '../styles/components/nft-card.module.css'
import utilStyles from '../styles/utils.module.css'
import Skeleton from '@mui/material/Skeleton';

interface CardProps {
	nft: Thing
}

export default function NftCard({ nft }: CardProps) {
	const { wallet, isConnected, details } = useWallet()
	const tokenNumber = nft.tokens.length
	const tokenInfo = nft.tokens[0]
	const media = nft.metadata?.media;
	const title = nft.metadata?.title;
	const video = nft.metadata?.animation_url

	const loaded = wallet && tokenInfo

	const mediaLoaded = false

	function purchase() {
		if (!loaded) return
		buy(wallet, tokenInfo.id, tokenInfo.list.price)
	}

	return (
		<div className={styles.card}>
			{
				mediaLoaded
					? <Skeleton variant="rectangular" animation="wave" className={styles.skeleton} />
					: <>
						<div>
							<div className={styles.mediaContainer}>
								{media &&
									<Image alt={title} src={media} layout="fill" objectFit="cover" />
								}
							</div>

							<h2 className={utilStyles.titleSm}>{title}</h2>
						</div>

						{/* {video && <ReactPlayer url={video} playing />} */}
						<button
							className={utilStyles.primaryButton}
							onClick={purchase}
							disabled={!loaded}
						>
							Purchase
						</button>
					</>
			}
		</div>
	)
}