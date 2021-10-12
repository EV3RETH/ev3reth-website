import Layout from "../components/layout";
import useMintbaseStore from "../hooks/useMintbaseStore";
import utilStyles from '../styles/utils.module.css'
import Image from 'next/image'
import { useWallet } from "../context/mintbase-wallet-context";
import { parseNear } from "../utils";

const SUNFLOWER_ID = "LTcbQlK1Pzfze1nxpg1ZvLYGUxAuch8hX-z0aBxaW30"

export default function Sunflower() {
	const { nfts, loading } = useMintbaseStore({ storeId: "ev3reth.mintspace2.testnet" })
	const { wallet, isConnected, details } = useWallet()
	const sunflowerNFT = nfts.find(nft => nft.metaId === SUNFLOWER_ID)
	const media = sunflowerNFT?.metadata?.media;
	const title = sunflowerNFT?.metadata?.title;

	const loaded = !loading && wallet && sunflowerNFT


	function purchase() {
		if (!loaded) return
		const sunflowerPrice = "2"
		const parsedNear = parseNear(sunflowerPrice)
		if (!parsedNear) return
		wallet.makeOffer(sunflowerNFT.id, parsedNear)
		// wallet?.acceptAndTransfer()
	}
	return (
		<Layout>
			<h1 className={utilStyles.title}>SUNflower</h1>
			<div className={utilStyles.scrim}>
				{loading
					? <h2 className={utilStyles.titleSm}>...Loading</h2>
					: (<>
						<h2 className={utilStyles.titleSm}>{title}</h2>
						{media &&
							<a href={`${media}`}>
								<Image alt={title} src={media} width="500px" height="300px" />
							</a>
						}
						<button
							className={utilStyles.primaryButton}
							onClick={purchase}
							disabled={!loaded}
						>
							Buy SUNflower
						</button>
					</>)
				}
			</div>
		</Layout>
	)
}