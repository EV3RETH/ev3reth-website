import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toggleIcon from '../public/images/menu-icon.webp'
import styles from '../styles/components/main-navigation.module.css'
import utilStyles from '../styles/utils.module.css'
import classNames from "classnames";
import { useWallet } from "../context/mintbase-wallet-context";

export const PATHNAMES = {
	HOME: "/",
	SUNFLOWER: "/sunflower",
}

export default function MainNavigation() {
	const [isVisible, setIsVisible] = useState(true)

	const { pathname } = useRouter()
	const { wallet, isConnected, details } = useWallet()


	useEffect(() => {
		if (window.screen?.width <= 480) {
			setIsVisible(false)
		}
	}, [pathname])

	useEffect(() => {
		// if touch scrolling and not at the top of the window remove menu
		const handleMove = () => {
			const top = window.screen?.availHeight ? window.screen.height - window.screen.availHeight : 0
			const isAtTop = window.pageYOffset === top
			setIsVisible(isAtTop)
		}
		window.addEventListener("touchmove", handleMove)

		return () => {
			window.removeEventListener("touchmove", handleMove)
		}
	}, [])

	function handleToggle() {
		setIsVisible(prev => !prev)
	}
	function handleWalletConnect() {
		if (isConnected) {
			wallet?.disconnect()
			window.location.reload()
		} else {
			wallet?.connect({ requestSignIn: true })
		}
	}

	return (
		<>
			<button className={classNames(styles.toggleIcon, { [styles.pulse]: !isVisible })} onClick={handleToggle}>
				<Image src={toggleIcon} alt="" />
			</button>
			<nav className={classNames(styles.container, { [styles.navActive]: isVisible })}>

				<button
					className={utilStyles.secondaryButton}
					onClick={handleWalletConnect}
					style={{ position: "relative" }}
				>
					{isConnected ? "Log Out" : "Connect NEAR Wallet"}
				</button>

				{isConnected
					? <p className={classNames(utilStyles.primaryButton, utilStyles.noHover)}>
						{details.accountId}: {details.balance}
					</p>
					: <br />
				}

				<div className={styles.linksContainer}>
					<Link href={PATHNAMES.HOME}>
						<a className={classNames(styles.link, { [styles.selected]: pathname === PATHNAMES.HOME })}>Home</a>
					</Link>
					<Link href={PATHNAMES.SUNFLOWER}>
						<a className={classNames(styles.link, { [styles.selected]: pathname === PATHNAMES.SUNFLOWER })}>SUNflower</a>
					</Link>
				</div>

			</nav>
		</>
	)
}