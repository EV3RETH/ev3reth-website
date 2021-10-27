import Layout from "../components/layout";
import useMintbaseStore, { buy } from "../hooks/useMintbaseStore";
import utilStyles from '../styles/utils.module.css'
import { useMemo, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress'
import NftCard from "../components/nft-card";
import classNames from "classnames";
import { useWallet } from "../context/mintbase-wallet-context";
import ReactPlayer from "react-player";


export default function Sunflower() {
	const [isViewing, setIsViewing] = useState(false)
	const { nfts, loading } = useMintbaseStore({ storeId: "ev3reth.mintspace2.testnet" })
	const { wallet, isConnected, details } = useWallet()
	const hasPurchased = isConnected //will eventually check wallet for token id
	const renderedNFTs = useMemo(() => {
		return nfts.map(nft => <NftCard nft={nft} key={nft.id} />)
	}, [nfts])

	function handleView() {
		//check for token ownership again here
		if (hasPurchased) {
			setIsViewing(true)
		} else {
			alert("You little goofy goober, you thought you could be sneaky, smh")
		}
	}

	function closeView() {
		setIsViewing(false)
	}
	const NftView = loading
		? <CircularProgress color="inherit" className={utilStyles.strokeInAccent} />
		: (
			nfts
				? renderedNFTs
				: null
		)

	const VideoView = (<ReactPlayer
		url="https://vimeo.com/638908368"
		playing
		controls
		loop
		height="35rem"
		width="100%"
	/>)

	return (
		<Layout>
			<main>
				<h1 className={utilStyles.title}>SUNflower</h1>
				<p className={utilStyles.infoText}>Purchase a print to view the full high-quality version</p>
				<div className={utilStyles.centerContent}>
					{isViewing
						? <button
							className={classNames(utilStyles.secondaryButton)}
							style={{ marginBottom: "1rem" }}
							onClick={closeView}
						>
							Back to prints
						</button>
						: <button
							className={classNames(utilStyles.primaryButton)}
							style={{ marginBottom: "1rem" }}
							disabled={!hasPurchased}
							onClick={handleView}
						>
							View
						</button>
					}
				</div>
				<div className={classNames(utilStyles.scrim, utilStyles.centeredList)}>
					{
						isViewing
							? VideoView
							: NftView
					}
				</div>
			</main>
		</Layout>
	)
}