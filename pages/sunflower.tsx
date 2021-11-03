import Layout from "../components/layout";
import useMintbaseStore from "../hooks/useMintbaseStore";
import utilStyles from '../styles/utils.module.css'
import { useMemo, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress'
import NftCard from "../components/nft-card";
import classNames from "classnames";
import { useWallet } from "../context/mintbase-wallet-context";
import ReactPlayer from "react-player/lazy";

const SUNFLOWER_URL = "https://vimeo.com/638908368/0c11145a82"

export default function Sunflower() {
	const [isViewing, setIsViewing] = useState(false)
	const { nfts, loading, holders } = useMintbaseStore({ storeId: "ev3reth.mintbase1.near" })
	const { details } = useWallet()
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
							Back to tickets
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
					{loading
						? <CircularProgress color="inherit" className={utilStyles.strokeInAccent} />
						: isViewing
							? (<>
								<ReactPlayer
									url={SUNFLOWER_URL}
									controls
									height="35rem"
									width="100%"
								/>
								<a href={SUNFLOWER_URL} target="_blank" rel="noopener noreferrer">Download Here</a>
							</>)
							: renderedNFTs
					}

				</div>
			</main>
		</Layout>
	)
}