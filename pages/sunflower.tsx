import Layout from "../components/layout";
import useMintbaseStore, { buy } from "../hooks/useMintbaseStore";
import utilStyles from '../styles/utils.module.css'
import { useMemo } from "react";
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box';
import NftCard from "../components/nft-card";
import classNames from "classnames";

const SUNFLOWER_ID = "LTcbQlK1Pzfze1nxpg1ZvLYGUxAuch8hX-z0aBxaW30"
const trialIF = "V9y_lSelxsQ-O3coJ0MUyFqQuxkyf7Ft6lxKT7oC7Fs"

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
						// ? <h2 className={utilStyles.titleSm}>...Loading</h2>
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