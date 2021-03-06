import classNames from "classnames";
import CancelIcon from '@mui/icons-material/Cancel';
import utilStyles from '../styles/utils.module.css';
import styles from '../styles/components/modal.module.css';

interface ModalProps {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
	return (
		<div className={classNames({ [styles.isOpen]: isOpen }, styles.wrapper)} onClick={() => onClose()}>
			<div className={classNames(styles.body)} onClick={e => e.stopPropagation()}>
				<button className={classNames(utilStyles.noStyle, styles.cancel)} onClick={onClose}>
					<CancelIcon />
				</button>
				{isOpen && children}
			</div>
		</div>
	)
}