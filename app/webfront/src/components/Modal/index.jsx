import { useEffect } from 'react';
import styles from './Modal.module.css';

export default function Modal({ children, onClose }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={styles.modal}>
                <button type="button" className={styles.closeButton} onClick={onClose}>
                    ×
                </button>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
}
