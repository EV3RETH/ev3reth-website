import Image from 'next/image'
import Link from 'next/link'
import TwitterIcon from '@mui/icons-material/Twitter';
import styles from '../styles/components/footer.module.css'
import logo from '../public/images/Ev3reth-Logo.png'
import { PATHNAMES } from './main-navigation';
import { LINKS } from '../pages';
import OpenSeaIcon from '../public/images/open-sea-icon';
import parasLogo from '../public/images/paras-icon.webp'


export default function Footer() {
	return (
		<footer className={styles.footerContainer}>
			<p className={styles.copyright}>&#169; {new Date().getFullYear()} EV3RETH</p>

			<Link href={PATHNAMES.HOME}>
				<a>
					<Image src={logo} alt="" width={40} height={40} />
				</a>
			</Link>

			<div className={styles.socials}>
				<a href={LINKS.TWITTER} target="_blank" rel="noopener noreferrer">
					<TwitterIcon />
				</a>
				<a href={LINKS.OPEN_SEA} target="_blank" rel="noopener noreferrer">
					<OpenSeaIcon />
				</a>
				<a href={LINKS.PARAS} target="_blank" rel="noopener noreferrer">
					<Image src={parasLogo} alt="Paras Logo" width={24} height={24} />
				</a>
			</div>
		</footer>
	)
}