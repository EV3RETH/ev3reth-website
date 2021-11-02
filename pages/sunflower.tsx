import Layout from "../components/layout";
import useMintbaseStore from "../hooks/useMintbaseStore";
import utilStyles from '../styles/utils.module.css'
import { useMemo, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress'
import NftCard from "../components/nft-card";
import classNames from "classnames";
import { useWallet } from "../context/mintbase-wallet-context";
import ReactPlayer from "react-player";

const SUNFLOWER_URL = "https://vimeo.com/638908368/0c11145a82"

export default function Sunflower() {
	const [isViewing, setIsViewing] = useState(false)
	const { nfts, loading, holders } = useMintbaseStore({ storeId: "ev3reth.mintbase1.near" })
	const { details } = useWallet()
	console.log("holders", holders)
	console.log("deatial", details)
	const hasPurchased = holders?.includes(details.accountId) //TODO: will eventually check wallet for token id
	const renderedNFTs = useMemo(() => {
		return nfts.map(nft => <NftCard nft={nft} key={nft.id} />)
	}, [nfts])

	function handleView() {
		//check for token ownership again here
		if (hasPurchased) {
			setIsViewing(true)
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

	const VideoView = (<>
		<ReactPlayer
			url={SUNFLOWER_URL}
			playing
			controls
			loop
			height="35rem"
			width="100%"
		/>
		<a href={SUNFLOWER_URL} target="_blank" rel="noopener noreferrer">Download Here</a>
	</>)

	return (
		<Layout>
			<main>
				<h1 className={utilStyles.title}>SUNflower</h1>
				<p className={utilStyles.infoText}>Purchase a ticket to view the full high-quality version</p>
				<div className={utilStyles.centerContent}>
					{isViewing
						? <button
							className={classNames(utilStyles.secondaryButton)}
							onClick={closeView}
						>
							Back to prints
						</button>
						: <button
							className={classNames(utilStyles.primaryButton)}
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