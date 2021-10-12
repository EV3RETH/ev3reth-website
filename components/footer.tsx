import Image from 'next/image'
import Link from 'next/link'
import TwitterIcon from '@material-ui/icons/Twitter';
import styles from '../styles/components/footer.module.css'
import logo from '../public/images/Ev3reth-Logo.png'
import { PATHNAMES } from './main-navigation';


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
				<a href="https://twitter.com/EV3RETH" target="_blank" rel="noopener noreferrer">
					<TwitterIcon />
				</a>
			</div>
		</footer>
	)
}