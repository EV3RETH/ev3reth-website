import Layout from "../components/layout";
import useMintbaseStore, { buy } from "../hooks/useMintbaseStore";
import utilStyles from '../styles/utils.module.css'
import { useMemo } from "react";
import CircularProgress from '@mui/material/CircularProgress'
import NftCard from "../components/nft-card";
import classNames from "classnames";


export default function Sunflower() {
	const { nfts, loading } = useMintbaseStore({ storeId: "ev3reth.mintspace2.testnet" })

	const renderedNFTs = useMemo(() => {
		return nfts.map(nft => <NftCard nft={nft} />)
	}, [nfts])

	return (
		<Layout>
			<main>
				<h1 className={utilStyles.title}>SUNflower</h1>
				<div className={classNames(utilStyles.scrim, utilStyles.centeredList)}>
					{loading
						? <CircularProgress color="inherit" className={utilStyles.strokeInAccent} />
						: (
							nfts
								? renderedNFTs
								: null
						)
					}
				</div>
			</main>
		</Layout>
	)
}