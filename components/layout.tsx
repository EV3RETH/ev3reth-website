import Head from "next/head";
import styles from '../styles/components/layout.module.css'

interface LayoutProps {
	children: React.ReactNode;
	metaDataTitle?: string
}

export default function Layout({
	children,
	metaDataTitle = "EV3RETH",
}: LayoutProps) {

	return (
		<div className={styles.container}>

			<Head>
				<title>{metaDataTitle}</title>
				<meta name="description" content="Official website of EV3RETH" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{children}

		</div>
	)
}